import { BaseTokenData } from "./../types/tokens";
const useApi = () => {
  const generateContract = async ({
    tokenData,
    extensions,
    managementType,
  }: {
    tokenData: BaseTokenData;
    extensions: string[];
    managementType: string;
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
      }),
    });
    const data = await response.json();
    const { contractId, result } = data;
    const nameCapitalized =
      tokenData.name.charAt(0).toUpperCase() + tokenData.name.slice(1);

    return {
      contractId: "",
      abi: result.contracts[`${contractId}.sol`][nameCapitalized].abi,
      bytecode:
        result.contracts[`${contractId}.sol`][nameCapitalized].evm.bytecode
          .object,
    };
  };

  return {
    generateContract,
  };
};

export default useApi;
