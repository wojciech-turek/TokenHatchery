import { ERC20ContractData, ERC721ContractData, TokenData } from "types/tokens";

export const getSummaryData = (tokenData: TokenData) => {
  switch (tokenData.type) {
    case "ERC20":
      return [
        {
          id: 1,
          title: "Token type",
          description: tokenData.type,
        },
        {
          id: 2,
          title: "Token name",
          description: tokenData.name,
        },
        {
          id: 3,
          title: "Token symbol",
          description: (tokenData as ERC20ContractData).symbol,
        },
        {
          id: 4,
          title: "Token decimals",
          description: (tokenData as ERC20ContractData).decimals,
        },
        {
          id: 5,
          title: "Initial supply",
          description: (tokenData as ERC20ContractData).initialSupply || "0",
        },
        {
          id: 6,
          title: "Dynamic supply",
          description: (tokenData as ERC20ContractData).options.dynamicSupply
            ? "Yes"
            : "No",
        },
      ];
    case "ERC721":
      return [
        {
          id: 1,
          title: "Token type",
          description: tokenData.type,
        },
        {
          id: 2,
          title: "Token name",
          description: tokenData.name,
        },
        {
          id: 3,
          title: "Token symbol",
          description: (tokenData as ERC721ContractData).symbol,
        },
        {
          id: 4,
          title: "Public minting",
          description: (tokenData as ERC721ContractData).options.publicMinting
            ? "Yes"
            : "No",
        },
        (tokenData as ERC721ContractData).options.publicMinting
          ? {
              id: 5,
              title: "Custom payment token",
              description: (tokenData as ERC721ContractData).options
                .customPaymentToken
                ? "Yes"
                : "No",
            }
          : null,
      ];
    case "ERC1155":
      return [
        {
          id: 1,
          title: "Token type",
          description: tokenData.type,
        },
        {
          id: 2,
          title: "Token name",
          description: tokenData.name,
        },
      ];
    default:
      return [];
  }
};
