import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { compileContract } from "../../utils/api/compile";
import { generateSolFile } from "utils/api/generateSol";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, symbol, decimals, initialSupply, extensions, managementType } =
    req.body;

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

  fs.writeFileSync(`./contracts/${contractId}.sol`, newContract);

  const result = await compileContract(contractId);

  res.status(200).json({ result, contractId });
}
