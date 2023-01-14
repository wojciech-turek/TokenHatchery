import { contractMap, loadContract } from "./contractsMap";

export const generateERC20Source = async (
  contractId: string,
  extensions: string[],
  managementType: string
) => {
  const [
    generatedContract,
    ERC20Contract,
    IERC20Contract,
    IERC20MetadataContract,
    ContextContract,
    OwnableContract,
    AccessControlContract,
    ERC20BurnableContract,
    PausableContract,
    ERC20SnapshotContract,
    ERC20VotesContract,
    ERC20PermitContract,
    ERC20FlashMintContract,
    IAccessControlContract,
    StringsContract,
    ERC165Contract,
    IERC165Contract,
    StorageSlotContract,
    IERC3156FlashBorrowerContract,
    IERC3156FlashLenderContract,
    ArraysContract,
    CountersContract,
    MathContract,
    IVotesContract,
    SafeCastContract,
    ECDSAContract,
    draftIERC20PermitContract,
    EIP712Contract,
  ] = await Promise.all([
    contractMap.get(`/tmp/${contractId}.sol`) ||
      loadContract(`/tmp/${contractId}.sol`),
    contractMap.get("contracts/base/token/ERC20/ERC20.sol") ||
      loadContract("contracts/base/token/ERC20/ERC20.sol"),
    contractMap.get("contracts/base/token/ERC20/IERC20.sol") ||
      loadContract("contracts/base/token/ERC20/IERC20.sol"),
    contractMap.get(
      "contracts/base/token/ERC20/extensions/IERC20Metadata.sol"
    ) ||
      loadContract("contracts/base/token/ERC20/extensions/IERC20Metadata.sol"),
    contractMap.get("contracts/base/utils/Context.sol") ||
      loadContract("contracts/base/utils/Context.sol"),
    contractMap.get("contracts/base/access/Ownable.sol") ||
      loadContract("contracts/base/access/Ownable.sol"),
    contractMap.get("contracts/base/access/AccessControl.sol") ||
      loadContract("contracts/base/access/AccessControl.sol"),
    contractMap.get(
      "contracts/base/token/ERC20/extensions/ERC20Burnable.sol"
    ) ||
      loadContract("contracts/base/token/ERC20/extensions/ERC20Burnable.sol"),
    contractMap.get("contracts/base/security/Pausable.sol") ||
      loadContract("contracts/base/security/Pausable.sol"),
    contractMap.get(
      "contracts/base/token/ERC20/extensions/ERC20Snapshot.sol"
    ) ||
      loadContract("contracts/base/token/ERC20/extensions/ERC20Snapshot.sol"),
    contractMap.get("contracts/base/token/ERC20/extensions/ERC20Votes.sol") ||
      loadContract("contracts/base/token/ERC20/extensions/ERC20Votes.sol"),
    contractMap.get(
      "contracts/base/token/ERC20/extensions/draft-ERC20Permit.sol"
    ) ||
      loadContract(
        "contracts/base/token/ERC20/extensions/draft-ERC20Permit.sol"
      ),
    contractMap.get(
      "contracts/base/token/ERC20/extensions/ERC20FlashMint.sol"
    ) ||
      loadContract("contracts/base/token/ERC20/extensions/ERC20FlashMint.sol"),
    contractMap.get("contracts/base/access/IAccessControl.sol") ||
      loadContract("contracts/base/access/IAccessControl.sol"),
    contractMap.get("contracts/base/utils/Strings.sol") ||
      loadContract("contracts/base/utils/Strings.sol"),
    contractMap.get("contracts/base/utils/introspection/ERC165.sol") ||
      loadContract("contracts/base/utils/introspection/ERC165.sol"),
    contractMap.get("contracts/base/utils/introspection/IERC165.sol") ||
      loadContract("contracts/base/utils/introspection/IERC165.sol"),
    contractMap.get("contracts/base/utils/StorageSlot.sol") ||
      loadContract("contracts/base/utils/StorageSlot.sol"),
    contractMap.get("contracts/base/interfaces/IERC3156FlashBorrower.sol") ||
      loadContract("contracts/base/interfaces/IERC3156FlashBorrower.sol"),
    contractMap.get("contracts/base/interfaces/IERC3156FlashLender.sol") ||
      loadContract("contracts/base/interfaces/IERC3156FlashLender.sol"),
    contractMap.get("contracts/base/utils/Arrays.sol") ||
      loadContract("contracts/base/utils/Arrays.sol"),
    contractMap.get("contracts/base/utils/Counters.sol") ||
      loadContract("contracts/base/utils/Counters.sol"),
    contractMap.get("contracts/base/utils/math/Math.sol") ||
      loadContract("contracts/base/utils/math/Math.sol"),
    contractMap.get("contracts/base/governance/utils/IVotes.sol") ||
      loadContract("contracts/base/governance/utils/IVotes.sol"),
    contractMap.get("contracts/base/utils/math/SafeCast.sol") ||
      loadContract("contracts/base/utils/math/SafeCast.sol"),
    contractMap.get("contracts/base/utils/cryptography/ECDSA.sol") ||
      loadContract("contracts/base/utils/cryptography/ECDSA.sol"),
    contractMap.get(
      "contracts/base/token/ERC20/extensions/draft-IERC20Permit.sol"
    ) ||
      loadContract(
        "contracts/base/token/ERC20/extensions/draft-IERC20Permit.sol"
      ),
    contractMap.get("contracts/base/utils/cryptography/EIP712.sol") ||
      loadContract("contracts/base/utils/cryptography/EIP712.sol"),
  ]);

  const burnable = extensions.includes("Burnable");
  const pausable = extensions.includes("Pausable");
  const permit = extensions.includes("Permit");
  const votes = extensions.includes("Votes");
  const flashMint = extensions.includes("Flash Minting");
  const snapshots = extensions.includes("Snapshots");

  const isOwnable = managementType === "Ownable";
  const isAccessControl = managementType === "AccessControl";

  const burnableExtension = {
    "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol": {
      content: ERC20BurnableContract,
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

  const permitExtension = {
    "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol": {
      content: ERC20PermitContract,
    },
    "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol": {
      content: draftIERC20PermitContract,
    },
    "@openzeppelin/contracts/utils/cryptography/ECDSA.sol": {
      content: ECDSAContract,
    },
    "@openzeppelin/contracts/utils/cryptography/EIP712.sol": {
      content: EIP712Contract,
    },
    "@openzeppelin/contracts/utils/Counters.sol": {
      content: CountersContract,
    },
    "@openzeppelin/contracts/utils/Strings.sol": {
      content: StringsContract,
    },
    "@openzeppelin/contracts/utils/math/Math.sol": {
      content: MathContract,
    },
  };

  const votesExtension = {
    "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol": {
      content: ERC20VotesContract,
    },
    "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol": {
      content: ERC20PermitContract,
    },
    "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol": {
      content: draftIERC20PermitContract,
    },
    "@openzeppelin/contracts/utils/cryptography/ECDSA.sol": {
      content: ECDSAContract,
    },
    "@openzeppelin/contracts/utils/cryptography/EIP712.sol": {
      content: EIP712Contract,
    },
    "@openzeppelin/contracts/utils/Counters.sol": {
      content: CountersContract,
    },
    "@openzeppelin/contracts/utils/Strings.sol": {
      content: StringsContract,
    },
    "@openzeppelin/contracts/utils/math/Math.sol": {
      content: MathContract,
    },
    "@openzeppelin/contracts/governance/utils/IVotes.sol": {
      content: IVotesContract,
    },
    "@openzeppelin/contracts/utils/math/SafeCast.sol": {
      content: SafeCastContract,
    },
  };
  const flashMintExtension = {
    "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol": {
      content: ERC20FlashMintContract,
    },
    "@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol": {
      content: IERC3156FlashBorrowerContract,
    },
    "@openzeppelin/contracts/interfaces/IERC3156FlashLender.sol": {
      content: IERC3156FlashLenderContract,
    },
  };
  const snapshotsExtension = {
    "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol": {
      content: ERC20SnapshotContract,
    },
    "@openzeppelin/contracts/utils/Counters.sol": {
      content: CountersContract,
    },
    "@openzeppelin/contracts/utils/Arrays.sol": {
      content: ArraysContract,
    },
    "@openzeppelin/contracts/utils/math/Math.sol": {
      content: MathContract,
    },
    "@openzeppelin/contracts/utils/StorageSlot.sol": {
      content: StorageSlotContract,
    },
  };
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

  const sourceCode = {
    language: "Solidity",
    sources: {
      [`${contractId}.sol`]: {
        content: generatedContract,
      },
      "@openzeppelin/contracts/token/ERC20/ERC20.sol": {
        content: ERC20Contract,
      },
      "@openzeppelin/contracts/token/ERC20/IERC20.sol": {
        content: IERC20Contract,
      },
      "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol": {
        content: IERC20MetadataContract,
      },
      "@openzeppelin/contracts/utils/Context.sol": {
        content: ContextContract,
      },
      ...(burnable && burnableExtension),
      ...(pausable && pausableExtension),
      ...(permit && permitExtension),
      ...(votes && votesExtension),
      ...(flashMint && flashMintExtension),
      ...(snapshots && snapshotsExtension),
      ...(isOwnable && ownableControl),
      ...(isAccessControl && accessControl),
    },
    settings: { optimizer: { enabled: true, runs: 200 } },
  };

  return sourceCode;
};
