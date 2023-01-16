import type { NextApiRequest, NextApiResponse } from "next";
import ERC20 from "models/ERC20Contract";
import ERC721 from "models/ERC721Contract";
import ERC1155 from "models/ERC1155Contract";
import FormData from "form-data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { guid, tokenType } = req.body;
  const verificationData = new FormData();
  verificationData.append("module", "contract");
  verificationData.append("action", "checkverifystatus");
  verificationData.append("guid", guid);
  verificationData.append("apikey", process.env.ETHERSCAN_API_KEY || "");
  const verificationStatus = await fetch("http://api-goerli.etherscan.io/api", {
    method: "POST",
    //@ts-ignore
    body: verificationData,
  });
  const parsedVerificationStatus = await verificationStatus.json();
  if (parsedVerificationStatus.result === "Pass - Verified") {
    // update contract in the database
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

  res.status(200).json(parsedVerificationStatus.result);
}
