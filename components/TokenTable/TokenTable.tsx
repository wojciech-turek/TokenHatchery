import React, { Fragment, useCallback, useEffect, useState } from "react";
import { classNames } from "utils/client/classNames";
import { TrashIcon } from "@heroicons/react/24/outline";
import useApi from "hooks/useApi";
import { Deployments } from "types/tokens";
import {
  allSupportedNetworks,
  getNetworkImage,
  getNetworkName,
} from "constants/supportedNetworks";
import Image from "next/image";

const TokenTable = ({ address }: { address: string }) => {
  const [contracts, setContracts] = useState<Deployments[]>();
  const { getContractsByAddress } = useApi();

  useEffect(() => {
    const getContracts = async () => {
      if (!address) return;
      const contracts = await getContractsByAddress(address);
      setContracts(contracts);
    };
    getContracts();
  }, [getContractsByAddress, address]);

  return (
    <div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Symbol
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Network
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">View details</span>
                    </th>
                    <th scope="col" className="relative">
                      <span className="sr-only">View details</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {contracts &&
                    contracts.map((contract) => (
                      <Fragment key={contract.type}>
                        <tr className="border-t border-gray-200">
                          <th
                            colSpan={6}
                            scope="colgroup"
                            className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                          >
                            {contract.type}
                          </th>
                        </tr>
                        {contract.deployments.map(
                          (deployment, deploymentIdx) => (
                            <tr
                              key={deployment.address}
                              className={classNames(
                                deploymentIdx === 0
                                  ? "border-gray-300"
                                  : "border-gray-200",
                                "border-t"
                              )}
                            >
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {deployment.name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {deployment.symbol}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex gap-2">
                                <Image
                                  src={getNetworkImage(
                                    deployment.networkChainId
                                  )}
                                  width={20}
                                  height={20}
                                  alt={deployment.name}
                                />
                                {getNetworkName(deployment.networkChainId)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {deployment.address}
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  View details
                                  <span className="sr-only">
                                    , {deployment.name}
                                  </span>
                                </a>
                              </td>
                              <td className="relative whitespace-nowrap text-sm font-medium ">
                                <a
                                  href="#"
                                  className="text-red-600 hover:red-indigo-900"
                                >
                                  <TrashIcon
                                    width={20}
                                    height={20}
                                    className="text-right"
                                  />
                                </a>
                              </td>
                            </tr>
                          )
                        )}
                      </Fragment>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenTable;
