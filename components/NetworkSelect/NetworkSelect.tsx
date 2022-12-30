import {
  allSupportedNetworks,
  Network,
  supportedNetworks,
} from "constants/supportedNetworks";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";
import styles from "./NetworkSelect.module.scss";

const NetworkSelect = ({
  setNetwork,
}: {
  setNetwork: Dispatch<SetStateAction<{ name: string; chainId: number }>>;
}) => {
  const { isLoading, switchNetworkAsync } = useSwitchNetwork();
  const { chain } = useNetwork();

  useEffect(() => {
    if (chain) {
      const network = allSupportedNetworks.find(
        (network) => network.chainId === chain.id
      );
      if (network) {
        setNetwork({ name: network.name, chainId: network.chainId });
      }
    }
  }, [chain, setNetwork]);

  const handleSelectNetwork = async (name: string, chainId: number) => {
    if (isLoading) return;
    await switchNetworkAsync?.(chainId);
    setNetwork({ name, chainId });
  };

  const renderNetworks = (networks: Network[]) => (
    <div className={styles.networks}>
      {networks.map((network) => {
        return (
          <div
            key={network.name}
            className={styles.network}
            onClick={() => handleSelectNetwork(network.name, network.chainId)}
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
