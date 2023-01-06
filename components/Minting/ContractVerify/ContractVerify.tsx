import Button from "components/shared/Button";
import SubHeading from "components/SubHeading/SubHeading";
import useApi from "hooks/useApi";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { TokenType } from "types/tokens";
import { allSupportedNetworks } from "constants/supportedNetworks";
import { useNetwork } from "wagmi";
import ExternalLink from "components/shared/ExternalLink";
import Fader from "components/Fader/Fader";

const ContractVerify = ({
  contractId,
  contractAddress,
  tokenType,
}: {
  contractId: string;
  contractAddress: string;
  tokenType: TokenType;
}) => {
  const [verifySubmitted, setVerifySubmitted] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<string>("");
  const { handleVerify, checkVerifyStatus } = useApi();
  const { chain } = useNetwork();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const currentNetwork = allSupportedNetworks.find(
    (network) => network.chainId === chain?.id
  );

  const handleVerifyRequest = async () => {
    setError("");
    setVerifySubmitted(true);
    const data = await handleVerify({ contractId, tokenType });
    if (data.guid) {
      setRequestId(data.guid);
    } else if (data.error) {
      if (data.error.startsWith("Unable to locate ContractCode")) {
        setError("Contract not yet ready, please try again in a few moments");
        setVerifySubmitted(false);
      } else if (
        data.error.startsWith("Contract source code already verified")
      ) {
        setSuccess(true);
      } else {
        setError(data.error);
      }
    }
  };
  const handleVerifyStatus = useCallback(async () => {
    if (!requestId) return;
    const status = await checkVerifyStatus(requestId);
    if (status === "Pass - Verified") {
      setSuccess(true);
    } else if (status === "Pending in queue") {
      setTimeout(() => {
        handleVerifyStatus();
      }, 5000);
    } else {
      setError(status);
    }
    setVerifySubmitted(false);
  }, [requestId, checkVerifyStatus]);

  useEffect(() => {
    if (verifySubmitted) {
      setTimeout(() => {
        handleVerifyStatus();
      }, 5000);
    }
  }, [verifySubmitted, handleVerifyStatus]);

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
        disabled={verifySubmitted}
        onClick={handleVerifyRequest}
      >
        Verify
      </Button>
      {verifySubmitted && error === "" && !success ? (
        <div className="flex text-gray-700 my-6 gap-2">
          <span className="h-6 w-6 block rounded-full border-4 border-t-blue-300 animate-spin"></span>
          <span>Please wait while we verify your contract</span>
        </div>
      ) : null}
      {error !== "" ? (
        <div className="flex text-red-700 my-6 gap-2">
          <span>{error}</span>
        </div>
      ) : null}
      {success ? (
        <>
          <div className="flex text-green-700 my-6 gap-2">
            <span>Success! Your contract has been verified!</span>
          </div>
          {currentNetwork?.blockExplorer ? (
            <ExternalLink
              href={`${currentNetwork?.blockExplorer}/address/${contractAddress}`}
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
      <div className="mt-6">
        <Button onClick={() => router.push("/manage")}>
          Go to manage page
        </Button>
      </div>
    </Fader>
  );
};

export default ContractVerify;
