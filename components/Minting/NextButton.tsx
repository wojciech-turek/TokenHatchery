import React, { useMemo } from "react";
import { mintingSteps } from "constants/mintingSteps";
import Button from "components/shared/Button";
import { useRouter } from "next/router";
import { useNetwork } from "wagmi";
import { allSupportedNetworks } from "constants/supportedNetworks";

export function NextButton({
  stepComplete,
  currentStep,
  moveToNextStep,
}: {
  stepComplete: boolean;
  currentStep: number;
  moveToNextStep: () => void;
}) {
  const { chain } = useNetwork();
  const router = useRouter();

  const currentNetwork = useMemo(
    () => allSupportedNetworks.find((network) => network.chainId === chain?.id),
    [chain?.id]
  );

  const goToManagePage = () => {
    router.push("/manage");
  };

  return (
    <div className="mt-12">
      <Button
        disabled={!stepComplete}
        onClick={
          mintingSteps.length - 1 === currentStep ||
          (currentStep === mintingSteps.length - 2 &&
            !currentNetwork?.verifiable)
            ? goToManagePage
            : () => moveToNextStep()
        }
      >
        {mintingSteps.length - 1 === currentStep ||
        (currentStep === mintingSteps.length - 2 && !currentNetwork?.verifiable)
          ? "Go to manage page"
          : "Continue"}
      </Button>
    </div>
  );
}
