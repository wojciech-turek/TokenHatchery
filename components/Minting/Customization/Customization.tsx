import Fader from "components/Fader/Fader";
import SubHeading from "components/SubHeading/SubHeading";
import React from "react";
import {
  ERC1155TokenData,
  ERC721TokenData,
  TokenData,
  ContractType,
} from "types/tokens";
import ERC20Form from "./ERC20Form";
import ERC721Form from "./ERC721Form";
import { ERC20TokenData } from "types/tokens";
import ERC1155Form from "./ERC1155Form";

const Personalization = ({
  type,
  tokenData,
  setTokenData,
  setStepComplete,
}: {
  type: ContractType;
  tokenData: TokenData;
  setTokenData: (value: TokenData) => void;
  setStepComplete: (value: boolean) => void;
}) => {
  const renderComponent = () => {
    switch (type) {
      case ContractType.ERC721:
        return (
          <ERC721Form
            tokenData={tokenData as ERC721TokenData}
            setTokenData={setTokenData}
            setStepComplete={setStepComplete}
          />
        );
      case ContractType.ERC1155:
        return (
          <ERC1155Form
            tokenData={tokenData as ERC1155TokenData}
            setTokenData={setTokenData}
            setStepComplete={setStepComplete}
          />
        );
      case ContractType.ERC20:
        return (
          <ERC20Form
            tokenData={tokenData as ERC20TokenData}
            setTokenData={setTokenData}
            setStepComplete={setStepComplete}
          />
        );
      default:
        return <div>Something went wrong here!</div>;
    }
  };

  return (
    <Fader>
      <div>
        <SubHeading>Customize your token</SubHeading>
        <p className="text-sm font-medium text-gray-700 mb-12">
          Specify your tokens details, such as name, symbol and other token
          specific information.
        </p>
        {renderComponent()}
      </div>
    </Fader>
  );
};

export default Personalization;
