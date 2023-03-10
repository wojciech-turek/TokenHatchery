import ExternalLink from "components/shared/ExternalLink";
import SubHeading from "components/SubHeading/SubHeading";
import { logos } from "constants/connectorLogos";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { truncateAddress } from "utils/client/truncateAddress";
import {
  useAccount,
  useConnect,
  Connector,
  useBalance,
  useDisconnect,
} from "wagmi";
import Fader from "components/Fader/Fader";

const WalletConnect = ({
  setStepComplete,
}: {
  setStepComplete: (value: boolean) => void;
}) => {
  const { connectAsync, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const [walletConnected, setWalletConnected] = useState(false);
  const { disconnect } = useDisconnect();
  const { data } = useBalance({ address });

  const [availableConnectors, setAvailableConnectors] = useState<Connector[]>(
    []
  );

  const connectWallet = async (connector: number) => {
    try {
      await connectAsync({ connector: connectors[connector] });
      setStepComplete(true);
      setWalletConnected(true);
    } catch {
      if (isConnected) {
        setStepComplete(true);
        setWalletConnected(true);
      }
      console.log("error connecting wallet");
    }
  };

  useEffect(() => {
    if (connectors.filter((c) => c.name === "MetaMask").length > 1) {
      connectors.splice(0, 1);
    }
    setAvailableConnectors(connectors);
  }, [connectors, isConnected, setStepComplete]);

  return (
    <>
      <Fader>
        <div>
          <SubHeading>Select your wallet</SubHeading>
          <p className="text-sm font-medium text-gray-700 mb-12">
            Select the wallet connection type you would like to use. If you do
            not have a wallet yet, you can download and create one with{" "}
            <ExternalLink href="https://tallyho.org/">TallyHo</ExternalLink>,{" "}
            <ExternalLink href="https://metamask.io/">MetaMask</ExternalLink>,{" "}
            <ExternalLink href="https://www.coinbase.com/wallet">
              Coinbase
            </ExternalLink>{" "}
            and more.
          </p>
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          >
            {availableConnectors.map(
              (connector: Connector, connectorId: number) => (
                <li
                  key={connector.name}
                  onClick={() => connectWallet(connectorId)}
                  className="col-span-1 flex flex-row items-center justify-center text-left bg-white rounded-lg shadow p-8 gap-2 cursor-pointer hover:bg-indigo-50"
                >
                  {logos[connector.name] ? (
                    <Image
                      src={logos[connector.name]}
                      alt={connector.name}
                      priority
                      width={40}
                      height={32}
                    />
                  ) : null}
                  <div className="flex whitespace-nowrap">{connector.name}</div>
                </li>
              )
            )}
          </ul>
          {walletConnected ? (
            <div className="mt-12 flex flex-col text-left">
              <div className="text-2xl font-bold my-4">Wallet connected!</div>
              <div className="flex gap-2">
                <div className="font-bold">Address:</div>
                <div className="text-gray-500">{truncateAddress(address)}</div>
              </div>
              <div className="flex gap-2">
                <div className="font-bold">Balance:</div>
                <div className="text-gray-500">
                  {data?.formatted} {data?.symbol}
                </div>
              </div>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => {
                    disconnect();
                    setWalletConnected(false);
                    setStepComplete(false);
                  }}
                  className="rounded border border-red-600 text-red-600 px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Disconnect
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </Fader>
    </>
  );
};

export default WalletConnect;
