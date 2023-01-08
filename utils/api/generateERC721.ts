export const generateERC721Contract = ({
  name,
  symbol,
  baseURI,
  extensions,
  managementType,
}: {
  name: string;
  symbol: string;
  baseURI: string;
  extensions: string[];
  managementType: string;
}) => {
  const mintable = extensions.includes("mintable");
  const burnable = extensions.includes("burnable");
  const pausable = extensions.includes("pausable");
  const votes = extensions.includes("votes");
  const enumerable = extensions.includes("enumerable");
  const autoIncrementIds = extensions.includes("auto increment ids");
  const URIStorage = extensions.includes("uri storage");

  const autoIncrementExtension = ["Counters"];
  const burnableExtension = ["ERC721Burnable"];
  const pausableExtension = ["Pausable"];
  const votesExtension = ["EIP712, ERC721Votes"];
  const enumerableExtension = ["ERC721Enumerable"];
  const URIStorageExtension = ["ERC721URIStorage"];

  const extensionsArray = [
    burnable ? burnableExtension : [],
    pausable ? pausableExtension : [],
    votes ? votesExtension : [],
    enumerable ? enumerableExtension : [],
    autoIncrementIds ? autoIncrementExtension : [],
    URIStorage ? URIStorageExtension : [],
  ];

  const extensionsSet = new Set(extensionsArray.flat());

  const isOwnable = managementType === "ownable";
  const isAccessControl = managementType === "accesscontrol";

  const accessTypeImport = isOwnable
    ? "@openzeppelin/contracts/access/Ownable.sol"
    : "@openzeppelin/contracts/access/AccessControl.sol";

  if (isOwnable) {
    extensionsSet.add("Ownable");
  } else {
    extensionsSet.add("AccessControl");
  }

  const extensionsString = Array.from(extensionsSet).join(", ");

  const newERC721Contract = `
    // SPDX-License-Identifier: MIT
    pragma solidity 0.8.17;

    import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
    ${
      autoIncrementIds
        ? `import "@openzeppelin/contracts/utils/Counters.sol";`
        : ""
    }
    ${`import "${accessTypeImport}";`}
    ${
      autoIncrementIds
        ? `import "@openzeppelin/contracts/utils/Counters.sol";`
        : ""
    }
    ${
      votes
        ? `import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";`
        : ""
    }
    ${
      votes
        ? `import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";`
        : ""
    }
    ${
      burnable
        ? `import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";`
        : ""
    }
    ${pausable ? `import "@openzeppelin/contracts/security/Pausable.sol";` : ""}
    ${
      enumerable
        ? `import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";`
        : ""
    }
    ${
      URIStorage
        ? `import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";`
        : ""
    }

    contract ${name} is ERC721${
    extensionsString !== "" ? `, ${extensionsString}` : ""
  } {
      ${autoIncrementIds ? `using Counters for Counters.Counter;` : ""}
      ${autoIncrementIds ? `Counters.Counter private _tokenIdCounter;` : ""}
      ${
        mintable && isAccessControl
          ? ` bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");`
          : ""
      }
      ${
        pausable
          ? `bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");`
          : ""
      }
        constructor() ERC721("${name}", "${symbol}") ${
    votes ? `EIP712("${name}", "1")` : ""
  }{
    ${isAccessControl ? ` _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);` : ""}
    ${
      mintable && isAccessControl ? " _grantRole(MINTER_ROLE, msg.sender);" : ""
    }
    ${
      pausable && isAccessControl ? " _grantRole(PAUSER_ROLE, msg.sender);" : ""
    }
  }

        ${
          baseURI
            ? `function _baseURI() internal pure override returns (string memory) {
            return ${baseURI};
        }`
            : ""
        }
        ${
          mintable
            ? `
        function safeMint(address to, uint256 tokenId) public ${
          isAccessControl ? "onlyRole(MINTER_ROLE)" : "onlyOwner"
        } {
          ${
            autoIncrementIds
              ? `uint256 tokenId = _tokenIdCounter.current();
          _tokenIdCounter.increment();`
              : ""
          }
          _safeMint(to, tokenId);
      }`
            : ""
        }
        ${
          pausable
            ? ` function pause() public ${
                isAccessControl ? "onlyRole(PAUSER_ROLE)" : "onlyOwner"
              } {
          _pause();
      }`
            : ""
        }
      ${
        pausable
          ? ` function unpause() public ${
              isAccessControl ? "onlyRole(PAUSER_ROLE)" : "onlyOwner"
            } {
        _unpause();
    }`
          : ""
      }
        ${
          pausable || enumerable
            ? `function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        ${pausable ? "whenNotPaused" : ""}
        override${enumerable ? "(ERC721, ERC721Enumerable)" : ""}
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }`
            : ""
        }
        ${
          votes
            ? `
        function _afterTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Votes)
    {
        super._afterTokenTransfer(from, to, tokenId, batchSize);
    }
        `
            : ""
        }
        ${
          enumerable || isAccessControl
            ? `
        function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721 ${enumerable ? ", ERC721Enumerable" : ""} ${
                isAccessControl ? ", AccessControl" : ""
              }})
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
        `
            : ""
        }
        ${
          URIStorage
            ? `
          function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
            super._burn(tokenId);
        }
          `
            : ""
        }
        ${
          URIStorage
            ? `
          function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
          `
            : ""
        }
    }
    `;

  return newERC721Contract;
};
