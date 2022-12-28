import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Chain, useNetwork, useSwitchNetwork } from "wagmi";
import styles from "./NetworkSelect.module.scss";

const NetworkSelect = ({
  setConnected,
}: {
  setConnected: (val: boolean) => void;
}) => {
  const [availableChains, setAvailableChains] = useState<Chain[]>([]);
  const { isLoading, switchNetwork } = useSwitchNetwork();
  const { chain, chains } = useNetwork();

  useEffect(() => {
    if (chains.length > 0) {
      setAvailableChains(chains);
    }
  }, [chains]);

  const handleSelectNetwork = (chain: Chain) => {
    if (isLoading || !chain) return;
    switchNetwork?.(chain.id);
  };

  useEffect(() => {
    const connectedToValidChain = chains.some(
      (availableChain) => availableChain.id === chain?.id
    );

    setConnected(connectedToValidChain);
  }, [setConnected, chain, chains]);

  return (
    <div>
      <div className={styles.networks}>
        {availableChains.map((network, index) => (
          <div
            key={network.name}
            className={styles.network}
            onClick={() => handleSelectNetwork(network)}
          >
            <div className={styles.name}>
              <Image
                src={`/${network.network}.png`}
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
              checked={chain?.id === network.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkSelect;
