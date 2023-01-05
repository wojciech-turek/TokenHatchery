import React, { useState } from "react";
import Container from "components/Container/Container";
import ExtensionSelect from "components/ExtensionSelect/ExtensionSelect";
import NetworkSelect from "components/NetworkSelect/NetworkSelect";
import WalletConnect from "components/WalletConnect/WalletConnect";
import ContractDeploy from "components/ContractDeploy/ContractDeploy";
import ContractVerify from "components/ContractVerify/ContractVerify";
import { BaseTokenData, TokenType } from "types/tokens";
import PageHeading from "components/PageHeading/PageHeading";
import Personalization from "components/Personalization/Personalization";
import Steps from "components/Steps/Steps";
import { mintingSteps } from "constants/mintingSteps";
import { Step } from "types/minting";
import Head from "next/head";

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
  const [managementType, setManagementType] = useState<string>("");
  const [deployedToken, setDeployedToken] = useState({
    address: "",
    id: "",
  });

  const handleStepChange = (step: number) => {
    if (steps[step].status === "upcoming") return;
    setCurrentStep(step);
  };

  const nextStep = () => {
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
        />
      ),
    },
  ];

  return (
    <>
      <Head>
        <link rel="preload" href="/eth.png" as="image" />
        <link rel="preload" href="/bsc.png" as="image" />
        <link rel="preload" href="/matic.png" as="image" />
        <link rel="preload" href="/arb.png" as="image" />
        <link rel="preload" href="/avax.png" as="image" />
        <link rel="preload" href="/evmos.png" as="image" />
        <link rel="preload" href="/fantom.png" as="image" />
        <link rel="preload" href="/gno.png" as="image" />
        <link rel="preload" href="/optmimism.png" as="image" />
        <link rel="preload" href="/coinbase.png" as="image" />
        <link rel="preload" href="/ledger.png" as="image" />
        <link rel="preload" href="/metamask.png" as="image" />
        <link rel="preload" href="/tally.png" as="image" />
        <link rel="preload" href="/walletconnect.png" as="image" />
      </Head>
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
