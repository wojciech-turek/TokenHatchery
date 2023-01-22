import eth from "public/networks/eth.png";
import bsc from "public/networks/bsc.png";
import matic from "public/networks/matic.png";
import arb from "public/networks/arb.png";
import avax from "public/networks/avax.png";
import optimism from "public/networks/optimism.png";
import gno from "public/networks/gno.png";
import saga from "public/networks/saga.png";
import { StaticImageData } from "next/image";
import { Chain } from "wagmi";

export type Network = {
  chainId: number;
  name: string;
  image: StaticImageData;
  verifiable?: boolean;
  blockExplorer?: string;
  verificationApi?: string;
  apiKey?: string;
};

export const supportedNetworks: {
  mainnets: Network[];
  testnets: Network[];
} = {
  mainnets: [
    {
      chainId: 1,
      name: "Ethereum Mainnet",
      image: eth,
      verifiable: true,
      blockExplorer: "https://etherscan.io",
      verificationApi: "https://api.etherscan.io",
      apiKey: process.env.ETHERSCAN_MAINNET_API_KEY,
    },
    {
      name: "SAGA Chainlet",
      chainId: 1673014940,
      image: saga,
      verifiable: false,
    },
    {
      chainId: 56,
      name: "BNB Chain Mainnet",
      image: bsc,
      verifiable: false,
    },
    {
      chainId: 137,
      name: "Polygon Mainnet",
      image: matic,
      verifiable: true,
      blockExplorer: "https://polygonscan.com",
      verificationApi: "https://api.polygonscan.com",
      apiKey: process.env.POLYGONSCAN_MAINNET_API_KEY,
    },
    {
      chainId: 42161,
      name: "Arbitrum Mainnet",
      verifiable: false,
      image: arb,
    },
    {
      chainId: 43114,
      name: "Avalanche Mainnet",
      verifiable: false,
      image: avax,
    },
    {
      name: "Optimism Mainnet",
      chainId: 10,
      verifiable: false,
      image: optimism,
    },
    {
      name: "Gnosis Mainnet",
      chainId: 100,
      verifiable: false,
      image: gno,
    },
  ],
  testnets: [
    {
      chainId: 5,
      name: "Ethereum Goerli Testnet",
      verifiable: true,
      image: eth,
      blockExplorer: "https://goerli.etherscan.io",
      verificationApi: "https://api-goerli.etherscan.io/api",
      apiKey: process.env.ETHERSCAN_GOERLI_API_KEY,
    },
    {
      chainId: 97,
      name: "BNB Chain Testnet",
      verifiable: false,
      image: bsc,
    },
    {
      chainId: 80001,
      name: "Polygon Mumbai Testnet",
      verifiable: true,
      image: matic,
      blockExplorer: "https://mumbai.polygonscan.com",
      verificationApi: "https://api-testnet.polygonscan.com/api",
      apiKey: process.env.POLYGONSCAN_MUMBAI_API_KEY,
    },
    {
      chainId: 421613,
      name: "Arbitrum Goerli Testnet",
      verifiable: false,
      image: arb,
    },
    {
      chainId: 43113,
      name: "Avalanche Fuji Testnet",
      verifiable: false,
      image: avax,
    },
    {
      name: "Optimism Testnet",
      chainId: 420,
      verifiable: false,
      image: optimism,
    },
  ],
};

export const getNetwork = (chainId: number) => {
  const network = supportedNetworks.mainnets.find(
    (network) => network.chainId === chainId
  );

  if (!network) {
    return supportedNetworks.testnets.find(
      (network) => network.chainId === chainId
    );
  }

  return network;
};

export const allSupportedNetworks = [
  ...supportedNetworks.mainnets,
  ...supportedNetworks.testnets,
];

export const getNetworkName = (chainId: number) => {
  const network = getNetwork(chainId);
  return network ? network.name : "Unknown";
};

export const getNetworkImage = (chainId: number) => {
  const network = getNetwork(chainId);
  return network ? network.image : eth;
};

export const getVerificationApiData = (chainId: number) => {
  const network = getNetwork(chainId);
  return {
    apiUrl: network?.verificationApi,
    apiKey: network?.apiKey,
  };
};

export const sagaChainlet: Chain = {
  id: 1673014940,
  name: "SAGA Chainlet",
  network: "saga",
  nativeCurrency: {
    decimals: 18,
    name: "SAGA",
    symbol: "SAGA",
  },
  rpcUrls: {
    default: {
      http: [
        "http://a60c0cbca38bc444ead0bc38dfa06627-47127bb129edf0ea.elb.us-west-1.amazonaws.com:8545",
      ],
    },
  },
};
