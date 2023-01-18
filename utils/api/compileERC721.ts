//@ts-ignore
import solc from "solc";
import { contractMap, loadContract } from "./contractsMap";

export const compileERC721Contract = async (uuid: string) => {
  const contractName = `${uuid}.sol`;
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
    contractMap.get(`/tmp/${uuid}.sol`) || loadContract(`/tmp/${uuid}.sol`),
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
