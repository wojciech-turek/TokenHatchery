import { fetchWithError } from "utils/client/fetchWithError";
import type { NextApiRequest, NextApiResponse } from "next";
import ERC20 from "models/ERC20Contract";
import ERC721 from "models/ERC721Contract";
import ERC1155 from "models/ERC1155Contract";
import FormData from "form-data";
import { getVerificationApiData } from "constants/supportedNetworks";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { guid, tokenType, networkChainId } = req.body;
  const verificationData = new FormData();

  const { apiKey, apiUrl } = getVerificationApiData(Number(networkChainId));

  if (!apiUrl || !apiKey)
    return res.status(500).json({ message: "Network not supported" });

  verificationData.append("module", "contract");
  verificationData.append("action", "checkverifystatus");
  verificationData.append("guid", guid);
  verificationData.append("apikey", apiKey || "");
  const verificationStatus = await fetchWithError(apiUrl, {
    method: "POST",
    //@ts-ignore
    body: verificationData,
  });
  if (verificationStatus.result === "Pass - Verified") {
    switch (tokenType) {
      case "ERC20":
        await ERC20.findOneAndUpdate(
          { verificationGuid: guid },
          { verified: true }
        );
        break;
      case "ERC721":
        await ERC721.findOneAndUpdate(
          { verificationGuid: guid },
          { verified: true }
        );
        break;
      case "ERC1155":
        await ERC1155.findOneAndUpdate(
          { verificationGuid: guid },
          { verified: true }
        );
        break;
    }
  }

  res.status(200).json(verificationStatus.result);
}
