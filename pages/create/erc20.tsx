import React, { useState } from "react";
import Accordion from "components/Accordion/Accordion";
import Container from "components/Container/Container";
import ExtensionSelect from "components/ExtensionSelect/ExtensionSelect";
import FlexibleContainer from "components/FlexibleContainer/FlexibleContainer";
import NetworkSelect from "components/NetworkSelect/NetworkSelect";
import BodyText from "components/Typography/BodyText/BodyText";
import Heading from "components/Typography/Heading/Heading";
import WalletConnect from "components/WalletConnect/WalletConnect";
import { erc20Extensions, accessControl } from "constants/availableTokenTypes";
import Form from "components/Form/Form";
import Input from "components/Input/Input";
import ContractDeploy from "components/ContractDeploy/ContractDeploy";

const Erc20 = () => {
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<string>("");
  const [tokenDecimals, setTokenDecimals] = useState<string>("18");
  const [deployedToken, setDeployedToken] = useState({
    address: "",
    id: "",
  });
  const [connectionEstablished, setConnectionEstablished] =
    useState<boolean>(false);

  const [selectedExtensions, setSelectedExtensions] = useState<string[]>([]);
  const [managementType, setManagementType] = useState<string>("Ownable");

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
              controlTypes={accessControl}
              setManagementType={setManagementType}
              managementType={managementType}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Personalize</Accordion.Header>
          <Accordion.Body
            canMoveNext={
              tokenName !== "" &&
              tokenSymbol !== "" &&
              tokenSupply !== "" &&
              tokenDecimals !== ""
            }
          >
            <Form>
              <Input
                name="tokenName"
                label="Token Name:"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                type="text"
              />
              <Input
                name="tokenSymbol"
                label="Token Symbol:"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                type="text"
              />
              <Input
                name="tokenDecimals"
                label="Token Decimals:"
                value={tokenDecimals}
                onChange={(e) => setTokenDecimals(e.target.value)}
                type="number"
              />
              <Input
                name="tokenSupply"
                label="Initial Supply:"
                value={tokenSupply}
                onChange={(e) => setTokenSupply(e.target.value)}
                type="number"
              />
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Deploy to network</Accordion.Header>
          <Accordion.Body>
            <ContractDeploy
              type="erc20"
              tokenData={{
                name: tokenName,
                symbol: tokenSymbol,
                decimals: tokenDecimals,
                initialSupply: tokenSupply,
              }}
              extensions={selectedExtensions}
              managementType={managementType}
              setDeployedToken={setDeployedToken}
              deployedToken={deployedToken}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Verify your contract (optional)</Accordion.Header>
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
