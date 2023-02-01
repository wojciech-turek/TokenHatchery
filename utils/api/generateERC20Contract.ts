interface ContractGenerationProps {
  name: string;
  symbol: string;
  decimals: string;
  initialSupply: number;
  options: {
    dynamicSupply: boolean;
  };
}

export const generateERC20Contract = ({
  name,
  symbol,
  decimals,
  initialSupply,
  options,
}: ContractGenerationProps) => {
  const { dynamicSupply } = options;

  const newErc20Contract = `
  // SPDX-License-Identifier: MIT
  pragma solidity 0.8.17;
  
  import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
  import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
  import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
  import "@openzeppelin/contracts/access/Ownable.sol";
  import "@openzeppelin/contracts/security/Pausable.sol";
  import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
  
  contract ${name} is ERC20, ERC20Burnable, ERC20Snapshot, Ownable, Pausable, ERC20Permit {
      constructor() ERC20("${name}", "${symbol}") ERC20Permit("${name}") {
          ${
            initialSupply
              ? `_mint(msg.sender, ${initialSupply} * 10 ** decimals());`
              : ""
          }
      }
  
      function snapshot() public onlyOwner {
          _snapshot();
      }
  
      function pause() public onlyOwner {
          _pause();
      }
  
      function unpause() public onlyOwner {
          _unpause();
      }

      function decimals() public pure override returns (uint8) {
        return ${decimals};
      }
  
      ${
        dynamicSupply
          ? "function mint(address to, uint256 amount) public onlyOwner {_mint(to, amount);}"
          : ""
      }
  
      function _beforeTokenTransfer(address from, address to, uint256 amount)
          internal
          whenNotPaused
          override(ERC20, ERC20Snapshot)
      {
          super._beforeTokenTransfer(from, to, amount);
      }
  }`;

  return newErc20Contract;
};
