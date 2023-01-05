import Fader from "components/Fader/Fader";
import Button from "components/shared/Button";
import SubHeading from "components/SubHeading/SubHeading";
import React, { Dispatch, SetStateAction } from "react";
import { BaseTokenData } from "types/tokens";

const Personalization = ({
  nextStep,
  tokenData,
  setTokenData,
}: {
  nextStep: () => void;
  tokenData: BaseTokenData;
  setTokenData: Dispatch<SetStateAction<BaseTokenData>>;
}) => {
  return (
    <Fader>
      <div>
        <SubHeading>Personalize your token</SubHeading>
        <p className="text-sm font-medium text-gray-700 mb-12">
          Give your token its own custom name, symbol amount of decimals and
          specify the initial supply. Those values{" "}
          <span className="font-bold">cannnot</span> be changed after contract
          deployment.
        </p>
        <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold text-gray-700"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                value={tokenData.name}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) => {
                  setTokenData({ ...tokenData, name: e.target.value });
                }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Will be used as the name of your token and the contract name.
            </p>
          </div>
          <div>
            <label
              htmlFor="symbol"
              className="block text-sm font-bold text-gray-700"
            >
              Symbol
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="symbol"
                id="symbol"
                value={tokenData.symbol}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) => {
                  setTokenData({ ...tokenData, symbol: e.target.value });
                }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500" id="symbol">
              Short name of your token, usually 3-4 characters.
            </p>
          </div>
          <div>
            <label
              htmlFor="decimals"
              className="block text-sm font-bold text-gray-700"
            >
              Decimals
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="decimals"
                id="decimals"
                value={tokenData.decimals}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) => {
                  setTokenData({
                    ...tokenData,
                    decimals: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500" id="decimals">
              Number of decimals your token will have. The default is 18.
            </p>
          </div>
          <div>
            <label
              htmlFor="supply"
              className="block text-sm font-bold text-gray-700"
            >
              Initial supply
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="supply"
                id="supply"
                value={tokenData.initialSupply}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) => {
                  setTokenData({ ...tokenData, initialSupply: e.target.value });
                }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500" id="supply">
              Amount of tokens to be minted at the time of token creation. The
              tokens will be minted to the deployers address.
            </p>
          </div>
        </form>

        <div className="mt-12">
          <Button
            disabled={
              tokenData.name === "" ||
              tokenData.symbol === "" ||
              tokenData.initialSupply === "" ||
              tokenData.decimals === ""
            }
            onClick={() => nextStep()}
          >
            Continue
          </Button>
        </div>
      </div>
    </Fader>
  );
};

export default Personalization;
