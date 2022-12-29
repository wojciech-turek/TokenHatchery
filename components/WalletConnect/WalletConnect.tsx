import Container from "components/Container/Container";
import React from "react";
import { truncateAddress } from "utils/client/truncateAddress";
import { useAccount, useConnect, useNetwork } from "wagmi";

const WalletConnect = () => {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();

  const connectWallet = () => {
    connect({ connector: connectors[0] });
  };

  return (
    <div>
      <p>
        {!isConnected ? (
          <button onClick={() => connectWallet()}>Connect Wallet</button>
        ) : (
          `Connected with wallet: ${truncateAddress(address)}`
        )}
      </p>
    </div>
  );
};

export default WalletConnect;
