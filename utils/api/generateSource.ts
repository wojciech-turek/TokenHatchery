import fs from "fs";

export const generateSource = (
  contractId: string,
  extensions: string[],
  managementType: string
) => {
  const generatedContract = fs.readFileSync(`/tmp/${contractId}.sol`, "utf8");

  const ERC20Contract = fs.readFileSync(
    "contracts/base/token/ERC20/ERC20.sol",
    "utf8"
  );
  const IERC20Contract = fs.readFileSync(
    "contracts/base/token/ERC20/IERC20.sol",
    "utf8"
  );
  const IERC20MetadataContract = fs.readFileSync(
    "contracts/base/token/ERC20/extensions/IERC20Metadata.sol",
    "utf8"
  );

  const ContextContract = fs.readFileSync(
    "contracts/base/utils/Context.sol",
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

  const ERC20BurnableContract = fs.readFileSync(
    "contracts/base/token/ERC20/extensions/ERC20Burnable.sol",
    "utf8"
  );

  const ERC20PausableContract = fs.readFileSync(
    "contracts/base/security/Pausable.sol",
    "utf8"
  );

  const ERC20SnapshotContract = fs.readFileSync(
    "contracts/base/token/ERC20/extensions/ERC20Snapshot.sol",
    "utf8"
  );

  const ERC20VotesContract = fs.readFileSync(
    "contracts/base/token/ERC20/extensions/ERC20Votes.sol",
    "utf8"
  );

  const ERC20PermitContract = fs.readFileSync(
    "contracts/base/token/ERC20/extensions/draft-ERC20Permit.sol",
    "utf8"
  );

  const ERC20FlashMintContract = fs.readFileSync(
    "contracts/base/token/ERC20/extensions/ERC20FlashMint.sol",
    "utf8"
  );

  const IAccessControlContract = fs.readFileSync(
    "contracts/base/access/IAccessControl.sol",
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

  const StorageSlotContract = fs.readFileSync(
    "contracts/base/utils/StorageSlot.sol",
    "utf8"
  );

  const IERC3156FlashBorrowerContract = fs.readFileSync(
    "contracts/base/interfaces/IERC3156FlashBorrower.sol",
    "utf8"
  );

  const IERC3156FlashLenderContract = fs.readFileSync(
    "contracts/base/interfaces/IERC3156FlashLender.sol",
    "utf8"
  );

  const ArraysContract = fs.readFileSync(
    "contracts/base/utils/Arrays.sol",
    "utf8"
  );

  const CountersContract = fs.readFileSync(
    "contracts/base/utils/Counters.sol",
    "utf8"
  );

  const MathContract = fs.readFileSync(
    "contracts/base/utils/math/Math.sol",
    "utf8"
  );

  const IVotesContract = fs.readFileSync(
    "contracts/base/governance/utils/IVotes.sol",
    "utf8"
  );

  const SafeCastContract = fs.readFileSync(
    "contracts/base/utils/math/SafeCast.sol",
    "utf8"
  );

  const ECDSAContract = fs.readFileSync(
    "contracts/base/utils/cryptography/ECDSA.sol",
    "utf8"
  );

  const draftIERC20PermitContract = fs.readFileSync(
    "contracts/base/token/ERC20/extensions/draft-IERC20Permit.sol",
    "utf8"
  );

  const EIP712Contract = fs.readFileSync(
    "contracts/base/utils/cryptography/EIP712.sol",
    "utf8"
  );

  const mintable = extensions.includes("mintable");
  const burnable = extensions.includes("burnable");
  const pausable = extensions.includes("pausable");
  const permit = extensions.includes("permit");
  const votes = extensions.includes("votes");
  const flashMint = extensions.includes("flash minting");
  const snapshots = extensions.includes("snapshots");

  const isOwnable = managementType === "ownable";
  const isAccessControl = managementType === "accesscontrol";

  const burnableExtension = {
    "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol": {
      content: ERC20BurnableContract,
    },
  };
  const pausableExtension = {
    "@openzeppelin/contracts/security/Pausable.sol": {
      content: ERC20PausableContract,
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
