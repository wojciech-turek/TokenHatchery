export type Extension = {
  name: string;
  description: string;
  advanced?: boolean;
};

export type AccessControl = {
  name: string;
  type: "Ownable" | "AccessControl";
  description: string;
};

export const accessControl: AccessControl[] = [
  {
    name: "Single Admin",
    type: "Ownable",
    description:
      "Single admin. Admin account will be able to transfer ownership.",
  },
  {
    name: "Role Based Access Control",
    type: "AccessControl",
    description:
      "Multiple roles. Admin accounts will be able to grant and revoke roles.",
  },
];

export const erc20Extensions: Extension[] = [
  {
    name: "Mintable",
    description: "Privileged accounts will be able to create more supply.",
  },
  {
    name: "Burnable",
    description: "Token holders will be able to destroy their tokens.",
  },
  {
    name: "Pausable",
    description:
      "Privileged accounts will be able to pause the functionality marked as whenNotPaused. Useful for emergency response.",
  },
  {
    name: "Permit",
    description:
      "Without paying gas, token holders will be able to allow third parties to transfer from their account.",
    advanced: true,
  },
  {
    name: "Snapshots",
    description:
      "Privileged accounts will be able to store snapshots of balances that can be retrieved later. For on-chain voting, the Votes option is preferable.",
    advanced: true,
  },
  {
    name: "Flash Minting",
    description:
      "Built-in flash loans. Lend tokens without requiring collateral as long as they're returned in the same transaction.",
    advanced: true,
  },
  {
    name: "Votes",
    description:
      "Keeps track of historical balances for voting in on-chain governance, with a way to delegate one's voting power to a trusted account.",
    advanced: true,
  },
];

export const erc721Extensions: Extension[] = [
  {
    name: "Mintable",
    description: "Privileged accounts will be able to create more supply.",
  },
  {
    name: "Burnable",
    description: "Token holders will be able to destroy their tokens.",
  },
  {
    name: "Pausable",
    description:
      "Privileged accounts will be able to pause the functionality marked as whenNotPaused. Useful for emergency response.",
  },
  {
    name: "Auto Increment Ids",
    description:
      "Tokens will be minted with an auto-incrementing id. This is useful for creating a unique token id for each token.",
  },
  {
    name: "URI Storage",
    description:
      "Token metadata will be stored on IPFS and the URI will be stored on-chain.",
  },
  {
    name: "Enumerable",
    description:
      "Token holders will be able to enumerate all tokens owned by an address. Increases gas cost of transfers.",
    advanced: true,
  },
];

const erc1155Extensions: Extension[] = [
  {
    name: "Mintable",
    description: "Privileged accounts will be able to create more supply.",
  },
  {
    name: "Burnable",
    description: "Token holders will be able to destroy their tokens.",
  },
  {
    name: "Pausable",
    description:
      "Privileged accounts will be able to pause the functionality marked as whenNotPaused. Useful for emergency response.",
  },
  {
    name: "Updateable URI",
    description:
      "Token URI will be able to be updated by the owner of the contract.",
  },
  {
    name: "Supply Tracking",
    description: "Supply of each token will be tracked.",
  },
];

export const tokenTypes = [
  {
    name: "ERC20",
    description:
      "Token type used by most fungible tokens, can be used for any purpose. Includes a lot of extensions and access control. You can premint tokens and add them to the initial supply.",
    extensions: erc20Extensions,
    accessControl: ["Ownable", "Roles"],
    link: "/create/erc20",
    license: "MIT",
    enabled: true,
  },
  {
    name: "ERC721",
    description:
      "ERC-721 is a free, open standard that describes how to build non-fungible or unique tokens on the Ethereum blockchain. While most tokens are fungible (every token is the same as every other token), ERC-721 tokens are all unique. ",
    extensions: erc721Extensions,
    accessControl: ["Ownable", "Roles"],
    link: "/create/erc721",
    license: "MIT",
    enabled: false,
  },
  {
    name: "ERC1155",
    description:
      "ERC-1155 token is an upgraded version of the older Ethereum token standards, such as the fungible ERC-20 or the non-fungible ERC-721.",
    extensions: erc1155Extensions,
    accessControl: ["Ownable", "Roles"],
    link: "/create/erc1155",
    license: "MIT",
    enabled: false,
  },
];
