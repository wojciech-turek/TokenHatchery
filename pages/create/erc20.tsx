import React, { useEffect, useState } from "react";
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
import Button from "components/shared/Button";
import { useRouter } from "next/router";
import { scrollToTop } from "utils/client/scrollTop";

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
    networkChainId: "",
    networkName: "",
    extensions: [],
    managementType: "Ownable",
    type: TokenType.ERC20,
  });
  const router = useRouter();

  const handleCompleteStep = (value: boolean) => {
    setStepComplete(value);
  };

  useEffect(() => {
    setStepComplete(false);
  }, [currentStep]);

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
          type={TokenType.ERC20}
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
    </>
  );
};

export default Erc20;
