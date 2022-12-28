import { compileContract } from "./../../utils/compile";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, symbol, types } = req.body;
  const { mintable } = types;

  const contractId = uuidv4();
  // first letter of name and symbol to uppercase
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  const newContract = `
  // SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
${mintable ? `import "@openzeppelin/contracts/access/Ownable.sol";` : ""}

contract ${nameCapitalized} is ERC20, ${mintable ? "Ownable" : ""} {
    constructor() ERC20("MyTokeeen", "MTK") {}
    string public poopty = "${name}";
    string public pants = "${symbol}";

    ${
      mintable
        ? "function mint(address to, uint256 amount) public onlyOwner {_mint(to, amount);}"
        : ""
    } 
}
`;

  // create file with fs
  fs.writeFileSync(`./contracts/${contractId}.sol`, newContract);

  const result = await compileContract(contractId);

  res.status(200).json({ result, contractId });
}
