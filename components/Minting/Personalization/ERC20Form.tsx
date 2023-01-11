import Input from "components/shared/Input";
import React, { useEffect } from "react";
import { ERC20TokenData, TokenData } from "types/tokens";
import { validateInput, validateNumber } from "./validation";

const ERC20Form = ({
  tokenData,
  setTokenData,
  setStepComplete,
}: {
  tokenData: ERC20TokenData;
  setTokenData: (value: TokenData) => void;
  setStepComplete: (value: boolean) => void;
}) => {
  useEffect(() => {
    if (
      validateInput(tokenData.name) &&
      validateInput(tokenData.symbol) &&
      validateNumber(tokenData.decimals) &&
      validateNumber(tokenData.initialSupply)
    ) {
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
          type="number"
          name="decimals"
          value={tokenData.decimals}
          onChange={(e) => {
            setTokenData({
              ...tokenData,
              decimals: parseInt(e.currentTarget.value).toString(),
            });
          }}
          error={
            tokenData.decimals !== "" && !validateNumber(tokenData.decimals)
          }
          errorMessage="Decimals must be between 1 and 18."
        />
        <p className="mt-2 text-sm text-gray-500" id="decimals">
          Number of decimals your token will have. The default is 18.
        </p>
      </div>
      <div>
        <Input
          type="number"
          name="supply"
          value={tokenData.initialSupply}
          onChange={(e) => {
            setTokenData({
              ...tokenData,
              initialSupply: parseInt(e.target.value).toString(),
            });
          }}
          error={
            tokenData.initialSupply !== "" &&
            !validateNumber(tokenData.initialSupply)
          }
          errorMessage="Initial supply must be greater than 0 and a whole number."
        />

        <p className="mt-2 text-sm text-gray-500" id="supply">
          Amount of tokens to be minted at the time of token creation. The
          tokens will be minted to the deployers address.
        </p>
      </div>
    </form>
  );
};

export default ERC20Form;
