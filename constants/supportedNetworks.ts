import eth from "public/eth.png";
import bsc from "public/bsc.png";
import matic from "public/matic.png";
import fantom from "public/fantom.png";
import arb from "public/arb.png";
import avax from "public/avax.png";
import evmos from "public/evmos.png";
import optimism from "public/optimism.png";
import gno from "public/gno.png";
import { StaticImageData } from "next/image";

export type Network = {
  chainId: number;
  name: string;
  image: StaticImageData;
  blockExplorer?: string;
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
    },
    {
      chainId: 56,
      name: "BNB Chain Mainnet",
      image: bsc,
    },
    {
      chainId: 137,
      name: "Polygon Mainnet",
      image: matic,
    },
    {
      chainId: 250,
      name: "Fantom Opera Mainnet",
      image: fantom,
    },
    {
      chainId: 42161,
      name: "Arbitrum Mainnet",
      image: arb,
    },
    {
      chainId: 43114,
      name: "Avalanche Mainnet",
      image: avax,
    },
    {
      name: "EVMOS Mainnet",
      chainId: 9001,
      image: evmos,
    },
    {
      name: "Optimism Mainnet",
      chainId: 10,
      image: optimism,
    },
    {
      name: "Gnosis Mainnet",
      chainId: 100,
      image: gno,
    },
  ],
  testnets: [
    {
      chainId: 5,
      name: "Ethereum Goerli Testnet",
      image: eth,
      blockExplorer: "https://goerli.etherscan.io",
    },
    {
      chainId: 97,
      name: "BNB Chain Testnet",
      image: bsc,
    },
    {
      chainId: 80001,
      name: "Polygon Mumbai Testnet",
      image: matic,
    },
    {
      chainId: 4002,
      name: "Fantom Opera Testnet",
      image: fantom,
    },
    {
      chainId: 421613,
      name: "Arbitrum Goerli Testnet",
      image: arb,
    },
    {
      chainId: 43113,
      name: "Avalanche Fuji Testnet",
      image: avax,
    },
    {
      name: "EVMOS Testnet",
      chainId: 9000,
      image: evmos,
    },
    {
      name: "Optimism Testnet",
      chainId: 420,
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
