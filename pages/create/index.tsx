import FlexibleContainer from "components/FlexibleContainer/FlexibleContainer";
import styles from "./Create.module.scss";
import React from "react";
import Link from "next/link";
import Heading from "components/Typography/Heading/Heading";
import BodyText from "components/Typography/BodyText/BodyText";

const tokenTypes = [
  {
    name: "ERC20",
    description:
      "Token type used by most fungible tokens, can be used for any purpose. Includes a lot of extensions and access control. You can premint tokens and add them to the initial supply.",
    extensions: [
      "Mintable",
      "Burnable",
      "Pausable",
      "Permit",
      "Snapshots",
      "Flash Minting",
      "Votes",
    ],
    accessControl: ["Ownable", "Roles"],
    link: "/create/erc20",
    license: "MIT",
  },
  {
    name: "ERC721",
    description:
      "ERC-721 is a free, open standard that describes how to build non-fungible or unique tokens on the Ethereum blockchain. While most tokens are fungible (every token is the same as every other token), ERC-721 tokens are all unique. ",
    extensions: [
      "Mintable",
      "Auto Increment Ids",
      "Burnable",
      "Pausable",
      "Enumerable",
      "URI Storage",
    ],
    accessControl: ["Ownable", "Roles"],
    link: "/create/erc721",
    license: "MIT",
  },
  {
    name: "ERC1155",
    description:
      "ERC-1155 token is an upgraded version of the older Ethereum token standards, such as the fungible ERC-20 or the non-fungible ERC-721.",
    extensions: [
      "Mintable",
      "Burnable",
      "Supply Tracking",
      "Pausable",
      "Updateable URI",
    ],
    accessControl: ["Ownable", "Roles"],
    link: "/create/erc1155",
    license: "MIT",
  },
];

const Create = () => {
  return (
    <FlexibleContainer>
      <Heading>Choose your token type</Heading>
      <div className={styles.tokenTypes}>
        {tokenTypes.map((tokenType) => (
          <div className={styles.tokenType} key={tokenType.name}>
            <h2>{tokenType.name}</h2>
            <p>{tokenType.description}</p>
            <BodyText bold>Available extensions:</BodyText>
            <div className={styles.tags}>
              {tokenType.extensions?.map((extension) => (
                <div className={styles.tag} key={extension}>
                  {extension}
                </div>
              ))}
            </div>
            <BodyText bold>Available access control:</BodyText>
            <div className={styles.tags}>
              {tokenType.accessControl?.map((accessControl) => (
                <div className={styles.tag} key={accessControl}>
                  {accessControl}
                </div>
              ))}
            </div>
            <p>License: {tokenType.license}</p>
            <div>
              <Link href={tokenType.link}>
                <button>Create</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </FlexibleContainer>
  );
};

export default Create;
