import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Chain, useNetwork, useSwitchNetwork } from "wagmi";
import styles from "./NetworkSelect.module.scss";

type Network = {
  chainId: number;
  name: string;
  image: string;
};

const supportedNetworks: {
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
      chainId: 32659,
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
      name: "Goerli Testnet",
      image: "/eth.png",
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
      chainId: 421611,
      name: "Arbitrum Testnet",
      image: "/arb.png",
    },
    {
      chainId: 43113,
      name: "Avalanche Fuji Testnet",
      image: "/avax.png",
    },
    {
      name: "EVMOS Testnet",
      chainId: 1313161554,
      image: "/evmos.png",
    },
    {
      name: "Optimism Testnet",
      chainId: 69,
      image: "/optimism.png",
    },
  ],
};

const NetworkSelect = ({
  setConnected,
}: {
  setConnected: (val: boolean) => void;
}) => {
  const { isLoading, switchNetwork } = useSwitchNetwork();
  const { chain, chains } = useNetwork();

  const handleSelectNetwork = (chainId: number) => {
    if (isLoading) return;
    switchNetwork?.(chainId);
  };

  useEffect(() => {
    const connectedToValidChain = chains.some(
      (availableChain) => availableChain.id === chain?.id
    );

    setConnected(connectedToValidChain);
  }, [setConnected, chain, chains]);

  const renderNetworks = (networks: Network[]) => (
    <div className={styles.networks}>
      {networks.map((network) => {
        return (
          <div
            key={network.name}
            className={styles.network}
            onClick={() => handleSelectNetwork(network.chainId)}
          >
            <div className={styles.name}>
              <Image
                src={network.image}
                alt={network.name}
                width={20}
                height={20}
              />
              <span>{network.name}</span>
            </div>
            <input
              type="radio"
              name="network"
              className={styles.radio}
              readOnly
              checked={chain?.id === network.chainId}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <p>Mainnets:</p>
      {renderNetworks(supportedNetworks.mainnets)}
      <p>Testnets:</p>
      {renderNetworks(supportedNetworks.testnets)}
    </div>
  );
};

export default NetworkSelect;
