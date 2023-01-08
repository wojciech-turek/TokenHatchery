import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import prettier from "prettier";
import fs from "fs";
import { compileERC20Contract } from "../../utils/api/compileERC20";
import { generateERC20Contract } from "utils/api/generateERC20";
import clientPromise from "lib/mongodb";
import "prettier-plugin-solidity";

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

  const newContract = generateERC20Contract({
    name: nameCapitalized,
    symbol,
    decimals,
    initialSupply,
    extensions,
    managementType,
  });

  const formattedContract = prettier.format(newContract, {
    parser: "solidity-parse",
    pluginSearchDirs: ["node_modules"],
    plugins: ["prettier-plugin-solidity"],
  });

  fs.writeFileSync(`/tmp/${contractId}.sol`, formattedContract);

  try {
    const result = await compileERC20Contract(contractId);
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
