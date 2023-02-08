import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Input from "components/shared/Input";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { ERC721ContractData, TokenData } from "types/tokens";
import { classNames } from "utils/client/classNames";
import { validateInput, validateNumber, validateURL } from "./validation";
import { erc20ABI } from "@wagmi/core";
import { useContractReads } from "wagmi";
import { SectionHeader } from "./SectionHead";

const mintPermissions = [
  {
    id: 1,
    title: "Only admin",
    description:
      "Creating new tokens will be restricted to the admin only, you will be able to upload images and metadata for each new token individually",
    value: false,
  },
  {
    id: 2,
    title: "Public Minting",
    description:
      "If you have a collection and want to allow anyone to mint new tokens for free or for a fee, you can enable public minting",
    value: true,
  },
];

const tokenPaymentOptions = [
  {
    id: 1,
    title: "Native Currency",
    value: false,
    description:
      "The minting fee will be paid in the native network currency (ETH, BNB, MATIC, etc.)",
  },
  {
    id: 2,
    title: "Custom ERC20 Token",
    value: true,
    description:
      "The minting fee will be paid in a custom token (DAI, USDC, etc.)",
  },
];

const ERC721Form = ({
  tokenData,
  setTokenData,
  setStepComplete,
}: {
  tokenData: ERC721ContractData;
  setTokenData: (value: TokenData) => void;
  setStepComplete: (value: boolean) => void;
}) => {
  const contractData = useContractReads({
    contracts: [
      {
        address: ethers.utils.isAddress(
          tokenData.options.customPaymentTokenData.address
        )
          ? tokenData.options.customPaymentTokenData.address
          : "",
        abi: erc20ABI,
        functionName: "decimals",
      },
      {
        address: ethers.utils.isAddress(
          tokenData.options.customPaymentTokenData.address
        )
          ? tokenData.options.customPaymentTokenData.address
          : "",
        abi: erc20ABI,
        functionName: "symbol",
      },
    ],
    onSuccess(data) {
      if (!data[0] || !data[1]) return;
      setTokenData({
        ...tokenData,
        options: {
          ...tokenData.options,
          customPaymentTokenData: {
            ...tokenData.options.customPaymentTokenData,
            decimals: data[0].toString(),
            symbol: data[1],
          },
        },
      });
    },
  });

  useEffect(() => {
    if (
      !validateInput(tokenData.name) ||
      !validateInput(tokenData.symbol) ||
      (tokenData.options.publicMinting && tokenData.baseURI === "") ||
      (tokenData.options.customPaymentToken &&
        (tokenData.options.customPaymentTokenData.address === "" ||
          tokenData.options.customPaymentTokenData.symbol === "" ||
          tokenData.options.customPaymentTokenData.decimals === ""))
    ) {
      setStepComplete(false);
    } else {
      setStepComplete(true);
    }
  }, [tokenData, setStepComplete]);

  return (
    <>
      <SectionHeader>Basic Information</SectionHeader>
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <Input
            type="text"
            name="name"
            value={tokenData.name}
            subtext="Name of your token, usually 3-16 characters."
            onChange={(e) => {
              setTokenData({ ...tokenData, name: e.target.value.trim() });
            }}
            error={tokenData.name !== "" && !validateInput(tokenData.name)}
            errorMessage="Name must be between 2 and 16 characters and contain only letters."
          />
        </div>
        <div>
          <Input
            type="text"
            name="symbol"
            value={tokenData.symbol}
            subtext="Symbol of your token, usually 3-4 characters."
            onChange={(e) => {
              setTokenData({ ...tokenData, symbol: e.target.value.trim() });
            }}
            error={tokenData.symbol !== "" && !validateInput(tokenData.symbol)}
            errorMessage="Symbol must be between 2 and 10 characters and contain only letters."
          />
        </div>
      </div>
      <div>
        <SectionHeader>Minting Settings</SectionHeader>
        <RadioGroup
          value={mintPermissions.find(
            (permission) => permission.value === tokenData.options.publicMinting
          )}
          onChange={(option) => {
            setTokenData({
              ...tokenData,
              baseURI: "",
              options: {
                publicMinting: option.value,
                customPaymentToken: false,
                customPaymentTokenData: {
                  address: "",
                  symbol: "",
                  decimals: "",
                },
                mintFee: "",
                maxSupply: "",
                walletLimit: "",
              },
            });
          }}
        >
          <RadioGroup.Label className="text-base font-medium text-gray-900">
            Select a mint persmission
          </RadioGroup.Label>

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
            {mintPermissions.map((mintPermission) => (
              <RadioGroup.Option
                key={mintPermission.id}
                value={mintPermission}
                className={({ checked, active }) =>
                  classNames(
                    checked ? "border-transparent" : "border-gray-300",
                    active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                    "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                  )
                }
              >
                {({ checked, active }) => (
                  <>
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <RadioGroup.Label
                          as="span"
                          className="block text-sm font-bold text-gray-900"
                        >
                          {mintPermission.title}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className="mt-1 flex items-center text-sm text-gray-500"
                        >
                          {mintPermission.description}
                        </RadioGroup.Description>
                      </span>
                    </span>
                    <CheckCircleIcon
                      className={classNames(
                        !checked ? "invisible" : "",
                        "h-5 w-5 text-indigo-600"
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        active ? "border" : "border-2",
                        checked ? "border-indigo-500" : "border-transparent",
                        "pointer-events-none absolute -inset-px rounded-lg"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        <motion.div
          initial={{ height: 0, overflow: "hidden", opacity: 0 }}
          animate={{
            height: tokenData.options.publicMinting ? "auto" : 0,
            opacity: tokenData.options.publicMinting ? 1 : 0,
            overflow: "hidden",
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="mt-6 grid sm:grid-cols-2 gap-y-6 sm:gap-x-8 pl-0.5">
            <div>
              <Input
                type="text"
                name="BaseURI*"
                value={tokenData.baseURI}
                placeholder="https://example.com/"
                subtext="Base URI for your token metadata, e.g. https://example.com/. Required field."
                onChange={(e) => {
                  setTokenData({
                    ...tokenData,
                    baseURI: e.target.value.trim(),
                  });
                }}
                error={
                  tokenData.baseURI !== "" && !validateURL(tokenData.baseURI)
                }
                errorMessage={
                  tokenData.options.publicMinting && tokenData.baseURI === ""
                    ? "Base URI is required for public minting"
                    : "Base URI must be a valid URL ending with a trailing slash, e.g. https://example.com/"
                }
              />
            </div>
            <div>
              <Input
                type="number"
                name="Mint Price"
                value={tokenData.options.mintFee}
                disabled={!tokenData.options.publicMinting}
                subtext="Select the price for minting a token in wei. Leave blank for free minting."
                onChange={(e) => {
                  setTokenData({
                    ...tokenData,
                    options: {
                      ...tokenData.options,
                      mintFee: e.target.value.trim(),
                    },
                  });
                }}
                error={
                  tokenData.options.mintFee !== "" &&
                  !validateNumber(tokenData.options.mintFee)
                }
                errorMessage="Mint price must be 0 or greater and a whole number."
              />
            </div>
            <div>
              <Input
                type="number"
                name="Max Supply"
                value={tokenData.options.maxSupply}
                disabled={!tokenData.options.publicMinting}
                subtext="Select the maximum number of tokens that can be minted. Leave blank for unlimited supply."
                onChange={(e) => {
                  setTokenData({
                    ...tokenData,
                    options: {
                      ...tokenData.options,
                      maxSupply: e.target.value.trim(),
                    },
                  });
                }}
                error={
                  tokenData.options.maxSupply !== "" &&
                  !validateNumber(tokenData.options.maxSupply)
                }
                errorMessage="Max supply must be greater than 0 and a whole number. "
              />
            </div>
            <div>
              <Input
                type="number"
                name="Limit per wallet"
                value={tokenData.options.walletLimit}
                disabled={!tokenData.options.publicMinting}
                subtext="Maximum amount of tokens a single wallet can mint. Leave blank for unlimited."
                onChange={(e) => {
                  setTokenData({
                    ...tokenData,
                    options: {
                      ...tokenData.options,
                      walletLimit: e.target.value,
                    },
                  });
                }}
                error={
                  tokenData.options.walletLimit !== "" &&
                  !validateNumber(tokenData.options.walletLimit)
                }
                errorMessage="Limit per wallet must be greater than 0 and a whole number."
              />
            </div>
          </div>
          <RadioGroup
            value={tokenPaymentOptions.find(
              (option) => option.value === tokenData.options.customPaymentToken
            )}
            onChange={(option) =>
              setTokenData({
                ...tokenData,
                options: {
                  ...tokenData.options,
                  customPaymentToken: option.value,
                  customPaymentTokenData: {
                    address: "",
                    symbol: "",
                    decimals: "",
                  },
                },
              })
            }
            disabled={!tokenData.options.publicMinting}
            className={classNames(
              !tokenData.options.publicMinting ? "opacity-50" : "",
              "mt-6 pl-0.5"
            )}
          >
            <RadioGroup.Label className="text-base font-medium text-gray-900">
              Select a mint token type
            </RadioGroup.Label>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
              {tokenPaymentOptions.map((paymentOption) => (
                <RadioGroup.Option
                  key={paymentOption.id}
                  value={paymentOption}
                  className={({ checked, active }) =>
                    classNames(
                      checked ? "border-transparent" : "border-gray-300",
                      active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                      "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                    )
                  }
                >
                  {({ checked, active }) => (
                    <>
                      <span className="flex flex-1">
                        <span className="flex flex-col">
                          <RadioGroup.Label
                            as="span"
                            className="block text-sm font-bold text-gray-900"
                          >
                            {paymentOption.title}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 flex items-center text-sm text-gray-500"
                          >
                            {paymentOption.description}
                          </RadioGroup.Description>
                        </span>
                      </span>
                      <CheckCircleIcon
                        className={classNames(
                          !checked ? "invisible" : "",
                          "h-5 w-5 text-indigo-600"
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          active ? "border" : "border-2",
                          checked ? "border-indigo-500" : "border-transparent",
                          "pointer-events-none absolute -inset-px rounded-lg"
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <motion.div
            initial={{ height: 0, overflow: "hidden", opacity: 0 }}
            animate={{
              height: tokenData.options.customPaymentToken ? "auto" : 0,
              opacity: tokenData.options.customPaymentToken ? 1 : 0,
              overflow: "hidden",
            }}
            transition={{ duration: 0.2 }}
            className="mt-6 grid gap-y-6 sm:grid-cols-2 sm:gap-x-8 pl-0.5"
          >
            <div>
              <Input
                type="text"
                name="Token Address*"
                value={tokenData.options.customPaymentTokenData.address}
                disabled={
                  !tokenData.options.publicMinting ||
                  !tokenData.options.customPaymentToken
                }
                subtext="Address of the token to be used for minting fees."
                onChange={(e) => {
                  setTokenData({
                    ...tokenData,
                    options: {
                      ...tokenData.options,
                      customPaymentTokenData: {
                        ...tokenData.options.customPaymentTokenData,
                        address: e.target.value.trim(),
                        decimals: "",
                        symbol: "",
                      },
                    },
                  });
                }}
                error={
                  (tokenData.options.customPaymentToken &&
                    tokenData.options.customPaymentTokenData.address === "") ||
                  !ethers.utils.isAddress(
                    tokenData.options.customPaymentTokenData.address
                  ) ||
                  contractData?.data?.[0] === null ||
                  contractData?.data?.[1] === null
                }
                errorMessage={
                  tokenData.options.customPaymentTokenData.address === ""
                    ? "This field cannot be empty."
                    : contractData.isSuccess &&
                      contractData.data !== undefined &&
                      (contractData.data[0] === null ||
                        contractData.data[1] === null)
                    ? "Cannot find token with this address."
                    : "Invalid address."
                }
              />
            </div>
            <div>
              <Input
                type="text"
                name="Symbol"
                value={tokenData.options.customPaymentTokenData.symbol}
                disabled
                subtext="Symbol of the token to be used for minting fees."
                onChange={(e) => {
                  setTokenData({
                    ...tokenData,
                    options: {
                      ...tokenData.options,
                      customPaymentTokenData: {
                        ...tokenData.options.customPaymentTokenData,
                        symbol: e.target.value.trim(),
                      },
                    },
                  });
                }}
              />
            </div>
            <div>
              <Input
                type="number"
                name="Decimals"
                value={tokenData.options.customPaymentTokenData.decimals}
                disabled
                subtext="Amount of decimals the token has."
                onChange={(e) => {
                  setTokenData({
                    ...tokenData,
                    options: {
                      ...tokenData.options,
                      customPaymentTokenData: {
                        ...tokenData.options.customPaymentTokenData,
                        decimals: e.target.value,
                      },
                    },
                  });
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ERC721Form;
