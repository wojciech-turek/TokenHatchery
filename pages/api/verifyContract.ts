import type { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address, contractId, contractName, types } = req.body;
  const { mintable } = types;
  const generatedContract = fs.readFileSync(
    `./contracts/${contractId}.sol`,
    "utf8"
  );
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

  const OwnableContract = fs.readFileSync(
    "./node_modules/@openzeppelin/contracts/access/Ownable.sol",
    "utf8"
  );

  const ContextContract = fs.readFileSync(
    "./node_modules/@openzeppelin/contracts/utils/Context.sol",
    "utf8"
  );
  const sourceCode = {
    language: "Solidity",
    sources: {
      [`${contractId}.sol`]: {
        content: generatedContract,
      },
      "@openzeppelin/contracts/token/ERC20/ERC20.sol": {
        content: ERC20Contract,
      },
      "@openzeppelin/contracts/token/ERC20/IERC20.sol": {
        content: IERC20Contract,
      },
      "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol": {
        content: IERC20MetadataContract,
      },
      "@openzeppelin/contracts/utils/Context.sol": {
        content: ContextContract,
      },
      ...(mintable
        ? {
            "@openzeppelin/contracts/access/Ownable.sol": {
              content: OwnableContract,
            },
          }
        : {}),
    },
    settings: { optimizer: { enabled: true, runs: 200 } },
  };

  const copilerVersion = "v0.8.17+commit.8df45f5f";

  const formData = new FormData();
  formData.append("module", "contract");
  formData.append("action", "verifysourcecode");
  formData.append("codeformat", "solidity-standard-json-input");
  formData.append("apikey", process.env.ETHERSCAN_API_KEY || "");
  formData.append("contractaddress", address);
  formData.append("sourceCode", JSON.stringify(sourceCode));
  formData.append("contractname", `${contractId}.sol:${contractName}`);
  formData.append("compilerVersion", copilerVersion);

  const response = await fetch("http://api-goerli.etherscan.io/api", {
    method: "POST",
    //@ts-ignore
    body: formData,
  });

  const parsedResponse = await response.json();
  console.log(parsedResponse);
  const { status, result } = parsedResponse;
  if (status === "1") {
    res
      .status(200)
      .json({ message: "Verification request sent", guid: result });
  } else {
    res.status(500).json({ error: "Verification failed" });
  }
}
