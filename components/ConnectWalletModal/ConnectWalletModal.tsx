import Modal from "components/Modal/Modal";
import { logos } from "constants/connectorLogos";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Connector, useConnect } from "wagmi";

const ConnectWalletModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const { connectAsync, connectors } = useConnect();
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
      <div className="mt-12">
        <ul role="list" className="">
          {availableConnectors.map(
            (connector: Connector, connectorId: number) => (
              <li
                key={connectorId}
                className="font-medium text-lg text-center cursor-pointer"
              >
                <div
                  onClick={() => connectWallet(connectorId)}
                  className="mt-4 flex items-center justify-center p-4 w-full border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50"
                >
                  {logos[connector.name] ? (
                    <Image
                      src={logos[connector.name]}
                      alt={connector.name}
                      priority
                      width={40}
                      height={32}
                    />
                  ) : null}{" "}
                  <div>{connector.name}</div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
