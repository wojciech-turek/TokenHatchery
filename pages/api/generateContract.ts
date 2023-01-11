import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import fs from "fs";
import { compileERC20Contract } from "../../utils/api/compileERC20";
import { generateERC20Contract } from "utils/api/generateERC20Contract";
import clientPromise from "lib/mongodb";
import "prettier-plugin-solidity";
import { generateERC721Contract } from "utils/api/generateERC721Contract";
import { compileERC721Contract } from "utils/api/compileERC721";
import { formatSol } from "utils/api/formatSol";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    name,
    symbol,
    decimals,
    initialSupply,
    baseURI,
    extensions,
    managementType,
    type,
    networkName,
    networkChainId,
    creator,
    maxSupply,
    mintPrice,
  } = req.body;

  const contractId = uuidv4();
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  let newContract = "";

  if (type === "ERC20") {
    newContract = generateERC20Contract({
      name: nameCapitalized,
      symbol,
      decimals,
      initialSupply,
      extensions,
      managementType,
    });
  } else if (type === "ERC721") {
    newContract = generateERC721Contract({
      name: nameCapitalized,
      symbol,
      baseURI,
      extensions,
      managementType,
      maxSupply,
      mintPrice,
    });
  }
  fs.writeFileSync(`/tmp/${contractId}.sol`, formatSol(newContract));

  try {
    let compilationResult;
    if (type === "ERC20") {
      compilationResult = await compileERC20Contract(contractId);
    } else if (type === "ERC721") {
      compilationResult = await compileERC721Contract(contractId);
    }

    const abi =
      compilationResult.contracts[`${contractId}.sol`][nameCapitalized].abi;

    const bytecode =
      compilationResult.contracts[`${contractId}.sol`][nameCapitalized].evm
        .bytecode.object;

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
      abi,
      bytecode,
      contractId,
      verified: false,
      verificationGuid: "",
      verificationStatus: "",
      createdAt: new Date(),
      networkName,
      networkChainId,
    };
    await collection.insertOne(contract);
    res.status(200).json({
      abi,
      bytecode,
      contractId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
