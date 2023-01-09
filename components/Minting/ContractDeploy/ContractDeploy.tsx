import { ethers } from "ethers";
import useApi from "hooks/useApi";
import React, { Dispatch, SetStateAction, useState } from "react";
import { TokenData, TokenType } from "types/tokens";
import { useNetwork, useSigner } from "wagmi";
import { allSupportedNetworks } from "constants/supportedNetworks";
import SubHeading from "components/SubHeading/SubHeading";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Button from "components/shared/Button";
import { classNames } from "utils/client/classNames";
import Link from "next/link";
import Fader from "components/Fader/Fader";

interface ContractDeployProps {
  tokenData: TokenData;
  setTokenData: (value: TokenData) => void;
  setStepComplete: (value: boolean) => void;
}

const ContractDeploy = ({
  tokenData,
  setTokenData,
  setStepComplete,
}: ContractDeployProps) => {
  const { data: signer } = useSigner();
  const { generateContract, saveDeployedAddress } = useApi();
  const [deploying, setDeploying] = useState(false);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState("");
  const { chain } = useNetwork();

  const currentNetwork = allSupportedNetworks.find(
    (network) => network.chainId === chain?.id
  );

  const deployContract = async () => {
    if (!currentNetwork) {
      setError("Please select a network");
      return;
    }
    setDeploying(true);
    if (!signer) return;
    try {
      const address = await signer.getAddress();
      const { contractId, abi, bytecode } = await generateContract({
        tokenData,
        creator: address,
      });
      setStage(1);
      const contract = new ethers.ContractFactory(abi, bytecode, signer);
      setStage(2);
      const deployedContract = await contract.deploy();
      setStage(3);
      await deployedContract.deployTransaction.wait();
      setStage(4);
      setTokenData({
        ...tokenData,
        contractId,
        address: deployedContract.address,
      });

      await saveDeployedAddress({
        contractId: contractId,
        address: deployedContract.address,
        type: tokenData.type,
      });
      setDeploying(false);
      setStepComplete(true);
    } catch (e) {
      console.log(e);
      setStage(0);
      setDeploying(false);
    }
  };

  const {
    name,
    symbol,
    decimals,
    initialSupply,
    type,
    managementType,
    extensions,
  } = tokenData;

  const summaryData = [
    {
      id: 1,
      title: "Token type",
      description: type,
    },
    {
      id: 2,
      title: "Token name",
      description: name,
    },
    {
      id: 3,
      title: "Token symbol",
      description: symbol,
    },
    {
      id: 4,
      title: "Decimals",
      description: decimals,
    },
    {
      id: 5,
      title: "Initial supply",
      description: initialSupply,
    },
    {
      id: 6,
      title: "Management type",
      description: managementType,
    },
    {
      id: 7,
      title: "Extensions",
      description: extensions.length ? extensions.join(", ") : "None",
    },
  ];

  const stages = [
    "Generating contract...",
    "Preparing transaction...",
    "Sending transaction...",
    "Waiting for confirmation...",
  ];

  return (
    <Fader>
      <SubHeading>Deploy your contract</SubHeading>
      <p className="text-sm font-medium text-gray-700">
        You are about to deploy your token with the settings below. Please make
        sure you have enough funds to pay for the transaction.
      </p>
      {!currentNetwork?.verifiable && (
        <div className="mt-4 text-yellow-600 rounded-md inline-block">
          This network does not support contract verification yet. You can still
          deploy your contract, but you will not be able to verify it.
        </div>
      )}
      <div className="flex flex-col items-start justify-between mt-12 sm:flex-row gap-4">
        <div className="overflow-hidden bg-white shadow sm:rounded-md w-full  sm:w-1/3">
          <ul role="list" className="divide-y divide-gray-200">
            {summaryData.filter(Boolean).map((item) => {
              if (!Boolean(item.description)) return null;
              return (
                <li key={item.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-center gap-4">
                    <p className="text-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                    <div className="flex flex-col grow text-sm text-right text-gray-500">
                      <p>{item.description}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="px-4 grow shadow bg-white w-full  sm:rounded-md">
          <div className="grid place-content-center"></div>
          <div className="text-2xl font-bold my-4">Deployment information</div>
          <div className="flex gap-2">
            <div className="font-bold">Status:</div>
            <div className="text-gray-500 flex">
              {error ? (
                <div className="flex">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <span className="ml-2">{error}</span>
                </div>
              ) : deploying ? (
                stages[stage]
              ) : tokenData.address !== "" ? (
                "Success!"
              ) : (
                "Ready to deploy"
              )}
            </div>
          </div>
          <div>
            <h4 className="sr-only">Status</h4>
            <p className="text-sm font-medium text-gray-900"></p>
            <div className="mt-6 relative" aria-hidden="true">
              <div className="w-full rounded-full bg-gray-200">
                <div
                  className={classNames(
                    stage === 4
                      ? "bg-green-600"
                      : "animate-pulse bg-indigo-600",
                    "h-2 rounded-full transition-width ease-in-out duration-500"
                  )}
                  style={{ width: `${stage * 25}%` }}
                />
              </div>
            </div>
          </div>
          {tokenData.address ? (
            <>
              <div className="flex flex-col gap-2 mt-6 sm:flex-row">
                <div className="font-bold">Your contract address:</div>
                <div className="text-gray-500 break-all">
                  {tokenData.address}
                </div>
              </div>

              <p className="text-sm font-medium text-gray-700 mt-4">
                Congratulations! Your contract has been deployed. You can now
                verify it in the next step or go to the{" "}
                <Link
                  className="cursor-pointer font-bold text-indigo-500"
                  href="/manage"
                >
                  manage page{" "}
                </Link>
                if you prefer not to do that now.
              </p>
            </>
          ) : null}
          <div className="py-4">
            <Button
              color="green"
              disabled={error !== "" || deploying}
              onClick={deployContract}
            >
              {tokenData.address ? "Deploy another" : "Deploy"}
            </Button>
          </div>
        </div>
      </div>
    </Fader>
  );
};

export default ContractDeploy;
