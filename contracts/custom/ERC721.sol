// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyToken is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Pausable,
    Ownable,
    ERC721Burnable
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    IERC20 public mintToken;
    uint256 public mintFee;
    uint256 public maxSupply;
    uint32 public maxTokensPerWallet;

    constructor(
        uint256 _mintFee,
        uint256 _maxSupply,
        address _mintToken,
        uint32 _maxTokensPerWallet
    ) ERC721("MyToken", "MTK") {
        mintFee = _mintFee;
        maxSupply = _maxSupply;
        mintToken = IERC20(_mintToken);
        maxTokensPerWallet = _maxTokensPerWallet;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://onet.pl/";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function decimals() public pure returns (uint8) {
        return 0;
    }

    function safeMint(address to, string memory uri) public payable onlyOwner {
        require(_tokenIdCounter.current() < maxSupply, "Max supply reached");
        require(
            this.balanceOf(to) < maxTokensPerWallet,
            "Max tokens per wallet reached"
        );
        require(
            mintToken.balanceOf(msg.sender) >= mintFee,
            "Not enough tokens to mint"
        );
        mintToken.transferFrom(msg.sender, address(this), mintFee);

        require(msg.value >= mintFee, "Not enough ETH to mint");

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

    function changeMintFee(uint256 newFee) public onlyOwner {
        mintFee = newFee;
    }

    function changeMintTokenAddress(address newAddress) public onlyOwner {
        mintToken = IERC20(newAddress);
    }

    function changeMaxSupply(uint256 newMaxSupply) public onlyOwner {
        maxSupply = newMaxSupply;
    }

    function changeMaxTokensPerWallet(uint32 newMaxTokensPerWallet)
        public
        onlyOwner
    {
        maxTokensPerWallet = newMaxTokensPerWallet;
    }

    function withdrawAccumulated() public onlyOwner {
        payable(_msgSender()).transfer(address(this).balance);
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
