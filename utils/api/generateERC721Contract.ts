export const generateERC721Contract = ({
  name,
  symbol,
  baseURI,
  options,
}: {
  name: string;
  symbol: string;
  baseURI: string;
  options: {
    individualTokens: boolean;
    publicMinting: boolean;
    customPaymentToken: boolean;
    mintFee: string;
    maxSupply: string;
    walletLimit: string;
  };
}) => {
  const { customPaymentToken, mintFee, maxSupply, walletLimit } = options;
  console.log("generateERC721Contract", { name, symbol, baseURI });
  console.log("generateERC721Contract", {
    customPaymentToken,
    mintFee,
    maxSupply,
    walletLimit,
  });
  const newERC721Contract = `
// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
${
  customPaymentToken
    ? `import "@openzeppelin/contracts/token/ERC20/IERC20.sol";`
    : ""
}

contract ${name} is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Pausable,
    Ownable,
    ERC721Burnable
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    ${customPaymentToken ? "IERC20 public mintToken;" : ""}
    ${mintFee ? "uint256 public mintFee;" : ""}
    ${maxSupply ? "uint256 public maxSupply;" : ""}
    ${walletLimit ? "uint32 public maxTokensPerWallet;" : ""}

    constructor(
        ${mintFee !== "" ? "uint256 _mintFee," : ""}
        ${maxSupply !== "" ? "uint256 _maxSupply," : ""}
        ${customPaymentToken ? "address _mintToken," : ""}
        ${walletLimit !== "" ? "uint32 _maxTokensPerWallet" : ""}
    ) ERC721("${name}", "${symbol}") {
        ${mintFee ? "mintFee = _mintFee;" : ""}
        ${maxSupply ? "maxSupply = _maxSupply;" : ""}
        ${customPaymentToken ? "mintToken = IERC20(_mintToken);" : ""}
        ${walletLimit ? "maxTokensPerWallet = _maxTokensPerWallet;" : ""}
    }

    ${
      baseURI
        ? `function _baseURI() internal pure override returns (string memory) { return "${baseURI}";}`
        : ""
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri) public payable onlyOwner {
        ${
          maxSupply
            ? `require(_tokenIdCounter.current() < maxSupply, "Max supply reached");`
            : ""
        }
        ${
          walletLimit
            ? `require(
            this.balanceOf(to) < maxTokensPerWallet,
            "Max tokens per wallet reached"
        ); `
            : ""
        }
        ${
          mintFee && customPaymentToken
            ? `require(
            mintToken.balanceOf(msg.sender) >= mintFee,
            "Not enough tokens to mint"
        );
        mintToken.transferFrom(msg.sender, address(this), mintFee);`
            : ""
        }
        ${
          mintFee && !customPaymentToken
            ? `require(msg.value >= mintFee, "Not enough ETH to mint");`
            : ""
        }


        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    ${
      mintFee
        ? "function changeMintFee(uint256 newFee) public onlyOwner { mintFee = newFee;}"
        : ""
    }

    ${
      customPaymentToken
        ? "function changeMintTokenAddress(address newAddress) public onlyOwner {mintToken = IERC20(newAddress);}"
        : ""
    }
    ${
      maxSupply
        ? "function changeMaxSupply(uint256 newMaxSupply) public onlyOwner { maxSupply = newMaxSupply;}"
        : ""
    }

    ${
      walletLimit
        ? "function changeMaxTokensPerWallet(uint32 newMaxTokensPerWallet) public onlyOwner { maxTokensPerWallet = newMaxTokensPerWallet;}"
        : ""
    }
${
  mintFee && !customPaymentToken
    ? `function withdrawAccumulated() public onlyOwner {
  payable(_msgSender()).transfer(address(this).balance);
}`
    : ""
}

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

  
  `;

  return newERC721Contract;
};
