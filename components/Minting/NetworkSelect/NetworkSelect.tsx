import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSwitchNetwork } from "wagmi";
import { Switch } from "@headlessui/react";
import { Network, supportedNetworks } from "constants/supportedNetworks";
import { classNames } from "utils/client/classNames";
import SubHeading from "components/SubHeading/SubHeading";
import Fader from "components/Fader/Fader";
import { TokenData } from "types/tokens";

const NetworkSelect = ({
  tokenData,
  setTokenData,
  setStepComplete,
}: {
  tokenData: TokenData;
  setTokenData: (value: TokenData) => void;
  setStepComplete: (value: boolean) => void;
}) => {
  const { isLoading, switchNetworkAsync } = useSwitchNetwork();
  const [testnet, setTestnet] = useState(false);

  const handleSelectNetwork = async (name: string, chainId: number) => {
    if (isLoading) return;
    try {
      await switchNetworkAsync?.(chainId);
      setTokenData({
        ...tokenData,
        networkName: name,
        networkChainId: String(chainId),
      });

      setStepComplete(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tokenData?.networkName) {
      setStepComplete(true);
    }
  }, [setStepComplete, tokenData?.networkName]);

  const renderNetworks = (networks: Network[]) => (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {networks.map((availableNetwork) => {
        return (
          <li
            onClick={() =>
              handleSelectNetwork(
                availableNetwork.name,
                availableNetwork.chainId
              )
            }
            key={availableNetwork.name}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            <div
              className={classNames(
                availableNetwork.name === tokenData?.networkName
                  ? "bg-indigo-50 border-2 rounded border-indigo-500 z-10"
                  : "hover:bg-gray-50 border-transparent",
                "border-2  flex w-full items-center justify-between space-x-6 p-6 cursor-pointer"
              )}
            >
              <Image
                src={availableNetwork.image}
                alt={availableNetwork.name}
                width={32}
                height={32}
              />
              <span className="text-center grow">{availableNetwork.name}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <Fader>
        <div>
          <SubHeading>Select network</SubHeading>
          <p className="text-sm font-medium text-gray-700 mb-12">
            Select the network you wish to deploy your token on, make sure to
            confirm the network change in your wallet.{" "}
            <span className="font-bold">
              Your wallet may not support all of the networks below.
            </span>{" "}
            <br />
            To deploy your token on a testnet flip the switch below and select
            desired network.
          </p>
          <div className="flex pb-4">
            <span className="text-gray-700 pr-4">Testnet deployment</span>
            <Switch
              checked={testnet}
              onChange={setTestnet}
              className={classNames(
                testnet ? "bg-indigo-600" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              )}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={classNames(
                  testnet ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
          </div>
        </div>

        <div>
          {renderNetworks(
            testnet ? supportedNetworks.testnets : supportedNetworks.mainnets
          )}
        </div>
      </Fader>
    </>
  );
};

export default NetworkSelect;
