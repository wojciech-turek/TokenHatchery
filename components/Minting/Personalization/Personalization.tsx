import Fader from "components/Fader/Fader";
import Input from "components/shared/Input";
import SubHeading from "components/SubHeading/SubHeading";
import React, { useEffect } from "react";
import { TokenData, TokenType } from "types/tokens";

const Personalization = ({
  tokenData,
  setTokenData,
  setStepComplete,
}: {
  tokenData: TokenData;
  setTokenData: (value: TokenData) => void;
  setStepComplete: (value: boolean) => void;
}) => {
  useEffect(() => {
    if (
      (tokenData.type === TokenType.ERC20 &&
        tokenData.name !== "" &&
        tokenData.symbol !== "" &&
        tokenData.initialSupply !== "" &&
        tokenData.decimals !== "" &&
        validateInput(tokenData.name) &&
        validateInput(tokenData.symbol) &&
        validateNumber(tokenData.initialSupply) &&
        validateNumber(tokenData.decimals)) ||
      tokenData.type === TokenType.ERC721
    ) {
      setStepComplete(true);
    } else {
      setStepComplete(false);
    }
  }, [tokenData, setStepComplete]);

  const validateInput = (val: string) => {
    if (val === "") return true;
    const value = val.trim();
    const regex = /^[a-zA-Z]{2,10}$/;
    return regex.test(value);
  };

  const validateNumber = (val: string | undefined) => {
    if (val === "") return true;
    const value = Number(val);
    return Number.isInteger(value) && value > 0;
  };

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
            <Input
              type="text"
              name="name"
              value={tokenData.name}
              onChange={(e) => {
                setTokenData({ ...tokenData, name: e.target.value.trim() });
              }}
              error={!validateInput(tokenData.name)}
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
              error={!validateInput(tokenData.symbol)}
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
              error={!validateNumber(tokenData.decimals)}
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
              error={!validateNumber(tokenData.initialSupply)}
              errorMessage="Initial supply must be greater than 0 and a whole number."
            />

            <p className="mt-2 text-sm text-gray-500" id="supply">
              Amount of tokens to be minted at the time of token creation. The
              tokens will be minted to the deployers address.
            </p>
          </div>
        </form>
      </div>
    </Fader>
  );
};

export default Personalization;
