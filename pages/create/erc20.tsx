import React, { useState } from "react";
import Container from "components/Container/Container";
import ExtensionSelect from "components/Minting/ExtensionSelect/ExtensionSelect";
import NetworkSelect from "components/Minting/NetworkSelect/NetworkSelect";
import WalletConnect from "components/Minting/WalletConnect/WalletConnect";
import ContractDeploy from "components/Minting/ContractDeploy/ContractDeploy";
import ContractVerify from "components/Minting/ContractVerify/ContractVerify";
import { TokenData, TokenType } from "types/tokens";
import PageHeading from "components/shared/PageHeading/PageHeading";
import Personalization from "components/Minting/Personalization/Personalization";
import Steps from "components/Steps/Steps";
import { mintingSteps } from "constants/mintingSteps";
import { erc20Extensions } from "constants/availableTokenTypes";

const Erc20 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepComplete, setStepComplete] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<TokenData>({
    name: "",
    symbol: "",
    decimals: "18",
    initialSupply: "",
    type: TokenType.ERC20,
    address: "",
    contractId: "",
    networkChainId: "",
    networkName: "",
    extensions: [],
    managementType: "Ownable",
  });

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    if (step === 2) return;
    setStepComplete(false);
  };

  const handleCompleteStep = (value: boolean) => {
    setStepComplete(value);
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
      body: <ContractVerify tokenData={tokenData} />,
    },
  ];

  return (
    <>
      <Container>
        <PageHeading>ERC20 Creator</PageHeading>
        <Steps
          steps={mintingSteps}
          currentStep={currentStep}
          setCurrentStep={handleStepChange}
          canMoveNext={stepComplete}
        >
          {stepComponents[currentStep].body}
        </Steps>
      </Container>
    </>
  );
};

export default Erc20;
