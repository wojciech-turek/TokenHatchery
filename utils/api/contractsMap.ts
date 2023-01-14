import fs from "fs";
import { promisify } from "util";
const readFile = promisify(fs.readFile);

export const contractMap = new Map();

export const loadContract = async (contractPath: string) => {
  const contract = await readFile(contractPath, "utf8");
  contractMap.set(contractPath, contract);
  return contract;
};
