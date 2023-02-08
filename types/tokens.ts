export type TokenData =
  | ERC20ContractData
  | ERC721ContractData
  | ERC1155ContractData;

export type ERC20ContractData = {
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

export type ERC721ContractOptions = {
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

export type ERC721ContractData = {
  name: string;
  symbol: string;
  networkName: string;
  networkChainId: number;
  baseURI: string;
  address: string;
  contractId: string;
  type: ContractType;
  options: ERC721ContractOptions;
};

export type ERC1155ContractData = {
  name: string;
  networkName: string;
  networkChainId: number;
  baseURI: string;
  address: string;
  contractId: string;
  type: ContractType;
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
