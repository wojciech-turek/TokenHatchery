import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { compileContract } from "../../utils/api/compile";
import { generateSolFile } from "utils/api/generateSol";
import path from "path";

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

  // if (!fs.existsSync(path.join(process.cwd(), "./tmp/contracts"))) {
  //   fs.mkdirSync(path.join(process.cwd(), "./tmp/contracts"));
  // }
  // fs.writeFileSync(`./tmp/contracts/${contractId}.sol`, newContract);
  fs.writeFileSync(`./tmp/${contractId}.sol`, newContract);
  try {
    const result = await compileContract(contractId);
    res.status(200).json({ result, contractId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
