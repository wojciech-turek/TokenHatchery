import Button from "components/shared/Button";
import ExternalLink from "components/shared/ExternalLink";
import SubHeading from "components/SubHeading/SubHeading";
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

const WalletConnect = ({ nextStep }: { nextStep: () => void }) => {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data } = useBalance({ address });

  const [availableConnectors, setAvailableConnectors] = useState<Connector[]>(
    []
  );

  const connectWallet = (connector: number) => {
    connect({ connector: connectors[connector] });
  };

  const logos: { [key: string]: string } = {
    WalletConnect: "/walletconnect.png",
    MetaMask: "/metamask.png",
    "Coinbase Wallet": "/coinbase.png",
    Ledger: "/ledger.png",
    Tally: "/tally.png",
  };

  useEffect(() => {
    setAvailableConnectors(connectors);
  }, [connectors]);

  return (
    <div>
      <SubHeading>Select your wallet</SubHeading>
      <p className="text-sm font-medium text-gray-700 mb-12">
        Select the wallet connection type you would like to use. If you do not
        have a wallet yet, you can download and create one with{" "}
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
                  className="block"
                  src={logos[connector.name]}
                  alt={connector.name}
                  width={32}
                  height={32}
                />
              ) : null}
              <div className="flex whitespace-nowrap">{connector.name}</div>
            </li>
          )
        )}
      </ul>
      {isConnected ? (
        <div className="mt-12 flex flex-col">
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
          {/* red text disconnect */}
          <div className="mt-2">
            <button
              type="button"
              onClick={() => disconnect()}
              className="rounded border border-red-600 text-red-600 px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : null}
      <div className="mt-12">
        <Button disabled={!isConnected} onClick={() => nextStep()}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default WalletConnect;
