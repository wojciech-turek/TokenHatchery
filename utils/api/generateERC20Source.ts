import { contractMap, loadContract } from "./contractsMap";

export const generateERC20Source = async (contractId: string) => {
  const [
    generatedContract,
    ERC20Contract,
    IERC20Contract,
    IERC20MetadataContract,
    ContextContract,
    OwnableContract,
    ERC20BurnableContract,
    PausableContract,
    ERC20SnapshotContract,
    ERC20PermitContract,
    StringsContract,
    StorageSlotContract,
    ArraysContract,
    CountersContract,
    MathContract,
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
    contractMap.get(
      "contracts/base/token/ERC20/extensions/draft-ERC20Permit.sol"
    ) ||
      loadContract(
        "contracts/base/token/ERC20/extensions/draft-ERC20Permit.sol"
      ),
    contractMap.get("contracts/base/utils/Strings.sol") ||
      loadContract("contracts/base/utils/Strings.sol"),
    contractMap.get("contracts/base/utils/StorageSlot.sol") ||
      loadContract("contracts/base/utils/StorageSlot.sol"),
    contractMap.get("contracts/base/utils/Arrays.sol") ||
      loadContract("contracts/base/utils/Arrays.sol"),
    contractMap.get("contracts/base/utils/Counters.sol") ||
      loadContract("contracts/base/utils/Counters.sol"),
    contractMap.get("contracts/base/utils/math/Math.sol") ||
      loadContract("contracts/base/utils/math/Math.sol"),
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

  const burnableExtension = {
    "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol": {
      content: ERC20BurnableContract,
    },
  };
  const pausableExtension = {
    "@openzeppelin/contracts/security/Pausable.sol": {
      content: PausableContract,
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
      ...burnableExtension,
      ...pausableExtension,
      ...permitExtension,
      ...snapshotsExtension,
      ...ownableControl,
    },
    settings: { optimizer: { enabled: true, runs: 200 } },
  };

  return sourceCode;
};
