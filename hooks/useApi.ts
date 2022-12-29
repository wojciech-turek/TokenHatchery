import { BaseTokenData } from "./../types/tokens";
const useApi = () => {
  const generateContract = async ({
    tokenData,
    extensions,
  }: {
    tokenData: BaseTokenData;
    extensions: string[];
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
        extensions: extensions,
      }),
    });
    const data = await response.json();
    const { contractId, result } = data;

    return {
      contractId: "",
      abi: result.contracts[`${contractId}.sol`][tokenData.name].abi,
      bytecode:
        result.contracts[`${contractId}.sol`][tokenData.name].evm.bytecode
          .object,
    };
  };

  return {
    generateContract,
  };
};

export default useApi;
