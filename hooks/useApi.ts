import { Network } from "constants/supportedNetworks";
import { useMemo } from "react";
import { BaseTokenData, Deployments, TokenType } from "types/tokens";
const useApi = () => {
  const generateContract = async ({
    tokenData,
    extensions,
    managementType,
    tokenType,
    network,
    creator,
  }: {
    tokenData: BaseTokenData;
    extensions: string[];
    managementType: string;
    tokenType: TokenType;
    network: Network;
    creator: string;
  }) => {
    const response = await fetch("/api/generateContract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: tokenData.name,
        symbol: tokenData.symbol,
        decimals: tokenData.decimals,
        initialSupply: tokenData.initialSupply,
        extensions: extensions.map((extension) => extension.toLowerCase()),
        managementType: managementType.toLowerCase(),
        type: tokenType,
        network: network,
        creator: creator,
      }),
    });
    const data = await response.json();
    const { contractId, result } = data;
    const nameCapitalized =
      tokenData.name.charAt(0).toUpperCase() + tokenData.name.slice(1);

    return {
      contractId: contractId,
      abi: result.contracts[`${contractId}.sol`][nameCapitalized].abi,
      bytecode:
        result.contracts[`${contractId}.sol`][nameCapitalized].evm.bytecode
          .object,
    };
  };

  const handleVerify = async ({
    contractId,
    tokenType,
  }: {
    contractId: string;
    tokenType: TokenType;
  }) => {
    try {
      const response = await fetch("/api/verifyContract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractId,
          tokenType,
        }),
      });
      const data = await response.json();
      return data;
    } catch (e: any) {
      return e;
    }
  };

  const checkVerifyStatus = async (verificationGuid: string) => {
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
    return data;
  };

  const saveDeployedAddress = async ({
    contractId,
    address,
    type,
  }: {
    contractId: string;
    address: string;
    type: TokenType;
  }) => {
    try {
      const response = await fetch("/api/saveDeployedAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractId,
          address,
          type,
        }),
      });
      const data = await response.json();
      return data;
    } catch (e: any) {
      console.error(e);
    }
  };

  const getContractsByAddress = useMemo(
    () => async (address: string) => {
      try {
        const response = await fetch("/api/getContracts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address,
          }),
        });
        const data = await response.json();
        return data as Deployments[];
      } catch (e: any) {
        console.error(e);
      }
    },
    []
  );

  return {
    generateContract,
    getContractsByAddress,
    handleVerify,
    checkVerifyStatus,
    saveDeployedAddress,
  };
};

export default useApi;
