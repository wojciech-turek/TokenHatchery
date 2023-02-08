import Container from "components/Container/Container";
import PageHeading from "components/shared/PageHeading/PageHeading";
import Steps from "components/Steps/Steps";
import React, { useState } from "react";
import { mintingSteps } from "constants/mintingSteps";
import WalletConnect from "components/Minting/WalletConnect/WalletConnect";
import NetworkSelect from "components/Minting/NetworkSelect/NetworkSelect";
import ContractDeploy from "components/Minting/ContractDeploy/ContractDeploy";
import ContractVerify from "components/Minting/ContractVerify/ContractVerify";
import { TokenData, ContractType } from "types/tokens";
import Personalization from "components/Minting/Customization/Customization";
import { scrollToTop } from "utils/client/scrollTop";
import { NextButton } from "components/Minting/NextButton";

const Erc1155 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepComplete, setStepComplete] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<TokenData>({
    name: "",
    symbol: "",
    address: "",
    contractId: "",
    networkChainId: 0,
    baseURI: "",
    networkName: "",
    type: ContractType.ERC1155,
  });

  const handleCompleteStep = (value: boolean) => {
    setStepComplete(value);
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
        <Personalization
          tokenData={tokenData}
          setTokenData={setTokenData}
          setStepComplete={handleCompleteStep}
          type={ContractType.ERC1155}
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
        <>
          {stepComponents[currentStep].body}
          <NextButton
            stepComplete={stepComplete}
            currentStep={currentStep}
            moveToNextStep={nextStep}
          />
        </>
      </div>
    </Container>
  );
};

export default Erc1155;
