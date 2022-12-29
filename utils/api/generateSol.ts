interface ContractGenerationProps {
  name: string;
  symbol: string;
  decimals: number;
  initialSupply: number;
  extensions: string[];
  managementType: string;
}

export const generateSolFile = ({
  name,
  symbol,
  decimals,
  initialSupply,
  extensions,
  managementType,
}: ContractGenerationProps) => {
  const mintable = extensions.includes("mintable");
  const burnable = extensions.includes("burnable");
  const pausable = extensions.includes("pausable");
  const permit = extensions.includes("permit");
  const votes = extensions.includes("votes");
  const flashMinting = extensions.includes("flash minting");
  const snapshots = extensions.includes("snapshots");

  const mintableExtension = ["Ownable"];
  const burnableExtension = ["ERC20Burnable"];
  const pausableExtension = ["Pausable", "Ownable"];
  const permitExtension = ["ERC20Permit"];
  const votesExtension = ["ERC20Permit", "ERC20Votes"];
  const flashMintingExtension = ["ERC20FlashMint"];
  const snapshotsExtension = ["ERC20Snapshot", "Ownable"];

  const extensionsArray = [
    burnable ? burnableExtension : [],
    snapshots ? snapshotsExtension : [],
    pausable ? pausableExtension : [],
    mintable ? mintableExtension : [],
    permit ? permitExtension : [],
    votes ? votesExtension : [],
    flashMinting ? flashMintingExtension : [],
  ];

  // remove duplicates
  const extensionsSet = new Set(extensionsArray.flat());

  const extensionsString = Array.from(extensionsSet).join(", ");

  const accessTypeName =
    managementType === "AccessControl" ? "AccessControl" : "Ownable";

  const isAccessControl = managementType === "AccessControl";

  const accessTypeImport =
    managementType === "AccessControl"
      ? "@openzeppelin/contracts/access/AccessControl.sol"
      : "@openzeppelin/contracts/access/Ownable.sol";

  const newErc20Contract = `
    // SPDX-License-Identifier: MIT
  pragma solidity 0.8.17;
  
  import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
  ${mintable || pausable || snapshots ? `import "${accessTypeImport}";` : ""}
    ${
      burnable
        ? `import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";`
        : ""
    }
    ${pausable ? `import "@openzeppelin/contracts/security/Pausable.sol";` : ""}
    ${
      permit
        ? `import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";`
        : ""
    }
    ${
      votes
        ? `import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";`
        : ""
    }
    ${
      flashMinting
        ? `import "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol";`
        : ""
    }
    ${
      snapshots
        ? `import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";`
        : ""
    }
  
  contract ${name} is ERC20${
    extensionsString !== "" ? `, ${extensionsString}` : ""
  } {
    ${
      mintable && isAccessControl
        ? 'bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");'
        : ""
    }
    ${
      pausable && isAccessControl
        ? 'bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");'
        : ""
    }
    ${
      snapshots && isAccessControl
        ? 'bytes32 public constant SNAPSHOT_ROLE = keccak256("SNAPSHOT_ROLE");'
        : ""
    }
    
      constructor() ERC20("${name.toUpperCase()}", "${symbol.toUpperCase()}") {
        ${
          initialSupply > 0
            ? `_mint(msg.sender, ${initialSupply} * 10 ** ${decimals});`
            : ""
        }
        ${isAccessControl ? `_setupRole(DEFAULT_ADMIN_ROLE, msg.sender);` : ""}
        ${
          mintable && isAccessControl
            ? `_setupRole(MINTER_ROLE, msg.sender);`
            : ""
        }
        ${
          pausable && isAccessControl
            ? `_setupRole(PAUSER_ROLE, msg.sender);`
            : ""
        }
        ${
          snapshots && isAccessControl
            ? `_setupRole(SNAPSHOT_ROLE, msg.sender);`
            : ""
        }
    }

        ${
          decimals !== 18
            ? `function decimals() public view virtual override returns (uint8) {return ${decimals};}`
            : ""
        }
  
      ${
        mintable
          ? `function mint(address to, uint256 amount) public ${
              isAccessControl ? "onlyRole(MINTER_ROLE)" : "onlyOwner"
            } {_mint(to, amount);}`
          : ""
      } 

      ${
        snapshots
          ? `function snapshot() public ${
              isAccessControl ? "onlyRole(SNAPSHOT_ROLE)" : "onlyOwner"
            } returns (uint256) {return _snapshot();}`
          : ""
      }

      ${
        pausable
          ? `function pause() public ${
              isAccessControl ? "onlyRole(PAUSER_ROLE)" : "onlyOwner"
            } {_pause();}`
          : ""
      }
      ${
        pausable
          ? `function unpause() public ${
              isAccessControl ? "onlyRole(PAUSER_ROLE)" : "onlyOwner"
            } { _unpause();}`
          : ""
      }
     
      ${
        snapshots || votes
          ? "// The following functions are overrides required by Solidity."
          : ""
      }

      ${
        pausable || snapshots
          ? `function _beforeTokenTransfer(address from, address to, uint256 amount) internal ${
              pausable ? "whenNotPaused" : ""
            } override${
              snapshots ? "(ERC20, ERC20Snapshot)" : ""
            } {super._beforeTokenTransfer(from, to, amount);}`
          : ""
      }

      ${
        votes
          ? "function _afterTokenTransfer(address from, address to, uint256 amount) internal override(ERC20, ERC20Votes) {super._afterTokenTransfer(from, to, amount);}"
          : ""
      }
      ${
        votes
          ? "function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {super._mint(to, amount);}"
          : ""
      }
        ${
          votes
            ? "function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {super._burn(account, amount);}"
            : ""
        }

  }
  `;

  return newErc20Contract;
};
