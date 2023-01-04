import type { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import fs from "fs";
import clientPromise from "lib/mongodb";
import { generateSource } from "utils/api/generateSource";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contractId, tokenType } = req.body;

  const client = await clientPromise;
  const db = client.db("Deployments");
  const collection = db.collection(`${tokenType}`);
  const contract = await collection.findOne({ contractId });
  if (!contract) {
    res.status(404).json({ message: "Contract not found" });
    return;
  }
  const sourceCode = generateSource(
    contractId,
    contract.extensions,
    contract.managementType
  );

  const copilerVersion = "v0.8.17+commit.8df45f5f";

  const formData = new FormData();
  formData.append("module", "contract");
  formData.append("action", "verifysourcecode");
  formData.append("codeformat", "solidity-standard-json-input");
  formData.append("apikey", process.env.ETHERSCAN_API_KEY || "");
  formData.append("contractaddress", contract?.address);
  formData.append("sourceCode", JSON.stringify(sourceCode));
  formData.append("contractname", `${contractId}.sol:${contract?.name}`);
  formData.append("compilerVersion", copilerVersion);

  const response = await fetch("http://api-goerli.etherscan.io/api", {
    method: "POST",
    //@ts-ignore
    body: formData,
  });

  const parsedResponse = await response.json();
  const { status, result } = parsedResponse;
  if (status === "1") {
    res
      .status(200)
      .json({ message: "Verification request sent", guid: result });
  } else {
    res.status(500).json({ error: result });
  }
}
