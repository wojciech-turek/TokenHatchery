import clientPromise from "lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.body;
  console.log(address);
  const client = await clientPromise;
  const db = client.db("Deployments");
  const tokenTypes = ["ERC20", "ERC721", "ERC1155"];
  const tokens = await Promise.all(
    tokenTypes.map(async (tokenType) => {
      const collection = db.collection(`${tokenType}`);
      const tokens = await collection
        .find(
          { creator: address },
          {
            projection: {
              _id: 0,
              name: 1,
              symbol: 1,
              address: 1,
              type: 1,
              networkChainId: 1,
            },
          }
        )
        .toArray();
      return tokens;
    })
  );
  console.log(tokens);
  res.status(200).json(tokens);
}
