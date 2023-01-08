export type TokenData = {
  name: string;
  type: TokenType;
  symbol: string;
  decimals?: string;
  initialSupply?: string;
  extensions: string[];
  managementType: string;
  networkName: string;
  networkChainId: string;
  address: string;
  contractId: string;
};

// declaren enum with token types

export enum TokenType {
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

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
