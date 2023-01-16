import React from "react";
import { useRouter } from "next/router";
import { truncateAddress } from "utils/client/truncateAddress";
import ERC20 from "models/ERC20Contract";
import ERC721 from "models/ERC721Contract";
import ERC1155 from "models/ERC1155Contract";
import { NextPageContext } from "next";
import connectMongo from "lib/mongodb";
import { getRelativeTime } from "utils/client/relativeTime";
import { getNetworkName } from "constants/supportedNetworks";
import { formatEther } from "ethers/lib/utils.js";
import { CheckIcon, WrenchIcon } from "@heroicons/react/24/outline";
import { classNames } from "utils/client/classNames";

interface TokenPageProps {
  name: string;
  symbol: string;
  creator: string;
  extensions: string[];
  managementType: string;
  baseURI: string;
  verified: boolean;
  createdAt: string;
  networkChainId: number;
  maxSupply: number;
  mintPrice: number;
}

const TokenPage = ({
  name,
  symbol,
  creator,
  extensions,
  managementType,
  baseURI,
  verified,
  createdAt,
  networkChainId,
  maxSupply,
  mintPrice,
}: TokenPageProps) => {
  const router = useRouter();
  const { tokenType, address } = router.query as {
    tokenType: string;
    address: string;
  };

  const tokenData = [
    {
      label: "Creator",
      value: truncateAddress(creator),
    },
    {
      label: "Created",
      value: getRelativeTime(createdAt),
    },
    {
      label: "Network",
      value: getNetworkName(networkChainId),
    },
    {
      label: "Management Type",
      value: managementType,
    },
    {
      label: "Verified",
      value: verified ? "Yes" : "No",
    },
    maxSupply && {
      label: "Max Supply",
      value: maxSupply,
    },
    mintPrice && {
      label: "Mint Price",
      value: formatEther(mintPrice),
    },
    baseURI && {
      label: "Base URI",
      value: baseURI,
    },
  ];

  const actions = [
    {
      icon: CheckIcon,
      name: "Mint new token",
      description: "Mint a new token for this contract",
      href: "#",
      iconForeground: "text-teal-700",
      iconBackground: "bg-teal-50",
    },
    {
      icon: WrenchIcon,
      name: "Edit contract settings",
      description: "Mint a new token for this contract",
      href: "#",
      iconForeground: "text-orange-700",
      iconBackground: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-full">
      <div className="bg-gradient-to-r py-8 from-sky-800 to-cyan-600 pb-24" />
      <div className="-mt-24 pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* Main 4 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-3">
              {/* Welcome panel */}
              <section aria-labelledby="profile-overview-title">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="bg-white p-6 border-b-4 border-sky-800">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div className="sm:flex sm:space-x-5">
                        <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                          <p className="text-sm font-medium text-gray-600">
                            {tokenType}
                          </p>
                          <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                            {name} ({symbol}) - {truncateAddress(address)}
                          </p>
                          <p className="text-sm font-medium text-gray-600">
                            {extensions.length > 0
                              ? extensions.join(", ")
                              : "No extensions"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Actions panel */}
              <section aria-labelledby="quick-links-title">
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
                  {actions.map((action) => (
                    <div
                      key={action.name}
                      className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500 hover:bg-gray-50"
                    >
                      <div>
                        <span
                          className={classNames(
                            action.iconBackground,
                            action.iconForeground,
                            "rounded-lg inline-flex p-3 ring-4 ring-white"
                          )}
                        >
                          <action.icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="mt-8">
                        <h3 className="text-lg font-medium">
                          <a href={action.href} className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            {action.name}
                          </a>
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {action.description}
                        </p>
                      </div>
                      <span
                        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                        aria-hidden="true"
                      >
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
              </section>
              <section aria-labelledby="quick-links-title">
                <div className="overflow-hidden rounded-lg bg-white shadow sm:grid sm:grid-cols-3 sm:gap-px sm:divide-y-0">
                  <div className="p-4">
                    <h2 className="text-xl font-medium text-gray-900 mb-4">
                      Tokens
                    </h2>
                  </div>
                </div>
              </section>
            </div>
            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              {/* Actions */}
              <section aria-labelledby="recent-hires-title">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <h2
                      className="text-base font-bold text-gray-900"
                      id="recent-hires-title"
                    >
                      Contract Information
                    </h2>
                    <div className="mb-6 flow-root">
                      <ul role="list" className="divide-y divide-gray-200">
                        <div className="mt-6 grid grid-cols-1 gap-4">
                          {tokenData.map((data) => {
                            if (!data) return null;
                            return (
                              <div
                                className="flex flex-col grow gap-2"
                                key={data.label}
                              >
                                <p className="text-sm font-bold text-gray-600">
                                  {data.label}
                                </p>
                                <p className="truncate text-sm font-medium text-gray-600">
                                  {data.value}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPage;

export async function getServerSideProps(context: NextPageContext) {
  const { tokenType, address } = context.query;
  await connectMongo();

  let contractDetails;
  const selectedData = [
    "name",
    "symbol",
    "creator",
    "extensions",
    "managementType",
    "baseURI",
    "verified",
    "createdAt",
    "networkChainId",
    "maxSupply",
    "mintPrice",
  ];

  switch (tokenType) {
    case "ERC20":
      contractDetails = await ERC20.findOne({ address }).select(selectedData);
      break;
    case "ERC721":
      contractDetails = await ERC721.findOne({ address }).select(selectedData);
      break;
    case "ERC1155":
      contractDetails = await ERC1155.findOne({ address }).select(selectedData);
      break;
  }
  if (!contractDetails) return { notFound: true };

  return {
    props: {
      id: contractDetails._id.toHexString(),
      name: contractDetails.name,
      symbol: contractDetails.symbol,
      extensions: contractDetails.extensions,
      creator: contractDetails.creator,
      managementType: contractDetails.managementType,
      baseURI: contractDetails.baseURI || null,
      verified: contractDetails.verified,
      createdAt: contractDetails.createdAt.toISOString(),
      networkChainId: contractDetails.networkChainId,
      maxSupply: contractDetails.maxSupply || null,
      mintPrice: contractDetails.mintPrice || null,
    },
  };
}
