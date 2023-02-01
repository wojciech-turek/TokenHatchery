import { Switch } from "@headlessui/react";
import Input from "components/shared/Input";
import React, { useEffect } from "react";
import { ERC20TokenData, TokenData } from "types/tokens";
import { classNames } from "utils/client/classNames";
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
      !validateInput(tokenData.name) || 
      !validateInput(tokenData.symbol) ||
      !validateNumber(tokenData.decimals) ||
      (tokenData.initialSupply !== "" &&
      !validateNumber(tokenData.initialSupply))
    ) {
      setStepComplete(false);
    } else {
      setStepComplete(true);
    }
  }, [tokenData, setStepComplete]);

  return (
    <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
      <Input
        type="text"
        name="name"
        value={tokenData.name}
        onChange={(e) => {
          setTokenData({ ...tokenData, name: e.target.value.trim() });
        }}
        subtext="Will be used as the name of your token and the contract name."
        error={tokenData.name !== "" && !validateInput(tokenData.name)}
        errorMessage="Name must be between 2 and 10 characters and contain only letters."
      />
      <Input
        type="text"
        name="symbol"
        value={tokenData.symbol}
        onChange={(e) => {
          setTokenData({ ...tokenData, symbol: e.target.value.trim() });
        }}
        error={tokenData.symbol !== "" && !validateInput(tokenData.symbol)}
        subtext="Short name of your token, usually 3-4 characters."
        errorMessage="Symbol must be between 2 and 10 characters and contain only letters."
      />
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
        subtext="Number of decimal places your token will have. 18 is the most common."
        error={tokenData.decimals !== "" && !validateNumber(tokenData.decimals)}
        errorMessage="Decimals must be between 1 and 18."
      />
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
          subtext="Amount of tokens to be minted at the time of token creation. The tokens will be minted to the deployers address. Leave blank if you don't want to mint any tokens at the time of token creation."
          error={
            tokenData.initialSupply !== "" &&
            !validateNumber(tokenData.initialSupply)
          }
          errorMessage="Initial supply must be greater than 0 and a whole number."
        />
      </div>
      <div>
        <Switch.Group as="div" className="flex items-center justify-between">
          <span className="flex flex-grow flex-col">
            <Switch.Label
              as="span"
              className="text-sm font-bold text-gray-900"
              passive
            >
              Dynamic Supply
            </Switch.Label>
            <Switch.Description as="span" className="text-sm text-gray-500">
              Select if you want to be able to mint more tokens after the
              contract is created.
            </Switch.Description>
          </span>
          <Switch
            checked={tokenData.options.dynamicSupply}
            onChange={() =>
              setTokenData({
                ...tokenData,
                options: {
                  ...tokenData.options,
                  dynamicSupply: !tokenData.options.dynamicSupply,
                },
              })
            }
            className={classNames(
              tokenData.options.dynamicSupply ? "bg-indigo-600" : "bg-gray-200",
              "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                tokenData.options.dynamicSupply
                  ? "translate-x-5"
                  : "translate-x-0",
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              )}
            />
          </Switch>
        </Switch.Group>
      </div>
    </form>
  );
};

export default ERC20Form;
