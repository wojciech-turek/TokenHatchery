import fs from "fs";
import { promisify } from "util";
const readFile = promisify(fs.readFile);

export const contractMap = new Map();
console.log("map", fs.readdirSync("."));
console.log("map", fs.readdirSync("/"));
export const loadContract = async (contractPath: string) => {
  try {
    const contract = await readFile(contractPath, "utf8");
    contractMap.set(contractPath, contract);
    return contract;
  } catch {
    throw new Error(`Failed to load contract at ${contractPath}`);
  }
};
