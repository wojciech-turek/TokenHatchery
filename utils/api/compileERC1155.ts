//@ts-ignore
import solc from "solc";
import { contractMap, loadContract } from "./contractsMap";

export const compileERC1155Contract = async (uuid: string) => {
  const contractName = `${uuid}.sol`;
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
    contractMap.get(`/tmp/${uuid}.sol`) || loadContract(`/tmp/${uuid}.sol`),
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
    if (path === "@openzeppelin/contracts/token/ERC1155/ERC1155.sol")
      return { contents: ERC1155Contract };
    else if (path === "@openzeppelin/contracts/token/ERC1155/IERC1155.sol")
      return { contents: IERC1155Contract };
    else if (
      path === "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol"
    )
      return { contents: IERC1155ReceiverContract };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol"
    )
      return { contents: IERC1155MetadataURIContract };
    else if (path === "@openzeppelin/contracts/utils/Context.sol")
      return { contents: ContextContract };
    else if (path === "@openzeppelin/contracts/utils/Address.sol")
      return { contents: AddressContract };
    else if (path === "@openzeppelin/contracts/utils/introspection/ERC165.sol")
      return { contents: ERC165Contract };
    else if (path === "@openzeppelin/contracts/utils/introspection/IERC165.sol")
      return { contents: IERC165Contract };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol"
    )
      return { contents: ERC1155BurnableContract };
    else if (path === "@openzeppelin/contracts/security/Pausable.sol")
      return { contents: PausableContract };
    else if (
      path ===
      "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol"
    )
      return { contents: ERC1155SupplyContract };
    else if (path === "@openzeppelin/contracts/access/Ownable.sol")
      return { contents: OwnableContract };
    else return { error: "File not found" };
  };

  const output = JSON.parse(
    solc.compile(JSON.stringify(input), { import: findImports })
  );

  return output;
};
