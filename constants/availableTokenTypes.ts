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
    type: "Standard Utility Token",
    description:
      "ERC20 tokens can be used for a wide range of applications, including digital currency, fundraising, access control, and supply chain management. They can represent a variety of assets, including currencies, commodities, and utility tokens.",
    extensions: erc20Extensions,
    accessControl: ["Ownable", "Roles"],
    link: "/create/erc20",
    license: "MIT",
    enabled: true,
  },
  {
    name: "ERC721",
    type: "Non-Fungible Token",
    description:
      "ERC721 tokens are non-fungible tokens that can represent unique assets, such as digital collectibles, in-game items, and real estate. They are often used for applications that require the tracking and verification of ownership of unique assets.",
    extensions: erc721Extensions,
    accessControl: ["Ownable", "Roles"],
    link: "/create/erc721",
    license: "MIT",
    enabled: true,
  },
  {
    name: "ERC1155",
    type: "Multi-Fungible Token",
    description:
      "ERC1155 tokens are multi-token standards that allow users to manage multiple types of tokens in a single smart contract. Often used for applications that require the efficient management and transfer of multiple types of assets, such as in-game items and digital collectibles.",
    extensions: erc1155Extensions,
    accessControl: ["Ownable", "Roles"],
    link: "/create/erc1155",
    license: "MIT",
    enabled: false,
  },
];
