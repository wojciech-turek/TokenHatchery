import Accordion from "components/Accordion/Accordion";
import FlexibleContainer from "components/FlexibleContainer/FlexibleContainer";
import Heading from "components/Typography/Heading/Heading";
import React from "react";

const Erc20 = () => {
  return (
    <FlexibleContainer>
      <Heading>ERC20 Creator</Heading>
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>
            Connect your wallet and select network
          </Accordion.Header>
          <Accordion.Body>
            <p>Chose one of the methods below to connect your wallet</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Select extensions</Accordion.Header>
          <Accordion.Body>Body1</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Personalize</Accordion.Header>
          <Accordion.Body>Body1</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Deploy to network</Accordion.Header>
          <Accordion.Body>Body1</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </FlexibleContainer>
  );
};

export default Erc20;
