import { fetchWithError } from "utils/client/fetchWithError";
import connectMongo from "lib/mongodb";
import ERC20 from "models/ERC20Contract";
import ERC721 from "models/ERC721Contract";
import ERC1155 from "models/ERC1155Contract";
import type { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import { generateERC20Source } from "utils/api/generateERC20Source";
import { generateERC721Source } from "utils/api/generateERC721Source";
import { generateERC1155Source } from "utils/api/generateERC1155Source";
import { getVerificationApiData } from "constants/supportedNetworks";
import { Contract } from "types/contract";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contractId, tokenType } = req.body;

  await connectMongo();

  let contract;
  let sourceCode;

  switch (tokenType) {
    case "ERC20":
      contract = (await ERC20.findOne({ contractId })) as Contract;
      sourceCode = await generateERC20Source(
        contractId,
        contract.extensions,
        contract.managementType
      );
      break;
    case "ERC721":
      contract = (await ERC721.findOne({ contractId })) as Contract;
      sourceCode = await generateERC721Source(
        contractId,
        contract.extensions,
        contract.managementType
      );
      break;
    case "ERC1155":
      contract = (await ERC1155.findOne({ contractId })) as Contract;
      sourceCode = await generateERC1155Source(
        contractId,
        contract.extensions,
        contract.managementType
      );
      break;
    default:
      res.status(400).json({ message: "Invalid token type" });
      return;
  }

  if (!contract) {
    res.status(404).json({ message: "Contract not found" });
    return;
  }

  const copilerVersion = "v0.8.17+commit.8df45f5f";

  const { apiKey, apiUrl } = getVerificationApiData(contract.networkChainId);

  if (!apiUrl || !apiKey)
    return res.status(500).json({ message: "Network not supported" });

  const formData = new FormData();
  formData.append("module", "contract");
  formData.append("action", "verifysourcecode");
  formData.append("codeformat", "solidity-standard-json-input");
  formData.append("apikey", apiKey);
  formData.append("contractaddress", contract?.address);
  formData.append("sourceCode", JSON.stringify(sourceCode));
  formData.append("contractname", `${contractId}.sol:${contract?.name}`);
  formData.append("compilerVersion", copilerVersion);

  let data;
  try {
    const response = await fetchWithError(apiUrl, {
      method: "POST",
      //@ts-ignore
      body: formData,
    });
    data = await response.json();
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Error sending verification request" });
  }

  const { status, result } = data;

  switch (tokenType) {
    case "ERC20":
      await ERC20.findOneAndUpdate(
        { contractId },
        { verificationGuid: result }
      );
      break;
    case "ERC721":
      await ERC721.findOneAndUpdate(
        { contractId },
        { verificationGuid: result }
      );
      break;
    case "ERC1155":
      await ERC1155.findOneAndUpdate(
        { contractId },
        { verificationGuid: result }
      );
      break;
  }
  if (status === "1") {
    res
      .status(200)
      .json({ message: "Verification request sent", guid: result });

    // update guid for the contract in the database
  } else {
    res.status(500).json({ error: result });
  }
}
