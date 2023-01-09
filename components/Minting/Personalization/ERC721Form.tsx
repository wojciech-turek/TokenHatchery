import Input from "components/shared/Input";
import React, { useEffect } from "react";
import { TokenData } from "types/tokens";
import { validateInput } from "./validation";

const ERC721Form = ({
  tokenData,
  setTokenData,
  setStepComplete,
}: {
  tokenData: TokenData;
  setTokenData: (value: TokenData) => void;
  setStepComplete: (value: boolean) => void;
}) => {
  useEffect(() => {
    if (validateInput(tokenData.name) && validateInput(tokenData.symbol)) {
      setStepComplete(true);
    } else {
      setStepComplete(false);
    }
  }, [tokenData, setStepComplete]);

  return (
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
          name="symbol"
          value={tokenData.symbol}
          onChange={(e) => {
            setTokenData({ ...tokenData, symbol: e.target.value.trim() });
          }}
          error={tokenData.symbol !== "" && !validateInput(tokenData.symbol)}
          errorMessage="Symbol must be between 2 and 10 characters and contain only letters."
        />
        <p className="mt-2 text-sm text-gray-500" id="symbol">
          Short name of your token, usually 3-4 characters.
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
        />
        <p className="mt-2 text-sm text-gray-500" id="symbol">
          If you already have your images uploaded to IPFS, you can set the base
          URI here.
        </p>
      </div>
    </form>
  );
};

export default ERC721Form;
