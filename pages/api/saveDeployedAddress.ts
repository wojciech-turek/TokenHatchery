import clientPromise from "lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contractId, address, type } = req.body;
  try {
    const client = await clientPromise;
    const db = client.db("Deployments");
    const collection = db.collection(`${type}`);
    await collection.findOneAndUpdate({ contractId }, { $set: { address } });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error });
  }
}
