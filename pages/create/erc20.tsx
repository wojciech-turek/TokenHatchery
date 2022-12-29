import React, { useState } from "react";
import Accordion from "components/Accordion/Accordion";
import Container from "components/Container/Container";
import ExtensionSelect from "components/ExtensionSelect/ExtensionSelect";
import FlexibleContainer from "components/FlexibleContainer/FlexibleContainer";
import NetworkSelect from "components/NetworkSelect/NetworkSelect";
import BodyText from "components/Typography/BodyText/BodyText";
import Heading from "components/Typography/Heading/Heading";
import WalletConnect from "components/WalletConnect/WalletConnect";
import { erc20Extensions } from "constants/availableTokenTypes";

const Erc20 = () => {
  const [connectionEstablished, setConnectionEstablished] =
    useState<boolean>(false);

  const [selectedExtensions, setSelectedExtensions] = useState<string[]>([]);

  const handleConnected = (val: boolean) => {
    setConnectionEstablished(val);
  };

  return (
    <FlexibleContainer>
      <Heading>ERC20 Creator</Heading>
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>
            Connect your wallet and select network
          </Accordion.Header>
          <Accordion.Body canMoveNext={connectionEstablished}>
            <p>Chose one of the methods below to connect your wallet</p>
            <WalletConnect />
            <NetworkSelect setConnected={handleConnected} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Select extensions</Accordion.Header>
          <Accordion.Body canMoveNext={true}>
            <ExtensionSelect
              extensions={erc20Extensions}
              setSelectedExtensions={setSelectedExtensions}
              selectedExtensions={selectedExtensions}
            />
          </Accordion.Body>
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
      <Container>
        <BodyText>
          Do you have any suggestions or feedback to improve this tool?{" "}
          <a href="mailto: contact@wojciechturek.com">
            <span style={{ fontWeight: "bold" }}>
              Click here to contact us.
            </span>
          </a>
        </BodyText>
      </Container>
    </FlexibleContainer>
  );
};

export default Erc20;
