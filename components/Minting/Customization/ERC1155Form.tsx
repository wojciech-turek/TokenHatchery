import Input from "components/shared/Input";
import React, { useEffect } from "react";
import { ERC1155TokenData, TokenData } from "types/tokens";
import { validateInput, validateURL } from "./validation";

const ERC1155Form = ({
  tokenData,
  setTokenData,
  setStepComplete,
}: {
  tokenData: ERC1155TokenData;
  setTokenData: (value: TokenData) => void;
  setStepComplete: (value: boolean) => void;
}) => {
  useEffect(() => {
    if (
      tokenData.name !== "" &&
      tokenData.baseURI !== "" &&
      validateInput(tokenData.name) &&
      validateURL(tokenData.baseURI)
    ) {
      setStepComplete(true);
    } else {
      setStepComplete(false);
    }
  }, [tokenData, setStepComplete]);

  return (
    <>
      <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <Input
            type="text"
            name="name"
            value={tokenData.name}
            onChange={(e) => {
              setTokenData({ ...tokenData, name: e.target.value.trim() });
            }}
            error={tokenData.name !== "" && !validateInput(tokenData.name)}
            errorMessage="Name must be between 2 and 10 characters and contain only letters."
          />
          <p className="mt-2 text-sm text-gray-500">
            Will be used as the name of your token and the contract name.
          </p>
        </div>
        <div>
          <Input
            type="text"
            name="BaseURI"
            value={tokenData.baseURI}
            onChange={(e) => {
              setTokenData({ ...tokenData, baseURI: e.target.value.trim() });
            }}
            error={tokenData.baseURI !== "" && !validateURL(tokenData.baseURI)}
            errorMessage="Please enter a valid URL, it should start with https://. If you are using IPFS, you can use the IPFS gateway. For example: https://ipfs.io/ipfs/."
          />
          <p className="mt-2 text-sm text-gray-500" id="baseURI">
            Enter the base URI for your token. This will be used to generate the
            token URI.
          </p>
        </div>
        <small className="text-yellow-700">
          Note: You will be able to mint tokens to this contract after
          deployment.
        </small>
      </form>
    </>
  );
};

export default ERC1155Form;
