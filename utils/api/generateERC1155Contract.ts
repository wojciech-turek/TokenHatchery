export const generateERC1155Contract = ({
  name,
  baseURI,
  extensions,
  managementType,
}: {
  name: string;
  baseURI: string;
  extensions: string[];
  managementType: string;
}) => {
  const extensionTypeSet = new Set(extensions);

  const mintable = extensionTypeSet.has("Mintable");
  const burnable = extensionTypeSet.has("Burnable");
  const pausable = extensionTypeSet.has("Pausable");
  const supplyTrackable = extensionTypeSet.has("Supply Tracking");
  const updateableURI = extensionTypeSet.has("Updateable URI");

  const burnableExtension = ["ERC1155Burnable"];
  const pausableExtension = ["Pausable"];
  const supplyTrackableExtension = ["ERC1155Supply"];

  const extensionsArray = [
    burnable ? burnableExtension : [],
    pausable ? pausableExtension : [],
    supplyTrackable ? supplyTrackableExtension : [],
  ];

  const extensionsSet = new Set(extensionsArray.flat());

  const isOwnable = managementType === "Ownable";
  const isAccessControl = managementType === "AccessControl";

  if (isOwnable) {
    extensionsSet.add("Ownable");
  } else {
    extensionsSet.add("AccessControl");
  }

  const accessTypeImport = isOwnable
    ? "@openzeppelin/contracts/access/Ownable.sol"
    : "@openzeppelin/contracts/access/AccessControl.sol";

  const extensionsString = [...extensionsSet].join(", ");

  const newErc1155Contract = `
  // SPDX-License-Identifier: MIT
  pragma solidity 0.8.17;

    import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
    ${`import "${accessTypeImport}";`}
    ${
      burnable
        ? `import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";`
        : ""
    }
    ${pausable ? `import "@openzeppelin/contracts/security/Pausable.sol";` : ""}
    ${
      supplyTrackable
        ? `import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";`
        : ""
    }

    contract ${name} is ERC1155${
    extensionsString !== "" ? `, ${extensionsString}` : ""
  } {
    ${
      updateableURI && isAccessControl
        ? `bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");`
        : ""
    }
    ${
      pausable && isAccessControl
        ? `bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");`
        : ""
    }
    ${
      mintable && isAccessControl
        ? `bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");`
        : ""
    }
    constructor() ERC1155("${baseURI}") {
        ${isAccessControl ? ` _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);` : ""}
        ${
          updateableURI && isAccessControl
            ? `_grantRole(URI_SETTER_ROLE, msg.sender);`
            : ""
        }
        ${
          pausable && isAccessControl
            ? `_grantRole(PAUSER_ROLE, msg.sender);`
            : ""
        }
        ${
          mintable && isAccessControl
            ? `_grantRole(MINTER_ROLE, msg.sender);`
            : ""
        }
    }

    ${
      mintable
        ? `function mint(address account, uint256 id, uint256 amount, bytes memory data) public ${
            isAccessControl ? "onlyRole(MINTER_ROLE)" : "onlyOwner"
          } { _mint(account, id, amount, data); }`
        : ""
    }

    ${
      mintable
        ? `function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public ${
            isAccessControl ? "onlyRole(MINTER_ROLE)" : "onlyOwner"
          } { _mintBatch(to, ids, amounts, data);}`
        : ""
    }

    ${
      supplyTrackable || pausable
        ? `  function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
    internal
    ${pausable ? "whenNotPaused" : ""}
    override${supplyTrackable ? "(ERC1155, ERC1155Supply)" : ""}
{
    super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
}`
        : ""
    }

    ${
      pausable
        ? `  function pause() public ${
            isAccessControl ? "onlyRole(PAUSER_ROLE)" : "onlyOwner"
          } {
        _pause();
    }`
        : ""
    }

    ${
      pausable
        ? `  function unpause() public ${
            isAccessControl ? "onlyRole(PAUSER_ROLE)" : "onlyOwner"
          } {
        _unpause();
    }`
        : ""
    }
    ${
      updateableURI
        ? `
    function setURI(string memory newuri) public ${
      isAccessControl ? "onlyRole(URI_SETTER_ROLE)" : "onlyOwner"
    } {
        _setURI(newuri);
    }
    `
        : ""
    }

    ${
      isAccessControl
        ? `
    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC1155, AccessControl)
    returns (bool)
{
    return super.supportsInterface(interfaceId);
}
    `
        : ""
    }

  }
  `;

  return newErc1155Contract;
};
