import fs from "fs";
import { promisify } from "util";
const readFile = promisify(fs.readFile);

export const contractMap = new Map();
console.log("map", fs.readdirSync("."));
console.log("map, next", fs.readdirSync("./.next"));
console.log("map", fs.readdirSync("/"));
console.log("map", fs.readdirSync("/root"));
console.log("map", fs.readdirSync("/media"));
console.log("map", fs.readdirSync("/lib"));
console.log("map", fs.readdirSync("/home"));
export const loadContract = async (contractPath: string) => {
  try {
    const contract = await readFile(contractPath, "utf8");
    contractMap.set(contractPath, contract);
    return contract;
  } catch {
    throw new Error(`Failed to load contract at ${contractPath}`);
  }
};
