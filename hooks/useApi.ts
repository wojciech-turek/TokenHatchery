import { fetchWithError } from "utils/client/fetchWithError";
import { TokenData, Deployments, ContractType } from "types/tokens";

const useApi = () => {
  const generateContract = async ({
    tokenData,
    creator,
  }: {
    tokenData: TokenData;
    creator: string;
  }) => {
    switch (tokenData.type) {
      case ContractType.ERC20:
        return generateERC20Contract({ tokenData, creator });
      case ContractType.ERC721:
        return generateERC721Contract({ tokenData, creator });
      case ContractType.ERC1155:
        return generateERC1155Contract({ tokenData, creator });
    }
  };

  const generateERC20Contract = async ({
    tokenData,
    creator,
  }: {
    tokenData: TokenData;
    creator: string;
  }) => {
    const response = await fetchWithError("/api/generateERC20Contract", {
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

  const generateERC721Contract = async ({
    tokenData,
    creator,
  }: {
    tokenData: TokenData;
    creator: string;
  }) => {
    const response = await fetchWithError("/api/generateERC721Contract", {
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

  const generateERC1155Contract = async ({
    tokenData,
    creator,
  }: {
    tokenData: TokenData;
    creator: string;
  }) => {
    const response = await fetchWithError("/api/generateERC1155Contract", {
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
    contractType,
  }: {
    contractId: string;
    contractType: ContractType;
  }) => {
    const response = await fetchWithError("/api/verifyContract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contractId,
        contractType,
      }),
    });
    return response as { guid: string };
  };

  const checkVerifyStatus = async ({
    verificationGuid,
    type,
    networkChainId,
  }: {
    verificationGuid: string;
    type: ContractType;
    networkChainId: number;
  }) => {
    const response = await fetchWithError("/api/verificationStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guid: verificationGuid,
        contractType: type,
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
    type: ContractType;
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
