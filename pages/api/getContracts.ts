import clientPromise from "lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.body;
  const client = await clientPromise;
  const db = client.db("Deployments");
  const tokenTypes = ["ERC20", "ERC721", "ERC1155"];
  const tokens = await Promise.all(
    tokenTypes.map(async (tokenType) => {
      const collection = db.collection(`${tokenType}`);
      const contracts = await collection
        .find(
          { creator: address, address: { $exists: true } },
          {
            projection: {
              _id: 1,
              name: 1,
              symbol: 1,
              address: 1,
              type: 1,
              networkChainId: 1,
            },
          }
        )
        .toArray();
      return {
        type: tokenType,
        deployments: contracts,
      };
    })
  );
  res.status(200).json(tokens);
}
