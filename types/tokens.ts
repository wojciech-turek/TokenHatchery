export type TokenData = ERC20TokenData | ERC721TokenData;

export type ERC20TokenData = {
  name: string;
  symbol: string;
  decimals: string;
  initialSupply: string;
  extensions: string[];
  managementType: string;
  networkName: string;
  networkChainId: string;
  address: string;
  contractId: string;
  type: TokenType;
};

export type ERC721TokenData = {
  name: string;
  symbol: string;
  extensions: string[];
  managementType: string;
  networkName: string;
  networkChainId: string;
  baseURI: string;
  address: string;
  contractId: string;
  type: TokenType;
};

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
