import Modal from "components/Modal/Modal";
import React, { useEffect, useState } from "react";
import { Connector, useAccount, useConnect, useDisconnect } from "wagmi";

const ConnectWalletModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const { connectAsync, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const [availableConnectors, setAvailableConnectors] = useState<Connector[]>(
    []
  );

  const connectWallet = async (connector: number) => {
    await connectAsync({ connector: connectors[connector] });
    onClose();
  };

  useEffect(() => {
    if (connectors.filter((c) => c.name === "MetaMask").length > 1) {
      connectors.splice(0, 1);
    }
    setAvailableConnectors(connectors);
  }, [connectors]);

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Select provider and connect wallet"
    >
      <div className="mt-6">
        <ul role="list" className="">
          {availableConnectors.map(
            (connector: Connector, connectorId: number) => (
              <li key={connectorId} className="font-medium text-lg text-center">
                <button
                  onClick={() => connectWallet(connectorId)}
                  className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50"
                >
                  {connector.name}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
