//@ts-ignore
import solc from "solc";
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "contracts");

const ERC20Contract = fs.readFileSync(
  path.join(dir, "token", "ERC20", "ERC20.sol"),
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

export const compileContract = async (uuid: string) => {
  const contractname = `${uuid}.sol`;
  const generatedContract = fs.readFileSync(`./contracts/${uuid}.sol`, "utf8");

  const input = {
    language: "Solidity",
    sources: {
      [contractname]: {
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
    if (path === "@openzeppelin/contracts/token/ERC20/ERC20.sol")
      return {
        contents: ERC20Contract,
      };
    else if (path === "@openzeppelin/contracts/token/ERC20/IERC20.sol")
      return {
        contents: IERC20Contract,
      };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol"
    )
      return {
        contents: IERC20MetadataContract,
      };
    else if (path === "@openzeppelin/contracts/utils/Context.sol")
      return {
        contents: ContextContract,
      };
    else if (path === "@openzeppelin/contracts/access/Ownable.sol")
      return {
        contents: OwnableContract,
      };
    else if (path === "@openzeppelin/contracts/access/AccessControl.sol")
      return {
        contents: AccessControlContract,
      };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol"
    )
      return {
        contents: ERC20BurnableContract,
      };
    else if (path === "@openzeppelin/contracts/security/Pausable.sol")
      return {
        contents: ERC20PausableContract,
      };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol"
    )
      return {
        contents: ERC20SnapshotContract,
      };
    else if (
      path === "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol"
    )
      return {
        contents: ERC20VotesContract,
      };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol"
    )
      return {
        contents: ERC20PermitContract,
      };
    else if (path === "@openzeppelin/contracts/access/IAccessControl.sol")
      return {
        contents: IAccessControlContract,
      };
    else if (path === "@openzeppelin/contracts/utils/Strings.sol")
      return {
        contents: StringsContract,
      };
    else if (path === "@openzeppelin/contracts/utils/introspection/ERC165.sol")
      return {
        contents: ERC165Contract,
      };
    else if (path === "@openzeppelin/contracts/utils/StorageSlot.sol")
      return {
        contents: StorageSlotContract,
      };
    else if (path === "@openzeppelin/contracts/utils/introspection/IERC165.sol")
      return {
        contents: IERC165Contract,
      };
    else if (
      path === "@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol"
    )
      return {
        contents: IERC3156FlashBorrowerContract,
      };
    else if (
      path === "@openzeppelin/contracts/interfaces/IERC3156FlashLender.sol"
    )
      return {
        contents: IERC3156FlashLenderContract,
      };
    else if (path === "@openzeppelin/contracts/utils/Arrays.sol")
      return {
        contents: ArraysContract,
      };
    else if (path === "@openzeppelin/contracts/utils/Counters.sol")
      return {
        contents: CountersContract,
      };
    else if (path === "@openzeppelin/contracts/utils/math/Math.sol")
      return {
        contents: MathContract,
      };
    else if (path === "@openzeppelin/contracts/governance/utils/IVotes.sol")
      return {
        contents: IVotesContract,
      };
    else if (path === "@openzeppelin/contracts/utils/math/SafeCast.sol")
      return {
        contents: SafeCastContract,
      };
    else if (path === "@openzeppelin/contracts/utils/cryptography/ECDSA.sol")
      return {
        contents: ECDSAContract,
      };
    else if (path === "@openzeppelin/contracts/utils/cryptography/EIP712.sol")
      return {
        contents: EIP712Contract,
      };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol"
    )
      return {
        contents: draftIERC20PermitContract,
      };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol"
    )
      return {
        contents: ERC20FlashMintContract,
      };
    else return { error: "File not found" };
  };

  var output = JSON.parse(
    solc.compile(JSON.stringify(input), { import: findImports })
  );
  return output;
};
