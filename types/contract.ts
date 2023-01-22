type BaseContract = {
  name: string;
  creator: string;
  address?: string;
  extensions: string[];
  managementType: string;
  contractId: string;
  verified: boolean;
  verificationGuid?: string;
  createdAt: Date;
  networkName: string;
  networkChainId: number;
  showInSearch: boolean;
};

type ERC20Contract = BaseContract & {
  symbol: string;
  decimals: string;
  initialSupply: string;
};

type ERC721Contract = BaseContract & {
  baseURI: string;
  symbol: string;
  maxSupply?: number;
  mintPrice?: number;
};

type ERC1155Contract = BaseContract & {
  baseURI: string;
};

export type Contract = ERC20Contract | ERC721Contract | ERC1155Contract;
