import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import prettier from "prettier";
import fs from "fs";
import { compileContract } from "../../utils/api/compile";
import { generateSolFile } from "utils/api/generateSol";
import clientPromise from "lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    name,
    symbol,
    decimals,
    initialSupply,
    extensions,
    managementType,
    type,
    network,
    creator,
  } = req.body;

  const contractId = uuidv4();
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
  const newContract = generateSolFile({
    name: nameCapitalized,
    symbol,
    decimals,
    initialSupply,
    extensions,
    managementType,
  });

  const formattedContract = prettier.format(newContract, {
    filepath: `/tmp/${contractId}.sol`,
    parser: "solidity-parse",
    plugins: ["prettier-plugin-solidity"],
  });

  fs.writeFileSync(`/tmp/${contractId}.sol`, formattedContract);

  prettier.format(newContract, {
    filepath: `/tmp/${contractId}.sol`,
  });

  try {
    const result = await compileContract(contractId);
    const client = await clientPromise;
    const db = client.db("Deployments");
    const collection = db.collection(`${type}`);
    const contract = {
      name: nameCapitalized,
      symbol,
      decimals,
      initialSupply,
      extensions,
      managementType,
      creator,
      address: "",
      abi: result.contracts[`${contractId}.sol`][nameCapitalized].abi,
      bytecode:
        result.contracts[`${contractId}.sol`][nameCapitalized].evm.bytecode
          .object,
      contractId,
      verified: false,
      verificationGuid: "",
      verificationStatus: "",
      createdAt: new Date(),
      networkName: network.name,
      networkChainId: network.chainId,
    };
    await collection.insertOne(contract);
    res.status(200).json({ result, contractId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
