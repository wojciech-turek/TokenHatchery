import { ethers } from "ethers";
import useApi from "hooks/useApi";
import React, { Dispatch, SetStateAction } from "react";
import { BaseTokenData } from "types/tokens";
import { useSigner } from "wagmi";

interface ContractDeployProps {
  type: string;
  extensions: string[];
  tokenData: BaseTokenData;
  setDeployedToken: Dispatch<SetStateAction<{ address: string; id: string }>>;
  deployedToken: {
    address: string;
    id: string;
  };
}

const ContractDeploy = ({
  type,
  extensions,
  tokenData,
  setDeployedToken,
  deployedToken,
}: ContractDeployProps) => {
  const { data: signer } = useSigner();
  const { generateContract } = useApi();

  const deployNewErc20 = async () => {
    if (!signer) return;
    const { contractId, abi, bytecode } = await generateContract({
      tokenData,
      extensions,
    });
    console.log(contractId, abi, bytecode);
    //     const contract = new ethers.ContractFactory(abi, bytecode, signer);
    //     const deployedContract = await contract.deploy();
    //     await deployedContract.deployTransaction.wait();
    //     setDeployedTokenAddress(deployedContract.address);
  };

  const { name, symbol, decimals, initialSupply } = tokenData;

  return (
    <div>
      <p>Deployment summary:</p>
      <p>Token type: {type}</p>
      <p>Token name: {name}</p>
      <p>Token symbol: {symbol}</p>
      <p>Token decimals: {decimals}</p>
      <p>Token initial supply: {initialSupply}</p>
      <p>Extensions: {extensions.map((extension) => extension).join(", ")}</p>

      <button onClick={deployNewErc20}>Deploy</button>

      <p>Deployed token address: {deployedToken.address}</p>
    </div>
  );
};

export default ContractDeploy;
