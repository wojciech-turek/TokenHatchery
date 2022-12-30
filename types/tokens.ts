export type BaseTokenData = {
  name: string;
  symbol: string;
  decimals: string;
  initialSupply: string;
};

// declaren enum with token types

export enum TokenType {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}
