import { contractMap, loadContract } from "./contractsMap";

export const generateERC721Source = async (
  contractId: string,
  extensions: string[],
  managementType: string
) => {
  const [
    generatedContract,
    ERC721Contract,
    IERC721Contract,
    IERC721MetadataContract,
    AddressContract,
    ContextContract,
    ERC721BurnableContract,
    IERC721ReceiverContract,
    StringsContract,
    ERC165Contract,
    IERC165Contract,
    MathContract,
    OwnableContract,
    AccessControlContract,
    IAccessControlContract,
    ECDSAContract,
    CountersContract,
    PausableContract,
    EIP712Contract,
    ERC721VotesContract,
    CheckpointsContract,
    SafeCastContract,
    VotesContract,
    IVotesContract,
    ERC721EnumerableContract,
    IERC721EnumerableContract,
    ERC721URIStorageContract,
  ] = await Promise.all([
    contractMap.get(`/tmp/${contractId}.sol`) ||
      loadContract(`/tmp/${contractId}.sol`),
    contractMap.get("contracts/base/token/ERC721/ERC721.sol") ||
      loadContract("contracts/base/token/ERC721/ERC721.sol"),
    contractMap.get("contracts/base/token/ERC721/IERC721.sol") ||
      loadContract("contracts/base/token/ERC721/IERC721.sol"),
    contractMap.get(
      "contracts/base/token/ERC721/extensions/IERC721Metadata.sol"
    ) ||
      loadContract(
        "contracts/base/token/ERC721/extensions/IERC721Metadata.sol"
      ),
    contractMap.get("contracts/base/utils/Address.sol") ||
      loadContract("contracts/base/utils/Address.sol"),
    contractMap.get("contracts/base/utils/Context.sol") ||
      loadContract("contracts/base/utils/Context.sol"),
    contractMap.get(
      "contracts/base/token/ERC721/extensions/ERC721Burnable.sol"
    ) ||
      loadContract("contracts/base/token/ERC721/extensions/ERC721Burnable.sol"),
    contractMap.get("contracts/base/token/ERC721/IERC721Receiver.sol") ||
      loadContract("contracts/base/token/ERC721/IERC721Receiver.sol"),
    contractMap.get("contracts/base/utils/Strings.sol") ||
      loadContract("contracts/base/utils/Strings.sol"),
    contractMap.get("contracts/base/utils/introspection/ERC165.sol") ||
      loadContract("contracts/base/utils/introspection/ERC165.sol"),
    contractMap.get("contracts/base/utils/introspection/IERC165.sol") ||
      loadContract("contracts/base/utils/introspection/IERC165.sol"),
    contractMap.get("contracts/base/utils/math/Math.sol") ||
      loadContract("contracts/base/utils/math/Math.sol"),
    contractMap.get("contracts/base/access/Ownable.sol") ||
      loadContract("contracts/base/access/Ownable.sol"),
    contractMap.get("contracts/base/access/AccessControl.sol") ||
      loadContract("contracts/base/access/AccessControl.sol"),
    contractMap.get("contracts/base/access/IAccessControl.sol") ||
      loadContract("contracts/base/access/IAccessControl.sol"),
    contractMap.get("contracts/base/utils/cryptography/ECDSA.sol") ||
      loadContract("contracts/base/utils/cryptography/ECDSA.sol"),
    contractMap.get("contracts/base/utils/Counters.sol") ||
      loadContract("contracts/base/utils/Counters.sol"),
    contractMap.get("contracts/base/security/Pausable.sol") ||
      loadContract("contracts/base/security/Pausable.sol"),
    contractMap.get("contracts/base/utils/cryptography/EIP712.sol") ||
      loadContract("contracts/base/utils/cryptography/EIP712.sol"),
    contractMap.get("contracts/base/token/ERC721/extensions/ERC721Votes.sol") ||
      loadContract("contracts/base/token/ERC721/extensions/ERC721Votes.sol"),
    contractMap.get("contracts/base/utils/Checkpoints.sol") ||
      loadContract("contracts/base/utils/Checkpoints.sol"),
    contractMap.get("contracts/base/utils/math/SafeCast.sol") ||
      loadContract("contracts/base/utils/math/SafeCast.sol"),
    contractMap.get("contracts/base/governance/utils/Votes.sol") ||
      loadContract("contracts/base/governance/utils/Votes.sol"),
    contractMap.get("contracts/base/governance/utils/IVotes.sol") ||
      loadContract("contracts/base/governance/utils/IVotes.sol"),
    contractMap.get(
      "contracts/base/token/ERC721/extensions/ERC721Enumerable.sol"
    ) ||
      loadContract(
        "contracts/base/token/ERC721/extensions/ERC721Enumerable.sol"
      ),
    contractMap.get(
      "contracts/base/token/ERC721/extensions/IERC721Enumerable.sol"
    ) ||
      loadContract(
        "contracts/base/token/ERC721/extensions/IERC721Enumerable.sol"
      ),
    contractMap.get(
      "contracts/base/token/ERC721/extensions/ERC721URIStorage.sol"
    ) ||
      loadContract(
        "contracts/base/token/ERC721/extensions/ERC721URIStorage.sol"
      ),
  ]);

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
  };

  const burnableExtension = {
    "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol": {
      content: ERC721BurnableContract,
    },
    "@openzeppelin/contracts/utils/Context.sol": {
      content: ContextContract,
    },
  };

  const pausableExtension = {
    "@openzeppelin/contracts/security/Pausable.sol": {
      content: PausableContract,
    },
    "@openzeppelin/contracts/utils/Context.sol": {
      content: ContextContract,
    },
  };

  const votesExtension = {
    "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol": {
      content: ERC721VotesContract,
    },
    "@openzeppelin/contracts/utils/Checkpoints.sol": {
      content: CheckpointsContract,
    },
    "@openzeppelin/contracts/utils/cryptography/ECDSA.sol": {
      content: ECDSAContract,
    },
    "@openzeppelin/contracts/utils/Strings.sol": {
      content: StringsContract,
    },
    "@openzeppelin/contracts/utils/math/Math.sol": {
      content: MathContract,
    },
    "@openzeppelin/contracts/utils/Context.sol": {
      content: ContextContract,
    },
    "@openzeppelin/contracts/utils/Counters.sol": {
      content: CountersContract,
    },
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
