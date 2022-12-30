import { BaseTokenData, TokenType } from "./../types/tokens";
const useApi = () => {
  const generateContract = async ({
    tokenData,
    extensions,
    managementType,
    type,
    network,
  }: {
    tokenData: BaseTokenData;
    extensions: string[];
    managementType: string;
    type: TokenType;
    network: {
      name: string;
      chainId: number;
    };
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
        type: type,
        network: network,
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

  const handleVerify = async ({ contractId }: { contractId: string }) => {
    try {
      const response = await fetch("/api/verifyContract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractId,
        }),
      });
      const data = await response.json();
      const { verificationGuid } = data;
      return verificationGuid;
    } catch (e: any) {
      console.error(e);
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

  return {
    generateContract,
    handleVerify,
    checkVerifyStatus,
    saveDeployedAddress,
  };
};

export default useApi;
