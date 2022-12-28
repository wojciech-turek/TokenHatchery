import type { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { guid } = req.body;
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
  res.status(200).json(parsedVerificationStatus.result);
}
