import FlexibleContainer from "components/FlexibleContainer/FlexibleContainer";
import Heading from "components/Typography/Heading/Heading";
import { ethers } from "ethers";
import Head from "next/head";
import { useState } from "react";
import { useAccount, useNetwork, useSigner } from "wagmi";

export default function Home() {
  const [deployedContract, setDeployedContract] = useState<string>("");
  const [verificationGuid, setVerificationGuid] = useState<string>("");
  const [verificationStatus, setVerificationStatus] = useState<string>("");
  const [contractId, setContractId] = useState<string>("");
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: signer } = useSigner();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FlexibleContainer>
        <Heading type="h1" centered>
          Deploy a new ERC20 token
        </Heading>
      </FlexibleContainer>
    </>
  );
}
