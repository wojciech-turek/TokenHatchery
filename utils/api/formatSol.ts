import prettier from "prettier";

export const formatSol = (newContract: string) => {
  const formattedContract = prettier.format(newContract, {
    parser: "solidity-parse",
    pluginSearchDirs: ["node_modules"],
    plugins: ["prettier-plugin-solidity"],
  });

  return formattedContract;
};
