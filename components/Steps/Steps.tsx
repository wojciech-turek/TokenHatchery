import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Step } from "types/minting";
import { allSupportedNetworks } from "constants/supportedNetworks";
import { useNetwork } from "wagmi";
import { classNames } from "utils/client/classNames";

const Steps = ({
  steps,
  handleStepChange,
}: {
  steps: Step[];
  handleStepChange: (step: number) => void;
}) => {
  const { chain } = useNetwork();

  const verifiable = allSupportedNetworks.find(
    (network) => network.chainId === chain?.id
  )?.verifiable;

  return (
    <nav aria-label="Progress" className="mt-6">
      <ol
        role="list"
        className="divide-y divide-gray-300 rounded-md border bg-white border-gray-300 md:flex md:divide-y-0 display-none hidden md:block "
      >
        {steps.map((step, stepIdx) => (
          <li
            key={step.title}
            className={classNames(
              stepIdx === steps.length - 1 && !verifiable
                ? "opacity-30 pointer-events-none"
                : "",
              "relative md:flex md:flex-1 cursor-pointer"
            )}
            onClick={() => handleStepChange(stepIdx)}
          >
            {step.status === "complete" ? (
              <div className="group flex w-full items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                    <CheckIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900">
                    {step.title}
                  </span>
                </span>
              </div>
            ) : step.status === "current" ? (
              <div
                className="flex items-center px-6 py-4 text-sm font-medium"
                aria-current="step"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                  <span className="text-indigo-600">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-indigo-600">
                  {step.title}
                </span>
              </div>
            ) : (
              <div className="group flex items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                    <span className="text-gray-500 group-hover:text-gray-900">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                    {step.title}
                  </span>
                </span>
              </div>
            )}
            {stepIdx !== steps.length - 1 ? (
              <>
                <div
                  className="absolute top-0 right-0 hidden h-full w-5 md:block"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Steps;
