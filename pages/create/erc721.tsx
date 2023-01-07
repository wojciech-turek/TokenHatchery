import Container from "components/Container/Container";
import PageHeading from "components/shared/PageHeading/PageHeading";
import Steps from "components/Steps/Steps";
import React from "react";

const Erc721 = () => {
  return (
    <Container>
      <PageHeading>ERC721 Creator</PageHeading>
      <div className="overflow-hidden rounded-lg bg-gray-50 shadow p-4 mt-6">
        {/* <Steps steps={steps} handleStepChange={handleStepChange} /> */}
        <div className="mt-12 px-0 lg:px-4">
          {/* {stepComponents[currentStep].body} */}
        </div>
      </div>
    </Container>
  );
};

export default Erc721;
