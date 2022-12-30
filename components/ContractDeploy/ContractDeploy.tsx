import Heading from "components/Typography/Heading/Heading";
import { ethers } from "ethers";
import useApi from "hooks/useApi";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BaseTokenData, TokenType } from "types/tokens";
import { useSigner } from "wagmi";
import styles from "./ContractDeploy.module.scss";

interface ContractDeployProps {
  type: TokenType;
  extensions: string[];
  tokenData: BaseTokenData;
  network: {
    name: string;
    chainId: number;
  };
  setDeployedToken: Dispatch<SetStateAction<{ address: string; id: string }>>;
  deployedToken: {
    address: string;
    id: string;
  };
  managementType: string;
}

const ContractDeploy = ({
  type,
  extensions,
  tokenData,
  network,
  setDeployedToken,
  deployedToken,
  managementType,
}: ContractDeployProps) => {
  const { data: signer } = useSigner();
  const { generateContract, saveDeployedAddress } = useApi();
  const [deploying, setDeploying] = useState(false);

  const deployNewErc20 = async () => {
    setDeploying(true);
    if (!signer) return;
    try {
      const { contractId, abi, bytecode } = await generateContract({
        tokenData,
        extensions,
        managementType,
        type,
        network,
      });
      const contract = new ethers.ContractFactory(abi, bytecode, signer);
      const deployedContract = await contract.deploy();
      await deployedContract.deployTransaction.wait();
      setDeployedToken({
        address: deployedContract.address,
        id: contractId,
      });
      await saveDeployedAddress({
        contractId: contractId,
        address: deployedContract.address,
        type: type,
      });
      setDeploying(false);
    } catch (e) {
      console.log(e);
      setDeploying(false);
    }
  };

  const { name, symbol, decimals, initialSupply } = tokenData;

  return (
    <div>
      <Heading type="h6">Deployment summary</Heading>
      <p>
        <span className={styles.category}>Token type: </span>
        {type.toUpperCase()}
      </p>
      <p>
        <span className={styles.category}>Token name:</span> {name}
      </p>
      <p>
        <span className={styles.category}>Token symbol:</span>{" "}
        {symbol.toUpperCase()}
      </p>
      <p>
        <span className={styles.category}>Token decimals:</span> {decimals}
      </p>
      <p>
        <span className={styles.category}>Token initial supply:</span>{" "}
        {initialSupply}
      </p>
      <p>
        <span className={styles.category}>Extensions:</span>{" "}
        {extensions.length
          ? extensions.map((extension) => extension).join(", ")
          : "None"}
      </p>
      <button onClick={deployNewErc20}>Deploy</button>
      {deploying ? (
        <p>Please wait, you token deployment is pending...</p>
      ) : deployedToken.address ? (
        <p> Success! Deployed token address: {deployedToken.address}</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default ContractDeploy;
