import React, { useEffect, useMemo, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Step } from "types/minting";
import { allSupportedNetworks } from "constants/supportedNetworks";
import { useNetwork } from "wagmi";
import { classNames } from "utils/client/classNames";
import Button from "components/shared/Button";
import { useRouter } from "next/router";

const Steps = ({
  steps,
  children,
  currentStep,
  setCurrentStep,
  canMoveNext,
}: {
  steps: Step[];
  children: React.ReactNode;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  canMoveNext: boolean;
}) => {
  const [allSteps, setAllSteps] = useState<Step[]>(steps);
  const [isLastStep, setIsLastStep] = useState(false);
  const [hasVerification, setHasVerification] = useState(true);
  const router = useRouter();
  const { chain } = useNetwork();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const handleStepChange = (step: number) => {
    if (steps[step].status === "upcoming") return;
    scrollToTop();
    setCurrentStep(step);
  };

  useEffect(() => {
    const verifiable =
      allSupportedNetworks.find((network) => network.chainId === chain?.id)
        ?.verifiable || false;
    setHasVerification(verifiable);
    if (currentStep === steps.length - 2 && !verifiable) {
      setIsLastStep(true);
    } else if (currentStep === steps.length - 1) {
      setIsLastStep(true);
    } else {
      setIsLastStep(false);
    }
  }, [currentStep, steps.length, chain?.id]);

  const goToManagePage = () => {
    router.push("/manage");
  };

  const nextStep = () => {
    scrollToTop();
    setAllSteps((prev) => {
      const newSteps = [...prev];
      newSteps[currentStep].status = "complete";
      newSteps[currentStep + 1].status = "current";
      return newSteps;
    });

    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="overflow-hidden rounded-lg bg-gray-50 shadow p-4 mt-6">
      <nav aria-label="Progress" className="mt-6">
        <ol
          role="list"
          className="divide-y divide-gray-300 rounded-md border bg-white border-gray-300 md:flex md:divide-y-0 display-none hidden md:block "
        >
          {allSteps.map((step, stepIdx) => (
            <li
              key={step.title}
              className={classNames(
                stepIdx === steps.length - 1 && !hasVerification
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
      <div className="mt-12 px-0 lg:px-4">{children}</div>
      <div className="mt-12">
        <Button
          disabled={!canMoveNext}
          onClick={isLastStep ? goToManagePage : () => nextStep()}
        >
          {isLastStep ? "Go to manage page" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default Steps;
