//@ts-ignore
import solc from "solc";
import fs from "fs";

export const compileContract = async (uuid: string) => {
  const contractname = `${uuid}.sol`;
  const generatedContract = fs.readFileSync(`./contracts/${uuid}.sol`, "utf8");
  const ERC20Contract = fs.readFileSync(
    "./node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol",
    "utf8"
  );
  const IERC20Contract = fs.readFileSync(
    "./node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol",
    "utf8"
  );
  const IERC20MetadataContract = fs.readFileSync(
    "./node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol",
    "utf8"
  );

  const ContextContract = fs.readFileSync(
    "./node_modules/@openzeppelin/contracts/utils/Context.sol",
    "utf8"
  );

  const OwnableContract = fs.readFileSync(
    "./node_modules/@openzeppelin/contracts/access/Ownable.sol",
    "utf8"
  );

  const input = {
    language: "Solidity",
    sources: {
      [contractname]: {
        content: generatedContract,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  };

  const findImports = (path: string) => {
    if (path === "@openzeppelin/contracts/token/ERC20/ERC20.sol")
      return {
        contents: ERC20Contract,
      };
    else if (path === "@openzeppelin/contracts/token/ERC20/IERC20.sol")
      return {
        contents: IERC20Contract,
      };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol"
    )
      return {
        contents: IERC20MetadataContract,
      };
    else if (path === "@openzeppelin/contracts/utils/Context.sol")
      return {
        contents: ContextContract,
      };
    else if (path === "@openzeppelin/contracts/access/Ownable.sol")
      return {
        contents: OwnableContract,
      };
    else return { error: "File not found" };
  };

  var output = JSON.parse(
    solc.compile(JSON.stringify(input), { import: findImports })
  );
  return output;
};
