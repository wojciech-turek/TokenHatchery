import Input from "components/shared/Input";
import React, { useEffect } from "react";
import { ERC721TokenData, TokenData } from "types/tokens";
import { validateInput, validateNumber } from "./validation";

const ERC721Form = ({
  tokenData,
  setTokenData,
  setStepComplete,
}: {
  tokenData: ERC721TokenData;
  setTokenData: (value: TokenData) => void;
  setStepComplete: (value: boolean) => void;
}) => {
  useEffect(() => {
    if (
      validateInput(tokenData.name) &&
      validateInput(tokenData.symbol) &&
      tokenData.baseURI !== "" &&
      tokenData.extensions?.includes("Public Minting")
        ? validateNumber(tokenData.maxSupply) &&
          BigInt(tokenData.mintPrice) >= BigInt(0)
        : true
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
          <p className="mt-2 text-sm text-gray-500" id="baseURI">
            If you already have your images uploaded to IPFS, you can set the
            base URI here.
          </p>
        </div>
        {tokenData.extensions?.includes("Public Minting") && (
          <div>
            <Input
              type="number"
              name="Max Supply"
              value={tokenData.maxSupply}
              onChange={(e) => {
                setTokenData({
                  ...tokenData,
                  maxSupply: e.target.value.trim(),
                });
              }}
              error={
                tokenData.maxSupply !== "" &&
                !validateNumber(tokenData.maxSupply)
              }
              errorMessage="Max supply must be greater than 0 and a whole number."
            />
            <p className="mt-2 text-sm text-gray-500" id="maxSupply">
              Select the maximum number of tokens that can be minted.
            </p>
          </div>
        )}
        {tokenData.extensions?.includes("Public Minting") && (
          <div>
            <Input
              type="number"
              name="Mint Price"
              value={tokenData.mintPrice}
              onChange={(e) => {
                setTokenData({
                  ...tokenData,
                  mintPrice: e.target.value.trim(),
                });
              }}
              error={
                tokenData.mintPrice !== "" && BigInt(tokenData.mintPrice) < 0n
              }
              errorMessage="Mint price must be 0 or greater and a whole number."
            />
            <p className="mt-2 text-sm text-gray-500" id="mintPrice">
              Select the price for minting a token in wei.
            </p>
          </div>
        )}
      </form>
    </>
  );
};

export default ERC721Form;
