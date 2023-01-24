import Button from "components/shared/Button";
import SubHeading from "components/SubHeading/SubHeading";
import useApi from "hooks/useApi";
import React, { useEffect, useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { TokenData } from "types/tokens";
import { allSupportedNetworks } from "constants/supportedNetworks";
import { useNetwork } from "wagmi";
import ExternalLink from "components/shared/ExternalLink";
import Fader from "components/Fader/Fader";
import { useMutation } from "@tanstack/react-query";

const ContractVerify = ({
  tokenData,
  setStepComplete,
}: {
  tokenData: TokenData;
  setStepComplete: (val: boolean) => void;
}) => {
  const { handleVerify, checkVerifyStatus } = useApi();
  const [loading, setLoading] = useState(false);
  const { chain } = useNetwork();

  const statusStates = {
    pending: "Pending in queue",
    pass: "Pass - Verified",
  };
  const alreadyVerifiedString = "Contract source code already verified";

  const verifyContract = useMutation(handleVerify, {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        const { type, networkChainId } = tokenData;
        verifyStatus.mutate({
          verificationGuid: data.guid,
          type,
          networkChainId,
        });
      }, 15000);
    },
    onError() {
      setLoading(false);
    },
  });
  const verifyStatus = useMutation(checkVerifyStatus, {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data, variables) => {
      if (data === statusStates.pass) {
        setLoading(false);
      } else if (data === statusStates.pending) {
        setTimeout(() => {
          const { type, networkChainId } = tokenData;
          const { verificationGuid } = variables as {
            verificationGuid: string;
          };
          verifyStatus.mutate({
            verificationGuid: verificationGuid,
            type,
            networkChainId,
          });
        }, 150000);
      }
    },
    onError() {
      setLoading(false);
    },
  });

  const currentNetwork = allSupportedNetworks.find(
    (network) => network.chainId === chain?.id
  );

  useEffect(() => {
    setStepComplete(true);
  }, [setStepComplete]);

  return (
    <Fader>
      <SubHeading>Verify your contract</SubHeading>
      <p className="text-sm font-medium text-gray-700 mb-8">
        In order to interact with your contract through blockchain explorers you
        can verify it, this is also a great way to show your contract is secure
        and open source. <br />
        <span className="font-bold">
          Please note verification may not be available on all networks.
        </span>
      </p>
      <Button
        color="green"
        disabled={verifyContract.isLoading || loading}
        onClick={() => {
          const { contractId, type } = tokenData;
          verifyContract.mutate({ contractId, tokenType: type });
        }}
      >
        Verify
      </Button>
      {loading ? (
        <div className="flex text-gray-700 my-6 gap-2">
          <span className="h-6 w-6 block rounded-full border-4 border-t-blue-300 animate-spin"></span>
          <span>Please wait while we verify your contract</span>
        </div>
      ) : null}
      {verifyStatus.isError ? (
        <div className="flex text-red-700 my-6 gap-2">
          <span>{(verifyContract.error as Error).message}</span>
        </div>
      ) : null}
      {verifyContract.error &&
      (verifyContract.error as Error).message !== alreadyVerifiedString ? (
        <div className="flex text-red-700 my-6 gap-2">
          <div>{(verifyContract.error as Error).message}</div>
          <div>Please try again in a few moments</div>
        </div>
      ) : null}
      {verifyStatus.data === statusStates.pass ||
      (verifyContract.error &&
        (verifyContract.error as Error).message === alreadyVerifiedString) ? (
        <>
          <div className="flex text-green-700 my-6 gap-2">
            <span>Success! Your contract has been verified!</span>
          </div>
          {currentNetwork?.blockExplorer ? (
            <ExternalLink
              href={`${currentNetwork?.blockExplorer}/address/${tokenData.address}`}
            >
              View on blockexplorer{" "}
              <ArrowTopRightOnSquareIcon
                className="inline-block relative -top-2 h-5 w-5 text-gray-400"
                width={20}
                height={20}
              />
            </ExternalLink>
          ) : null}
        </>
      ) : null}
    </Fader>
  );
};

export default ContractVerify;
