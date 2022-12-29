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
