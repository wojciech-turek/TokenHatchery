import Container from "components/Container/Container";
import PageHeading from "components/shared/PageHeading/PageHeading";
import Steps from "components/Steps/Steps";
import React, { useState } from "react";
import { mintingSteps } from "constants/mintingSteps";
import WalletConnect from "components/Minting/WalletConnect/WalletConnect";
import NetworkSelect from "components/Minting/NetworkSelect/NetworkSelect";
import ExtensionSelect from "components/Minting/ExtensionSelect/ExtensionSelect";
import { erc1155Extensions } from "constants/availableTokenTypes";
import ContractDeploy from "components/Minting/ContractDeploy/ContractDeploy";
import ContractVerify from "components/Minting/ContractVerify/ContractVerify";
import { TokenData, TokenType } from "types/tokens";
import Personalization from "components/Minting/Personalization/Personalization";
import Button from "components/shared/Button";
import { useRouter } from "next/router";
import { scrollToTop } from "utils/client/scrollTop";

const Erc1155 = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [stepComplete, setStepComplete] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<TokenData>({
    name: "",
    symbol: "",
    address: "",
    contractId: "",
    networkChainId: "",
    baseURI: "",
    networkName: "",
    extensions: [],
    managementType: "Ownable",
    type: TokenType.ERC1155,
  });

  const handleCompleteStep = (value: boolean) => {
    setStepComplete(value);
  };

  const goToManagePage = () => {
    router.push("/manage");
  };

  const nextStep = () => {
    scrollToTop();
    setCurrentStep(currentStep + 1);
  };

  const stepComponents = [
    { body: <WalletConnect setStepComplete={handleCompleteStep} /> },
    {
      body: (
        <NetworkSelect
          setStepComplete={handleCompleteStep}
          setTokenData={setTokenData}
          tokenData={tokenData}
        />
      ),
    },
    {
      body: (
        <ExtensionSelect
          extensions={erc1155Extensions}
          tokenData={tokenData}
          setTokenData={setTokenData}
          setStepComplete={handleCompleteStep}
        />
      ),
    },
    {
      body: (
        <Personalization
          tokenData={tokenData}
          setTokenData={setTokenData}
          setStepComplete={handleCompleteStep}
          type={TokenType.ERC1155}
        />
      ),
    },
    {
      body: (
        <ContractDeploy
          tokenData={tokenData}
          setTokenData={setTokenData}
          setStepComplete={handleCompleteStep}
        />
      ),
    },
    {
      body: (
        <ContractVerify
          tokenData={tokenData}
          setStepComplete={handleCompleteStep}
        />
      ),
    },
  ];

  return (
    <Container>
      <PageHeading>ERC1155 Creator</PageHeading>
      <div className="bg-gray-50 p-4 rounded-md mt-6">
        <Steps
          steps={mintingSteps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        {stepComponents[currentStep].body}
        <div className="mt-12">
          <Button
            disabled={!stepComplete}
            onClick={
              mintingSteps.length - 1 === currentStep
                ? goToManagePage
                : () => nextStep()
            }
          >
            {mintingSteps.length - 1 === currentStep
              ? "Go to manage page"
              : "Continue"}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Erc1155;
