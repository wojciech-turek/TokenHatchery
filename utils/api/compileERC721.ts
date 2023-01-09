//@ts-ignore
import solc from "solc";
import fs from "fs";

const ERC721Contract = fs.readFileSync(
  "contracts/base/token/ERC721/ERC721.sol",
  "utf8"
);

const IERC721Contract = fs.readFileSync(
  "contracts/base/token/ERC721/IERC721.sol",
  "utf8"
);

const IERC721MetadataContract = fs.readFileSync(
  "contracts/base/token/ERC721/extensions/IERC721Metadata.sol",
  "utf8"
);

const AddressContract = fs.readFileSync(
  "contracts/base/utils/Address.sol",
  "utf8"
);

const ContextContract = fs.readFileSync(
  "contracts/base/utils/Context.sol",
  "utf8"
);

const ERC721BurnableContract = fs.readFileSync(
  "contracts/base/token/ERC721/extensions/ERC721Burnable.sol",
  "utf8"
);

const IERC721ReceiverContract = fs.readFileSync(
  "contracts/base/token/ERC721/IERC721Receiver.sol",
  "utf8"
);

const StringsContract = fs.readFileSync(
  "contracts/base/utils/Strings.sol",
  "utf8"
);

const ERC165Contract = fs.readFileSync(
  "contracts/base/utils/introspection/ERC165.sol",
  "utf8"
);

const IERC165Contract = fs.readFileSync(
  "contracts/base/utils/introspection/IERC165.sol",
  "utf8"
);

const MathContract = fs.readFileSync(
  "contracts/base/utils/math/Math.sol",
  "utf8"
);

const OwnableContract = fs.readFileSync(
  "contracts/base/access/Ownable.sol",
  "utf8"
);

const AccessControlContract = fs.readFileSync(
  "contracts/base/access/AccessControl.sol",
  "utf8"
);

const IAccessControlContract = fs.readFileSync(
  "contracts/base/access/IAccessControl.sol",
  "utf8"
);

const ECDSAContract = fs.readFileSync(
  "contracts/base/utils/cryptography/ECDSA.sol",
  "utf8"
);

const CountersContract = fs.readFileSync(
  "contracts/base/utils/Counters.sol",
  "utf8"
);

const PausableContract = fs.readFileSync(
  "contracts/base/security/Pausable.sol",
  "utf8"
);

const EIP712Contract = fs.readFileSync(
  "contracts/base/utils/cryptography/EIP712.sol",
  "utf8"
);

const ERC721VotesContract = fs.readFileSync(
  "contracts/base/token/ERC721/extensions/ERC721Votes.sol",
  "utf8"
);

const CheckpointsContract = fs.readFileSync(
  "contracts/base/utils/Checkpoints.sol",
  "utf8"
);

const SafeCastContract = fs.readFileSync(
  "contracts/base/utils/math/SafeCast.sol",
  "utf8"
);

const VotesContract = fs.readFileSync(
  "contracts/base/governance/utils/Votes.sol",
  "utf8"
);

const IVotesContract = fs.readFileSync(
  "contracts/base/governance/utils/IVotes.sol",
  "utf8"
);

const ERC721EnumerableContract = fs.readFileSync(
  "contracts/base/token/ERC721/extensions/ERC721Enumerable.sol",
  "utf8"
);

const IERC721EnumerableContract = fs.readFileSync(
  "contracts/base/token/ERC721/extensions/IERC721Enumerable.sol",
  "utf8"
);

const ERC721URIStorageContract = fs.readFileSync(
  "contracts/base/token/ERC721/extensions/ERC721URIStorage.sol",
  "utf8"
);

export const compileERC721Contract = async (uuid: string) => {
  const contractName = `${uuid}.sol`;
  const generatedContract = fs.readFileSync(`/tmp/${uuid}.sol`, "utf8");

  const input = {
    language: "Solidity",
    sources: {
      [contractName]: {
        content: generatedContract,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  };

  const findImports = (path: string) => {
    console.log("path", path);
    if (path === "@openzeppelin/contracts/token/ERC721/ERC721.sol")
      return { contents: ERC721Contract };
    else if (path === "@openzeppelin/contracts/token/ERC721/IERC721.sol")
      return { contents: IERC721Contract };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol"
    )
      return { contents: IERC721MetadataContract };
    else if (path === "@openzeppelin/contracts/utils/Address.sol")
      return { contents: AddressContract };
    else if (path === "@openzeppelin/contracts/utils/Context.sol")
      return { contents: ContextContract };
    else if (path === "@openzeppelin/contracts/utils/Strings.sol")
      return { contents: StringsContract };
    else if (path === "@openzeppelin/contracts/utils/introspection/ERC165.sol")
      return { contents: ERC165Contract };
    else if (path === "@openzeppelin/contracts/utils/introspection/IERC165.sol")
      return { contents: IERC165Contract };
    else if (path === "@openzeppelin/contracts/utils/math/Math.sol")
      return { contents: MathContract };
    else if (path === "@openzeppelin/contracts/access/Ownable.sol")
      return { contents: OwnableContract };
    else if (path === "@openzeppelin/contracts/access/AccessControl.sol")
      return { contents: AccessControlContract };
    else if (path === "@openzeppelin/contracts/access/IAccessControl.sol")
      return { contents: IAccessControlContract };
    else if (path === "@openzeppelin/contracts/utils/cryptography/ECDSA.sol")
      return { contents: ECDSAContract };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol"
    )
      return { contents: ERC721BurnableContract };
    else if (
      path === "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol"
    )
      return { contents: IERC721ReceiverContract };
    else if (path === "@openzeppelin/contracts/utils/Counters.sol")
      return { contents: CountersContract };
    else if (path === "@openzeppelin/contracts/security/Pausable.sol")
      return { contents: PausableContract };
    else if (path === "@openzeppelin/contracts/utils/cryptography/EIP712.sol")
      return { contents: EIP712Contract };
    else if (
      path === "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol"
    )
      return { contents: ERC721VotesContract };
    else if (path === "@openzeppelin/contracts/utils/Checkpoints.sol")
      return { contents: CheckpointsContract };
    else if (path === "@openzeppelin/contracts/utils/math/SafeCast.sol")
      return { contents: SafeCastContract };
    else if (path === "@openzeppelin/contracts/governance/utils/Votes.sol")
      return { contents: VotesContract };
    else if (path === "@openzeppelin/contracts/governance/utils/IVotes.sol")
      return { contents: IVotesContract };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"
    )
      return { contents: ERC721EnumerableContract };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol"
    )
      return { contents: IERC721EnumerableContract };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"
    )
      return { contents: ERC721URIStorageContract };
    else return { error: "File not found" };
  };

  const output = JSON.parse(
    solc.compile(JSON.stringify(input), { import: findImports })
  );

  return output;
};
