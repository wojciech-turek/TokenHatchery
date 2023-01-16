import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { compileERC20Contract } from "../../utils/api/compileERC20";
import { generateERC20Contract } from "utils/api/generateERC20Contract";
import "prettier-plugin-solidity";
import { generateERC721Contract } from "utils/api/generateERC721Contract";
import { compileERC721Contract } from "utils/api/compileERC721";
import { formatSol } from "utils/api/formatSol";
import ERC20 from "models/ERC20Contract";
import ERC721 from "models/ERC721Contract";
import ERC1155 from "models/ERC1155Contract";
import { generateERC1155Contract } from "utils/api/generateERC1155Contract";
import connectMongo from "lib/mongodb";
import { compileERC1155Contract } from "utils/api/compileERC1155";

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
  } else if (type === "ERC1155") {
    newContract = generateERC1155Contract({
      name: nameCapitalized,
      baseURI,
      extensions,
      managementType,
    });
  } else {
    res.status(500).json({ error: "Invalid contract type" });
  }
  fs.writeFileSync(`/tmp/${contractId}.sol`, formatSol(newContract));

  try {
    let compilationResult;
    if (type === "ERC20") {
      compilationResult = await compileERC20Contract(contractId);
    } else if (type === "ERC721") {
      compilationResult = await compileERC721Contract(contractId);
    } else if (type === "ERC1155") {
      compilationResult = await compileERC1155Contract(contractId);
    }
    const abi =
      compilationResult.contracts[`${contractId}.sol`][nameCapitalized].abi;

    const bytecode =
      compilationResult.contracts[`${contractId}.sol`][nameCapitalized].evm
        .bytecode.object;

    await connectMongo();
    if (type === "ERC20") {
      const contract = new ERC20({
        name: nameCapitalized,
        symbol,
        decimals,
        initialSupply,
        extensions,
        managementType,
        creator,
        contractId,
        verified: false,
        createdAt: new Date(),
        networkName,
        networkChainId,
      });
      await contract.save();
    } else if (type === "ERC721") {
      const contract = new ERC721({
        name: nameCapitalized,
        symbol,
        baseURI,
        extensions,
        managementType,
        creator,
        contractId,
        verified: false,
        createdAt: new Date(),
        networkName,
        networkChainId,
        showInSearch: true,
        maxSupply,
        mintPrice,
      });
      await contract.save();
    } else if (type === "ERC1155") {
      const contract = new ERC1155({
        name: nameCapitalized,
        baseURI,
        extensions,
        managementType,
        creator,
        contractId,
        verified: false,
        createdAt: new Date(),
        networkName,
        networkChainId,
        showInSearch: true,
      });
      await contract.save();
    } else {
      res.status(500).json({ error: "Invalid contract type" });
    }

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
