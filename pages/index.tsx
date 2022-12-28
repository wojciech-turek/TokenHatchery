import { ethers } from "ethers";
import Head from "next/head";
import { useState } from "react";
import { useAccount, useConnect, useNetwork, useSigner } from "wagmi";

export default function Home() {
  const { connect, connectors } = useConnect();
  const [deployedContract, setDeployedContract] = useState<string>("");
  const [verificationGuid, setVerificationGuid] = useState<string>("");
  const [verificationStatus, setVerificationStatus] = useState<string>("");
  const [contractId, setContractId] = useState<string>("");
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: signer } = useSigner();

  const deployNewErc20 = async () => {
    if (!signer) return;
    const tokenContractJson = await generateContract();
    setContractId(tokenContractJson.contractId);
    const abi =
      tokenContractJson.result.contracts[`${tokenContractJson.contractId}.sol`][
        "Zeberka"
      ].abi;
    const bytecode =
      tokenContractJson.result.contracts[`${tokenContractJson.contractId}.sol`][
        "Zeberka"
      ].evm.bytecode.object;
    const contract = new ethers.ContractFactory(abi, bytecode, signer);
    const deployedContract = await contract.deploy();
    await deployedContract.deployTransaction.wait();
    setDeployedContract(deployedContract.address);
  };

  const connectWallet = () => {
    connect({ connector: connectors[0] });
  };

  const generateContract = async () => {
    const response = await fetch("/api/generateContract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Zeberka",
        symbol: "Zabudeewqenia",
        types: {
          mintable: true,
        },
      }),
    });
    const data = await response.json();
    return data;
  };

  const handleVerify = async () => {
    try {
      const response = await fetch("/api/verifyContract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: deployedContract,
          contractId,
          contractName: "Zeberka",
          types: {
            mintable: true,
          },
        }),
      });
      const data = await response.json();
      setVerificationGuid(data.guid);
    } catch (e: any) {
      setVerificationGuid(e.message);
    }
  };

  const checkVerifyStatus = async () => {
    const response = await fetch("/api/verificationStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guid: verificationGuid,
      }),
    });
    const data = await response.json();
    setVerificationStatus(data);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>Current connected network: {chain?.name}</div>
        <div>
          <button onClick={() => connectWallet()}>Connect</button>
        </div>
        <div>
          <p>Address: {address}</p>
        </div>
        <div>
          <button onClick={deployNewErc20}>Deploy erc20</button>
        </div>
        {deployedContract && <div>{deployedContract}</div>}
        <div>
          <button onClick={handleVerify}>Verify new contract</button>
        </div>
        {verificationGuid && <div>{verificationGuid}</div>}
        <div>
          <button onClick={checkVerifyStatus}>Check verification status</button>
        </div>
        {verificationStatus && <div>{verificationStatus}</div>}
      </main>
    </>
  );
}
