import connectMongo from "lib/mongodb";
import ERC20 from "models/ERC20Contract";
import ERC721 from "models/ERC721Contract";
import ERC1155 from "models/ERC1155Contract";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contractId, address, type } = req.body;
  try {
    await connectMongo();
    if (type === "ERC20") {
      await ERC20.findOneAndUpdate(
        { contractId },
        { address: address.toLowerCase() }
      );
    } else if (type === "ERC721") {
      await ERC721.findOneAndUpdate(
        { contractId },
        { address: address.toLowerCase() }
      );
    } else if (type === "ERC1155") {
      await ERC1155.findOneAndUpdate(
        { contractId },
        { address: address.toLowerCase() }
      );
    }
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error });
  }
}
