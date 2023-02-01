export type TokenData = ERC20TokenData | ERC721TokenData | ERC1155TokenData;

export type ERC20TokenData = {
  name: string;
  symbol: string;
  decimals: string;
  initialSupply: string;
  networkName: string;
  networkChainId: number;
  address: string;
  contractId: string;
  type: ContractType;
  options: {
    dynamicSupply: boolean;
  };
};

export type ERC721TokenOptions = {
  publicMinting: boolean;
  customPaymentToken: boolean;
  customPaymentTokenData: {
    address: string;
    decimals: string;
    symbol: string;
  };
  mintFee?: string;
  maxSupply?: string;
  walletLimit?: string;
};

export type ERC721TokenData = {
  name: string;
  symbol: string;
  networkName: string;
  networkChainId: number;
  baseURI: string;
  address: string;
  contractId: string;
  type: ContractType;
  options: ERC721TokenOptions;
};

export type ERC1155TokenData = {
  name: string;
  extensions: string[];
  managementType: string;
  networkName: string;
  networkChainId: number;
  baseURI: string;
  address: string;
  contractId: string;
  type: ContractType;
  options: {};
};

export enum ContractType {
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
  type: ContractType;
  deployments: Deployment[];
};
