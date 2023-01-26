import ERC20 from "models/ERC20Contract";
import ERC721 from "models/ERC721Contract";
import ERC1155 from "models/ERC1155Contract";
import connectMongo from "lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.body;
  await connectMongo();

  const selectData =
    "_id name symbol address creator extensions networkChainId managementType baseURI";

  const promises = [
    await ERC20.find({ creator: address, address: { $ne: null } }).select(
      selectData
    ),
    await ERC721.find({ creator: address, address: { $ne: null } }).select(
      selectData
    ),
    await ERC1155.find({ creator: address, address: { $ne: null } }).select(
      selectData
    ),
  ];

  const [erc20, erc721, erc1155] = await Promise.all(promises);
  const tokens = [
    {
      type: "ERC20",
      deployments: erc20,
    },
    {
      type: "ERC721",
      deployments: erc721,
    },
    {
      type: "ERC1155",
      deployments: erc1155,
    },
  ];

  res.status(200).json(tokens);
}
