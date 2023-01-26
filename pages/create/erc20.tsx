import React, { useEffect, useState } from "react";
import Container from "components/Container/Container";
import ExtensionSelect from "components/Minting/ExtensionSelect/ExtensionSelect";
import NetworkSelect from "components/Minting/NetworkSelect/NetworkSelect";
import WalletConnect from "components/Minting/WalletConnect/WalletConnect";
import ContractDeploy from "components/Minting/ContractDeploy/ContractDeploy";
import ContractVerify from "components/Minting/ContractVerify/ContractVerify";
import { TokenData, ContractType } from "types/tokens";
import PageHeading from "components/shared/PageHeading/PageHeading";
import Personalization from "components/Minting/Personalization/Personalization";
import Steps from "components/Steps/Steps";
import { mintingSteps } from "constants/mintingSteps";
import { erc20Extensions } from "constants/availableTokenTypes";
import { scrollToTop } from "utils/client/scrollTop";
import { NextButton } from "../../components/Minting/NextButton";

const Erc20 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepComplete, setStepComplete] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<TokenData>({
    name: "",
    symbol: "",
    decimals: "18",
    initialSupply: "",
    address: "",
    contractId: "",
    networkChainId: 0,
    networkName: "",
    extensions: [],
    managementType: "Ownable",
    type: ContractType.ERC20,
  });

  const handleCompleteStep = (value: boolean) => {
    setStepComplete(value);
  };

  useEffect(() => {
    setStepComplete(false);
  }, [currentStep]);

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
          tokenData={tokenData}
          setTokenData={setTokenData}
        />
      ),
    },
    {
      body: (
        <ExtensionSelect
          extensions={erc20Extensions}
          setStepComplete={handleCompleteStep}
          tokenData={tokenData}
          setTokenData={setTokenData}
        />
      ),
    },
    {
      body: (
        <Personalization
          setTokenData={setTokenData}
          tokenData={tokenData}
          setStepComplete={handleCompleteStep}
          type={ContractType.ERC20}
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
    <>
      <Container>
        <PageHeading>ERC20 Creator</PageHeading>
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
    </>
  );
};

export default Erc20;
