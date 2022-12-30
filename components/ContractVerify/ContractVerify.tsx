import Heading from "components/Typography/Heading/Heading";
import Text from "components/Typography/Text/Text";
import useApi from "hooks/useApi";
import React, { useState } from "react";

const ContractVerify = ({ contractId }: { contractId: string }) => {
  const [verifySubmitted, setVerifySubmitted] = useState<boolean>(false);
  const { handleVerify } = useApi();

  const handleVerifyRequest = () => {
    setVerifySubmitted(true);
    handleVerify({ contractId });
  };

  return (
    <div>
      <Heading type="h6">Contract verification</Heading>
      <Text>
        Click the button below to have your contract verified on respective
        block explorer for the deployed network.
      </Text>
      <button onClick={handleVerifyRequest} disabled={verifySubmitted}>
        Verify
      </button>
      <Text>Check verification status</Text>
      <button disabled={!verifySubmitted}>Check</button>
    </div>
  );
};

export default ContractVerify;
