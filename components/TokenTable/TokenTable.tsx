import React, { Fragment } from "react";
import { classNames } from "utils/client/classNames";
import { getNetworkImage, getNetworkName } from "constants/supportedNetworks";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { useGetContracts } from "hooks/useGetContracts";

const TokenTable = ({ address }: { address: string }) => {
  const { data, isLoading } = useGetContracts(address);

  return (
    <div className="relative">
      <motion.div
        className="relative top-12 left-0 w-full h-full lg:top-48"
        initial={{ opacity: 1, x: 0, y: 0 }}
        animate={{ opacity: isLoading ? 1 : 0, x: isLoading ? 0 : -20, y: 0 }}
        transition={{
          duration: 0.3,
        }}
      >
        <div className="animate-pulse">
          <div className="flex justify-center items-center">
            <div className="text-xl font-medium text-gray-700 text-center">
              <p>Your tokens are loading...</p>
            </div>
          </div>
        </div>
      </motion.div>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
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
                          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                          Symbol
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                          Network
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          className="hidden relative py-3.5 pl-3 pr-4 sm:pr-6 sm:table-cell"
                        ></th>
                        <th scope="col" className="relative"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {data?.map((contract) => (
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
                          {contract.deployments.length === 0 && (
                            <tr className="border-t border-gray-200">
                              <td
                                colSpan={6}
                                scope="colgroup"
                                className="px-4 py-2 text-left text-sm text-center text-gray-900 sm:px-6"
                              >
                                <FolderOpenIcon
                                  className="inline-block w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="inline-block pl-2 relative top-0.5">
                                  No tokens found
                                </span>
                              </td>
                            </tr>
                          )}
                          {contract.deployments.map(
                            (deployment, deploymentIdx) => (
                              <tr
                                key={deployment._id}
                                className={classNames(
                                  deploymentIdx === 0
                                    ? "border-gray-300"
                                    : "border-gray-200",
                                  "border-t "
                                )}
                              >
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {deployment.name}{" "}
                                  <span className="inline-block sm:hidden">
                                    {deployment.symbol && (
                                      <span className="text-gray-500">
                                        ({deployment.symbol})
                                      </span>
                                    )}
                                  </span>
                                  <dl className="font-normal lg:hidden">
                                    <dt className="sr-only">Title</dt>
                                    <dd className="mt-1 text-gray-700">
                                      <div className="flex gap-2 items-center">
                                        <Image
                                          src={getNetworkImage(
                                            deployment.networkChainId
                                          )}
                                          width={20}
                                          height={20}
                                          alt={deployment.name}
                                        />

                                        {getNetworkName(
                                          deployment.networkChainId
                                        )}
                                      </div>
                                    </dd>
                                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                      {deployment.address}
                                    </dd>
                                    <Link
                                      href={`/manage/${deployment.address}`}
                                      className="text-indigo-700 font-bold hover:text-indigo-900 cursor-pointer inline-block sm:hidden"
                                    >
                                      View
                                    </Link>
                                  </dl>
                                </td>
                                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                  {deployment.symbol}
                                </td>
                                <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-500 lg:table-cell">
                                  <div className="flex gap-2 items-center">
                                    <Image
                                      src={getNetworkImage(
                                        deployment.networkChainId
                                      )}
                                      width={20}
                                      height={20}
                                      alt={deployment.name}
                                    />

                                    {getNetworkName(deployment.networkChainId)}
                                  </div>
                                </td>
                                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                  {deployment.address}
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
        </motion.div>
      )}
    </div>
  );
};

export default TokenTable;
