import React from "react";
import {
  CloudArrowUpIcon,
  PencilIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Upload Images",
    description:
      "Upload your images to the IPFS network and get a unique hash for each of them using services like Pinata or Infura.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Add custom characteristics",
    description:
      "Add custom characteristics to your NFTs, such as rarity, color, traits or any other information you want to add.",
    icon: PencilIcon,
  },
  {
    name: "Release your collection",
    description:
      "Release your collection to the blockchain and start selling your NFTs to the world on the marketplace of your choice.",
    icon: PaperAirplaneIcon,
  },
];

const NFTCollections = () => {
  return (
    <div className="relative bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-semibold text-indigo-600">
          Go to market faster
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everything you need to become a successful NFT creator
        </p>
        <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
          If you are an artist, musician, or creator of any kind, you can now
          create, sell, and manage your NFTs on the blockchain. We provide
          everything you need to get started and grow.
        </p>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-xl bg-indigo-500 p-3 shadow-lg">
                        <feature.icon
                          className="h-8 w-8 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base leading-7 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCollections;
