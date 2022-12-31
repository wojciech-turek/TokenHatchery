import Heading from "components/Typography/Heading/Heading";
import Text from "components/Typography/Text/Text";
import useApi from "hooks/useApi";
import React, { useState } from "react";
import { TokenType } from "types/tokens";

const ContractVerify = ({
  contractId,
  type,
}: {
  contractId: string;
  type: TokenType;
}) => {
  const [verifySubmitted, setVerifySubmitted] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<string>("");
  const { handleVerify, checkVerifyStatus } = useApi();
  const [status, setStatus] = useState<string>("");

  const handleVerifyRequest = async () => {
    setVerifySubmitted(true);

    const data = await handleVerify({ contractId, type });
    if (data.guid) {
      setRequestId(data.guid);
    } else if (data.error) {
      setStatus(data.error);
    }

    setVerifySubmitted(false);
  };

  const handleVerifyStatus = async () => {
    if (!requestId) return;
    const status = await checkVerifyStatus(requestId);
    setStatus(status);
  };

  return (
    <div>
      <Heading type="h6">Contract verification</Heading>
      <Text>
        Click the button below to have your contract verified on respective
        block explorer for the deployed network.
      </Text>
      <button onClick={handleVerifyRequest}>Verify</button>
      {verifySubmitted && (
        <Text>
          Verification submitted, please wait ~30 seconds then theck the status
          using button below
        </Text>
      )}
      <Text>Check verification status</Text>
      <button onClick={handleVerifyStatus}>Check</button>
      <Text>{status}</Text>
    </div>
  );
};

export default ContractVerify;
