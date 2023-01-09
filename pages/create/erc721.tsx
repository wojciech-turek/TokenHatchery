import Container from "components/Container/Container";
import PageHeading from "components/shared/PageHeading/PageHeading";
import Steps from "components/Steps/Steps";
import React, { useState } from "react";
import { mintingSteps } from "constants/mintingSteps";
import WalletConnect from "components/Minting/WalletConnect/WalletConnect";
import NetworkSelect from "components/Minting/NetworkSelect/NetworkSelect";
import ExtensionSelect from "components/Minting/ExtensionSelect/ExtensionSelect";
import { erc721Extensions } from "constants/availableTokenTypes";
import ContractDeploy from "components/Minting/ContractDeploy/ContractDeploy";
import ContractVerify from "components/Minting/ContractVerify/ContractVerify";
import { TokenData, TokenType } from "types/tokens";
import Personalization from "components/Minting/Personalization/Personalization";

const Erc721 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepComplete, setStepComplete] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<TokenData>({
    name: "",
    symbol: "",
    decimals: "18",
    initialSupply: "",
    type: TokenType.ERC721,
    address: "",
    contractId: "",
    networkChainId: "",
    networkName: "",
    extensions: [],
    managementType: "Ownable",
  });

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    if (step === 2) {
      setStepComplete(true);
      return;
    }
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
          setTokenData={setTokenData}
          tokenData={tokenData}
        />
      ),
    },
    {
      body: (
        <ExtensionSelect
          extensions={erc721Extensions}
          tokenData={tokenData}
          setTokenData={setTokenData}
        />
      ),
    },
    {
      body: (
        <Personalization
          tokenData={tokenData}
          setTokenData={setTokenData}
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
