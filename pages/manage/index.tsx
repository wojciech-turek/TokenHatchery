import Container from "components/Container/Container";
import PageHeading from "components/shared/PageHeading/PageHeading";
import React, { useEffect, useState } from "react";

import { useAccount } from "wagmi";
import Button from "components/shared/Button";
import TokenTable from "components/TokenTable/TokenTable";
import Modal from "components/Modal/Modal";

const Manage = () => {
  const { address, isConnected } = useAccount();
  const [walletConnected, setWalletConnected] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  useEffect(() => {
    if (isConnected) {
      setWalletConnected(true);
    } else {
      setWalletConnected(false);
    }
  }, [isConnected]);

  return (
    <Container>
      <PageHeading>Manage your tokens</PageHeading>
      <p className="mt-6 max-w-2xl text-xl text-gray-500">
        Manage your tokens deployed through the app, select any token to view
        detailed information and perform actions.
      </p>
      {walletConnected ? (
        <TokenTable />
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          <p className="text-xl text-red-700">
            Wallet connection is required to view your tokens.
          </p>
          <div>
            <Button onClick={() => setShowWalletModal(true)}>
              Select wallet
            </Button>
          </div>
        </div>
      )}
      <Modal onClose={() => setShowWalletModal(false)} show={showWalletModal} />
    </Container>
  );
};

export default Manage;
