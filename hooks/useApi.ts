import { useMemo } from "react";
import { TokenData, Deployments, TokenType } from "types/tokens";
const useApi = () => {
  const generateContract = async ({
    tokenData,
    creator,
  }: {
    tokenData: TokenData;

    creator: string;
  }) => {
    const response = await fetch("/api/generateContract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...tokenData,
        creator: creator,
      }),
    });
    const data = await response.json();
    const { contractId, abi, bytecode } = data;

    return {
      contractId,
      abi,
      bytecode,
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
