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
import { Step } from "types/minting";

const Erc20 = () => {
  const [steps, setSteps] = useState<Step[]>(mintingSteps);
  const [currentStep, setCurrentStep] = useState(0);
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const handleStepChange = (step: number) => {
    if (steps[step].status === "upcoming") return;
    scrollToTop();
    setCurrentStep(step);
  };

  const finalStepComplete = () => {
    setSteps((prev) => {
      const newSteps = [...prev];
      newSteps[currentStep].status = "complete";
      return newSteps;
    });
  };

  const nextStep = () => {
    scrollToTop();
    setSteps((prev) => {
      const newSteps = [...prev];
      newSteps[currentStep].status = "complete";
      newSteps[currentStep + 1].status = "current";
      return newSteps;
    });

    setCurrentStep(currentStep + 1);
  };

  const stepComponents = [
    { body: <WalletConnect nextStep={nextStep} /> },
    { body: <NetworkSelect nextStep={nextStep} /> },
    {
      body: (
        <ExtensionSelect
          nextStep={nextStep}
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
          nextStep={nextStep}
          setTokenData={setTokenData}
          tokenData={tokenData}
        />
      ),
    },
    {
      body: (
        <ContractDeploy
          nextStep={nextStep}
          tokenData={tokenData}
          tokenType={TokenType.ERC20}
          managementType={managementType}
          extensions={selectedExtensions}
          setDeployedToken={setDeployedToken}
        />
      ),
    },
    {
      body: (
        <ContractVerify
          contractId={deployedToken.id}
          contractAddress={deployedToken.address}
          tokenType={TokenType.ERC20}
          finalStepComplete={finalStepComplete}
        />
      ),
    },
  ];

  return (
    <>
      <Container>
        <PageHeading>ERC20 Creator</PageHeading>
        <div className="overflow-hidden rounded-lg bg-gray-50 shadow p-4 mt-6">
          <Steps steps={steps} handleStepChange={handleStepChange} />
          <div className="mt-12 px-0 lg:px-4">
            {stepComponents[currentStep].body}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Erc20;
