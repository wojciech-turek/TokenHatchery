import fs from "fs";
import { promisify } from "util";
const path = require("path");

const readFile = promisify(fs.readFile);
// Include the path to the contracts folder so that the contracts can be loaded from the filesystem
path.join(process.cwd(), `contracts`);

export const contractMap = new Map();

export const loadContract = async (contractPath: string) => {
  try {
    const contract = await readFile(contractPath, "utf8");
    contractMap.set(contractPath, contract);
    return contract;
  } catch {
    throw new Error(`Failed to load contract at ${contractPath}`);
  }
};
