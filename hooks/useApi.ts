import { fetchWithError } from "utils/client/fetchWithError";
import { TokenData, Deployments, TokenType } from "types/tokens";

const useApi = () => {
  const generateContract = async ({
    tokenData,
    creator,
  }: {
    tokenData: TokenData;

    creator: string;
  }) => {
    const response = await fetchWithError("/api/generateContract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...tokenData,
        creator: creator,
      }),
    });
    const { contractId, abi, bytecode } = response;

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
    const response = await fetchWithError("/api/verifyContract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contractId,
        tokenType,
      }),
    });
    return response;
  };

  const checkVerifyStatus = async (
    verificationGuid: string,
    type: TokenType,
    networkChainId: number
  ) => {
    const response = await fetchWithError("/api/verificationStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guid: verificationGuid,
        tokenType: type,
        networkChainId,
      }),
    });
    return response;
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
    const response = await fetchWithError("/api/saveDeployedAddress", {
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
    return response;
  };

  const getCountractCount = async () => {
    return await fetchWithError("/api/getContractsCount");
  };

  const getContractsByAddress = async (address: string) => {
    const response = await fetchWithError("/api/getContracts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
      }),
    });
    return response as Deployments[];
  };

  return {
    generateContract,
    getCountractCount,
    getContractsByAddress,
    handleVerify,
    checkVerifyStatus,
    saveDeployedAddress,
  };
};

export default useApi;
