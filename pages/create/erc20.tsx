import React, { useState } from "react";
import Container from "components/Container/Container";
import ExtensionSelect from "components/Minting/ExtensionSelect/ExtensionSelect";
import NetworkSelect from "components/Minting/NetworkSelect/NetworkSelect";
import WalletConnect from "components/Minting/WalletConnect/WalletConnect";
import ContractDeploy from "components/Minting/ContractDeploy/ContractDeploy";
import ContractVerify from "components/Minting/ContractVerify/ContractVerify";
import { BaseTokenData, TokenType } from "types/tokens";
import PageHeading from "components/shared/PageHeading/PageHeading";
import Personalization from "components/Minting/Personalization/Personalization";
import Steps from "components/Steps/Steps";
import { mintingSteps } from "constants/mintingSteps";

const Erc20 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepComplete, setStepComplete] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<BaseTokenData>({
    name: "",
    symbol: "",
    initialSupply: "",
    decimals: "18",
  });
  const [selectedExtensions, setSelectedExtensions] = useState<string[]>([]);
  const [managementType, setManagementType] = useState<string>("Ownable");
  const [deployedToken, setDeployedToken] = useState({
    address: "",
    id: "",
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
    { body: <NetworkSelect setStepComplete={handleCompleteStep} /> },
    {
      body: (
        <ExtensionSelect
          tokenType={TokenType.ERC20}
          managementType={managementType}
          setManagementType={setManagementType}
          selectedExtensions={selectedExtensions}
          setSelectedExtensions={setSelectedExtensions}
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
          tokenType={TokenType.ERC20}
          managementType={managementType}
          extensions={selectedExtensions}
          setDeployedToken={setDeployedToken}
          setStepComplete={handleCompleteStep}
        />
      ),
    },
    {
      body: (
        <ContractVerify
          contractId={deployedToken.id}
          contractAddress={deployedToken.address}
          tokenType={TokenType.ERC20}
        />
      ),
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
