import ERC20 from "models/ERC20Contract";
import ERC721 from "models/ERC721Contract";
import ERC1155 from "models/ERC1155Contract";
import connectMongo from "lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  const promises = [
    await ERC20.countDocuments(),
    await ERC721.countDocuments(),
    await ERC1155.countDocuments(),
  ];

  const [erc20count, erc721count, erc1155count] = await Promise.all(promises);
  const tokenCount = {
    erc20: erc20count,
    erc721: erc721count,
    erc1155: erc1155count,
  };

  res.status(200).json(tokenCount);
}
