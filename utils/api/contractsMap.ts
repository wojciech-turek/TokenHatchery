import fs from "fs";
import { promisify } from "util";
const path = require("path");
const readFile = promisify(fs.readFile);

export const contractMap = new Map();
console.log("map", fs.readdirSync("."));
console.log("map, next", fs.readdirSync("./.next/server"));
const directory = path.join(process.cwd(), `contracts`);
console.log(fs.readdirSync(directory));
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
