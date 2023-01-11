import Fader from "components/Fader/Fader";
import SubHeading from "components/SubHeading/SubHeading";
import React from "react";
import { ERC721TokenData, TokenData, TokenType } from "types/tokens";
import ERC20Form from "./ERC20Form";
import ERC721Form from "./ERC721Form";
import { ERC20TokenData } from "types/tokens";

const Personalization = ({
  type,
  tokenData,
  setTokenData,
  setStepComplete,
}: {
  type: TokenType;
  tokenData: TokenData;
  setTokenData: (value: TokenData) => void;
  setStepComplete: (value: boolean) => void;
}) => {
  // specify which component to render based on the token type
  const renderComponent = () => {
    switch (type) {
      case TokenType.ERC721:
        return (
          <ERC721Form
            tokenData={tokenData as ERC721TokenData}
            setTokenData={setTokenData}
            setStepComplete={setStepComplete}
          />
        );
      case TokenType.ERC1155:
        return <div>ERC1155</div>;
      case TokenType.ERC20:
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
        <SubHeading>Personalize your token</SubHeading>
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
