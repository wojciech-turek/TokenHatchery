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
      const tokens = await collection.find({ creator: address }).toArray();
      return tokens;
    })
  );
  console.log(tokens);
}
