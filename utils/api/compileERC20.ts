import { loadContract } from "./contractsMap";
//@ts-ignore
import solc from "solc";
import { contractMap } from "./contractsMap";

export const compileERC20Contract = async (uuid: string) => {
  const contractName = `${uuid}.sol`;
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
    contractMap.get(`/tmp/${uuid}.sol`) || loadContract(`/tmp/${uuid}.sol`),
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
    contractMap.get("contracts/base/math/Math.sol") ||
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
        contents: PausableContract,
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

  const output = JSON.parse(
    solc.compile(JSON.stringify(input), { import: findImports })
  );
  return output;
};
