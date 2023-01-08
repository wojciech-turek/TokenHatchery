import Container from "components/Container/Container";
import PageHeading from "components/shared/PageHeading/PageHeading";
import Steps from "components/Steps/Steps";
import React, { useState } from "react";
import { mintingSteps } from "constants/mintingSteps";
import WalletConnect from "components/Minting/WalletConnect/WalletConnect";
import NetworkSelect from "components/Minting/NetworkSelect/NetworkSelect";

const Erc721 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepComplete, setStepComplete] = useState<boolean>(false);

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
  ];

  return (
    <Container>
      <PageHeading>ERC721 Creator</PageHeading>
      <Steps
        steps={mintingSteps}
        currentStep={currentStep}
        setCurrentStep={handleStepChange}
        canMoveNext={stepComplete}
      >
        {stepComponents[currentStep].body}
      </Steps>
    </Container>
  );
};

export default Erc721;
