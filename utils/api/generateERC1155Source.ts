import { contractMap, loadContract } from "./contractsMap";

export const generateERC1155Source = async (contractId: string) => {
  const [
    generatedContract,
    ERC1155Contract,
    IERC1155Contract,
    IERC1155ReceiverContract,
    IERC1155MetadataURIContract,
    ContextContract,
    AddressContract,
    ERC165Contract,
    IERC165Contract,
    ERC1155BurnableContract,
    PausableContract,
    ERC1155SupplyContract,
    OwnableContract,
  ] = await Promise.all([
    contractMap.get(`/tmp/${contractId}.sol`) ||
      loadContract(`/tmp/${contractId}.sol`),
    contractMap.get("contracts/base/token/ERC1155/ERC1155.sol") ||
      loadContract("contracts/base/token/ERC1155/ERC1155.sol"),
    contractMap.get("contracts/base/token/ERC1155/IERC1155.sol") ||
      loadContract("contracts/base/token/ERC1155/IERC1155.sol"),
    contractMap.get("contracts/base/token/ERC1155/IERC1155Receiver.sol") ||
      loadContract("contracts/base/token/ERC1155/IERC1155Receiver.sol"),
    contractMap.get(
      "contracts/base/token/ERC1155/extensions/IERC1155MetadataURI.sol"
    ) ||
      loadContract(
        "contracts/base/token/ERC1155/extensions/IERC1155MetadataURI.sol"
      ),
    contractMap.get("contracts/base/utils/Context.sol") ||
      loadContract("contracts/base/utils/Context.sol"),
    contractMap.get("contracts/base/utils/Address.sol") ||
      loadContract("contracts/base/utils/Address.sol"),
    contractMap.get("contracts/base/utils/introspection/ERC165.sol") ||
      loadContract("contracts/base/utils/introspection/ERC165.sol"),
    contractMap.get("contracts/base/utils/introspection/IERC165.sol") ||
      loadContract("contracts/base/utils/introspection/IERC165.sol"),
    contractMap.get(
      "contracts/base/token/ERC1155/extensions/ERC1155Burnable.sol"
    ) ||
      loadContract(
        "contracts/base/token/ERC1155/extensions/ERC1155Burnable.sol"
      ),
    contractMap.get("contracts/base/security/Pausable.sol") ||
      loadContract("contracts/base/security/Pausable.sol"),
    contractMap.get(
      "contracts/base/token/ERC1155/extensions/ERC1155Supply.sol"
    ) ||
      loadContract("contracts/base/token/ERC1155/extensions/ERC1155Supply.sol"),
    contractMap.get("contracts/base/access/Ownable.sol") ||
      loadContract("contracts/base/access/Ownable.sol"),
    contractMap.get("contracts/base/access/AccessControl.sol") ||
      loadContract("contracts/base/access/AccessControl.sol"),
    contractMap.get("contracts/base/access/IAccessControl.sol") ||
      loadContract("contracts/base/access/IAccessControl.sol"),
    contractMap.get("contracts/base/utils/Strings.sol") ||
      loadContract("contracts/base/utils/Strings.sol"),
    contractMap.get("contracts/base/utils/math/Math.sol") ||
      loadContract("contracts/base/utils/math/Math.sol"),
  ]);

  const burnableExtension = {
    "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol": {
      content: ERC1155BurnableContract,
    },
  };
  const pausableExtension = {
    "@openzeppelin/contracts/security/Pausable.sol": {
      content: PausableContract,
    },
  };

  const supplyTrackableExtension = {
    "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol": {
      content: ERC1155SupplyContract,
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
      "@openzeppelin/contracts/token/ERC1155/ERC1155.sol": {
        content: ERC1155Contract,
      },
      "@openzeppelin/contracts/token/ERC1155/IERC1155.sol": {
        content: IERC1155Contract,
      },
      "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol": {
        content: IERC1155ReceiverContract,
      },
      "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol":
        {
          content: IERC1155MetadataURIContract,
        },
      "@openzeppelin/contracts/utils/Address.sol": {
        content: AddressContract,
      },
      "@openzeppelin/contracts/utils/Context.sol": {
        content: ContextContract,
      },
      "@openzeppelin/contracts/utils/introspection/ERC165.sol": {
        content: ERC165Contract,
      },
      "@openzeppelin/contracts/utils/introspection/IERC165.sol": {
        content: IERC165Contract,
      },

      ...burnableExtension,
      ...pausableExtension,
      ...supplyTrackableExtension,
      ...ownableControl,
    },
    settings: { optimizer: { enabled: true, runs: 200 } },
  };

  return sourceCode;
};
