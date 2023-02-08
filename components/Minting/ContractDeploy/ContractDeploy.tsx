import { ethers } from "ethers";
import useApi from "hooks/useApi";
import React, { useEffect, useState } from "react";
import {
  ERC721ContractData,
  ERC721ContractOptions,
  TokenData,
} from "types/tokens";
import { useAccount, useNetwork, useSigner } from "wagmi";
import { allSupportedNetworks } from "constants/supportedNetworks";
import SubHeading from "components/SubHeading/SubHeading";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Button from "components/shared/Button";
import { classNames } from "utils/client/classNames";
import Link from "next/link";
import Fader from "components/Fader/Fader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSummaryData } from "./summaryTableData";

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
  const { address } = useAccount();
  const { generateContract, saveDeployedAddress } = useApi();
  const [stage, setStage] = useState(0);
  const { chain } = useNetwork();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (tokenData.address !== "") setStepComplete(true);
  }, [tokenData.address, setStepComplete]);

  const generateContractMutation = useMutation(generateContract, {
    onMutate: () => {
      setTokenData({
        ...tokenData,
        address: "",
      });
      setStage(1);
    },
    onSuccess: async (data) => {
      if (!signer) return;
      const { contractId, abi, bytecode } = data;
      setStage(2);
      const contract = new ethers.ContractFactory(abi, bytecode, signer);
      const args = [];
      if (tokenData.type === "ERC721") {
        const { options } = tokenData as ERC721ContractData;
        const {
          mintFee,
          maxSupply,
          walletLimit,
          customPaymentToken,
          customPaymentTokenData,
        } = options as ERC721ContractOptions;
        if (mintFee) args.push(mintFee);
        if (maxSupply) args.push(maxSupply);
        if (customPaymentToken) args.push(customPaymentTokenData.address);
        if (walletLimit) args.push(walletLimit);
      }

      const deployedContract = await contract.deploy(...args);
      setStage(3);
      await deployedContract.deployTransaction.wait();
      setTokenData({
        ...tokenData,
        contractId,
        address: deployedContract.address,
      });
      await saveDeployedAddressMutation.mutateAsync({
        contractId: contractId,
        address: deployedContract.address,
        type: tokenData.type,
      });
      setStage(4);
    },
    onError: () => {
      setStage(0);
    },
  });
  const saveDeployedAddressMutation = useMutation(saveDeployedAddress, {
    onSettled: () => {
      queryClient.invalidateQueries(["contractsCount"]);
      setStepComplete(true);
    },
  });

  const currentNetwork = allSupportedNetworks.find(
    (network) => network.chainId === chain?.id
  );

  const stages = [
    "Ready to deploy",
    "Generating contract...",
    "Sending transaction...",
    "Waiting for confirmation...",
    "Success!",
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
            {getSummaryData(tokenData).map((item) => {
              if (!item) return null;
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
              {generateContractMutation.isError ? (
                <div className="flex">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <span className="ml-2">
                    Something went wrong. Please try again.
                  </span>
                </div>
              ) : (
                stages[stage]
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
              disabled={
                generateContractMutation.isLoading && !tokenData.address
              }
              onClick={() =>
                generateContractMutation.mutate({
                  tokenData,
                  creator: address as string,
                })
              }
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
