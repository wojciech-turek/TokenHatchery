import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import "prettier-plugin-solidity";
import { formatSol } from "utils/api/formatSol";
import connectMongo from "lib/mongodb";
import ERC1155 from "models/ERC1155Contract";
import { generateERC1155Contract } from "utils/api/generateERC1155Contract";
import { compileERC1155Contract } from "utils/api/compileERC1155";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, baseURI } = req.body;

  const contractId = uuidv4();
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  const newContract = generateERC1155Contract({
    name: nameCapitalized,
    baseURI,
  });

  fs.writeFileSync(`/tmp/${contractId}.sol`, formatSol(newContract));

  try {
    const compilationResult = await compileERC1155Contract(contractId);
    const abi =
      compilationResult.contracts[`${contractId}.sol`][nameCapitalized].abi;
    const bytecode =
      compilationResult.contracts[`${contractId}.sol`][nameCapitalized].evm
        .bytecode.object;

    await connectMongo();
    const contract = new ERC1155({
      ...req.body,
      name: nameCapitalized,
      createdAt: new Date(),
      verified: false,
      showInSearch: true,
      contractId,
    });
    await contract.save();

    res.status(200).json({
      abi,
      bytecode,
      contractId,
    });
  } catch (error) {
    console.log("Compilation error");
    console.log(error);
    res.status(500).json({ error });
  }
}
