import fs from "fs";

export const generateERC721Source = (
  contractId: string,
  extensions: string[],
  managementType: string
) => {
  const generatedContract = fs.readFileSync(`/tmp/${contractId}.sol`, "utf8");
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

  const isOwnable = managementType === "Ownable";
  const isAccessControl = managementType === "AccessControl";

  const burnable = extensions.includes("Burnable");
  const pausable = extensions.includes("Pausable");
  const votes = extensions.includes("Votes");
  const enumerable = extensions.includes("Enumerable");
  const autoIncrementIds = extensions.includes("Auto Increment Ids");
  const URIStorage = extensions.includes("URI Storage");

  const ownableControl = {
    "@openzeppelin/contracts/access/Ownable.sol": {
      content: OwnableContract,
    },
  };
  const accessControl = {
    "@openzeppelin/contracts/access/AccessControl.sol": {
      content: AccessControlContract,
    },
    "@openzeppelin/contracts/access/IAccessControl.sol": {
      content: IAccessControlContract,
    },
    "@openzeppelin/contracts/utils/introspection/ERC165.sol": {
      content: ERC165Contract,
    },
    "@openzeppelin/contracts/utils/introspection/IERC165.sol": {
      content: IERC165Contract,
    },
  };

  const burnableExtension = {
    "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol": {
      content: ERC721BurnableContract,
    },
    //context
    "@openzeppelin/contracts/utils/Context.sol": {
      content: ContextContract,
    },
  };

  const pausableExtension = {
    "@openzeppelin/contracts/security/Pausable.sol": {
      content: PausableContract,
    },
  };

  const votesExtension = {
    "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol": {
      content: ERC721VotesContract,
    },
    "@openzeppelin/contracts/utils/Checkpoints.sol": {
      content: CheckpointsContract,
    },
    // ecdsa
    "@openzeppelin/contracts/utils/cryptography/ECDSA.sol": {
      content: ECDSAContract,
    },
    // strings
    "@openzeppelin/contracts/utils/Strings.sol": {
      content: StringsContract,
    },
    // math
    "@openzeppelin/contracts/utils/math/Math.sol": {
      content: MathContract,
    },
    // context
    "@openzeppelin/contracts/utils/Context.sol": {
      content: ContextContract,
    },
    // counters
    "@openzeppelin/contracts/utils/Counters.sol": {
      content: CountersContract,
    },
    // eip712
    "@openzeppelin/contracts/utils/cryptography/EIP712.sol": {
      content: EIP712Contract,
    },
    "@openzeppelin/contracts/utils/math/SafeCast.sol": {
      content: SafeCastContract,
    },
    "@openzeppelin/contracts/governance/utils/Votes.sol": {
      content: VotesContract,
    },
    "@openzeppelin/contracts/governance/utils/IVotes.sol": {
      content: IVotesContract,
    },
  };

  const enumerableExtension = {
    "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol": {
      content: ERC721EnumerableContract,
    },
    "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol": {
      content: IERC721EnumerableContract,
    },
  };

  const URIStorageExtension = {
    "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol": {
      content: ERC721URIStorageContract,
    },
  };

  const autoIncrementIdsExtension = {
    "@openzeppelin/contracts/utils/Counters.sol": {
      content: CountersContract,
    },
  };

  const sourceCode = {
    language: "Solidity",
    sources: {
      [`${contractId}.sol`]: {
        content: generatedContract,
      },
      "@openzeppelin/contracts/token/ERC721/ERC721.sol": {
        content: ERC721Contract,
      },
      "@openzeppelin/contracts/token/ERC721/IERC721.sol": {
        content: IERC721Contract,
      },
      "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol": {
        content: IERC721MetadataContract,
      },
      "@openzeppelin/contracts/utils/Address.sol": {
        content: AddressContract,
      },
      "@openzeppelin/contracts/utils/Context.sol": {
        content: ContextContract,
      },
      "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol": {
        content: IERC721ReceiverContract,
      },
      "@openzeppelin/contracts/utils/Strings.sol": {
        content: StringsContract,
      },
      "@openzeppelin/contracts/utils/introspection/ERC165.sol": {
        content: ERC165Contract,
      },
      "@openzeppelin/contracts/utils/introspection/IERC165.sol": {
        content: IERC165Contract,
      },
      "@openzeppelin/contracts/utils/math/Math.sol": {
        content: MathContract,
      },
      ...(burnable && burnableExtension),
      ...(pausable && pausableExtension),
      ...(votes && votesExtension),
      ...(enumerable && enumerableExtension),
      ...(URIStorage && URIStorageExtension),
      ...(autoIncrementIds && autoIncrementIdsExtension),
      ...(isOwnable && ownableControl),
      ...(isAccessControl && accessControl),
    },
    settings: { optimizer: { enabled: true, runs: 200 } },
  };

  return sourceCode;
};
