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

export type BaseContractData = {
  name: string;
  symbol: string;
  address: string;
  networkChainId: number;
};

type Deployment = {
  _id: string;
  name: string;
  symbol: string;
  networkChainId: number;
  address: string;
};

export type Deployments = {
  type: TokenType;
  deployments: Deployment[];
};
