export type Network = {
  chainId: number;
  name: string;
  image: string;
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
      image: "/eth.png",
    },
    {
      chainId: 56,
      name: "BNB Chain Mainnet",
      image: "/bsc.png",
    },
    {
      chainId: 137,
      name: "Polygon Mainnet",
      image: "/matic.png",
    },
    {
      chainId: 250,
      name: "Fantom Opera Mainnet",
      image: "/fantom.png",
    },
    {
      chainId: 42161,
      name: "Arbitrum Mainnet",
      image: "/arb.png",
    },
    {
      chainId: 43114,
      name: "Avalanche Mainnet",
      image: "/avax.png",
    },
    {
      name: "EVMOS Mainnet",
      chainId: 9001,
      image: "/evmos.png",
    },
    {
      name: "Optimism Mainnet",
      chainId: 10,
      image: "/optimism.png",
    },
    {
      name: "Gnosis Mainnet",
      chainId: 100,
      image: "/gno.png",
    },
  ],
  testnets: [
    {
      chainId: 5,
      name: "Ethereum Goerli Testnet",
      image: "/eth.png",
      blockExplorer: "https://goerli.etherscan.io",
    },
    {
      chainId: 97,
      name: "BNB Chain Testnet",
      image: "/bsc.png",
    },
    {
      chainId: 80001,
      name: "Polygon Mumbai Testnet",
      image: "/matic.png",
    },
    {
      chainId: 4002,
      name: "Fantom Opera Testnet",
      image: "/fantom.png",
    },
    {
      chainId: 421613,
      name: "Arbitrum Goerli Testnet",
      image: "/arb.png",
    },
    {
      chainId: 43113,
      name: "Avalanche Fuji Testnet",
      image: "/avax.png",
    },
    {
      name: "EVMOS Testnet",
      chainId: 9000,
      image: "/evmos.png",
    },
    {
      name: "Optimism Testnet",
      chainId: 420,
      image: "/optimism.png",
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
