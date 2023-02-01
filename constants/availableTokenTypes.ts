import { Extension } from "types/extensions";

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
      "Contract will be able to be paused by a privilledged account. Useful for emergency response.",
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
];

export const erc20Settings = [
  {
    name: "Custom name and symbol",
  },
  {
    name: "Custom number of decimals"
  },
  {
    name: "Custom initial supply",
  },
  {
    name: "Static vs Dynamic supply",
  },
];

export const erc721Settings = [
  {
    name: "Unique vs Series Minting",
  },
  {
    name: "Public vs Private Minting",
  },
  {
    name: "Custom fee currency",
  },
  {
    name: "Updatable mint fee",
  },
  {
    name: "Custom limits",
  },
];

export const erc1155Settings = [
  {
    name: "Custom settings for each token",
  },
  {
    name: "Mint fungible and non-fungible tokens",
  },
  {
    name: "Flexible supply",
  },
];

export const erc721Extensions: Extension[] = [
  {
    name: "Mintable",
    description: "Adds functionality to mint new tokens.",
  },
  {
    name: "Auto Increment Ids",
    description: "New tokens will be automatically assigned an incremental id.",
  },
  {
    name: "Burnable",
    description: "Token holders will be able to destroy their tokens.",
  },
  {
    name: "Pausable",
    description:
      "Contract will be able to be paused by a privilledged account. Useful for emergency response.",
  },
  {
    name: "URI Storage",
    description: "Allows updating token URIs for individual token IDs.",
  },
  {
    name: "Enumerable",
    description:
      "Token holders will be able to enumerate all tokens owned by an address. Increases gas cost of transfers.",
  },
];

export const erc1155Extensions: Extension[] = [
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
      "Contract will be able to be paused by a privilledged account. Useful for emergency response.",
  },
  {
    name: "Updateable URI",
    description:
      "Privileged accounts will be able to set a new URI for all token types.",
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
    settings: erc20Settings,
    link: "/create/erc20",
    enabled: true,
  },
  {
    name: "ERC721",
    type: "Non-Fungible Token",
    description:
      "ERC721 tokens are non-fungible tokens that can represent unique assets, such as digital collectibles, in-game items, and real estate. They are often used for applications that require the tracking and verification of ownership of unique assets.",
    extensions: erc721Extensions,
    settings: erc721Settings,
    link: "/create/erc721",
    enabled: true,
  },
  {
    name: "ERC1155",
    type: "Multi-Fungible Token",
    description:
      "ERC1155 tokens are multi-token standards that allow users to manage multiple types of tokens in a single smart contract. Often used for applications that require the efficient management and transfer of multiple types of assets, such as in-game items and digital collectibles.",
    extensions: erc1155Extensions,
    settings: erc1155Settings,
    link: "/create/erc1155",
    enabled: false,
  },
];
