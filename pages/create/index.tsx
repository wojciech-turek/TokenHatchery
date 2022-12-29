import FlexibleContainer from "components/FlexibleContainer/FlexibleContainer";
import styles from "./Create.module.scss";
import React from "react";
import Link from "next/link";
import Heading from "components/Typography/Heading/Heading";
import BodyText from "components/Typography/BodyText/BodyText";
import Container from "components/Container/Container";
import { tokenTypes } from "constants/availableTokenTypes";

const Create = () => {
  return (
    <FlexibleContainer>
      <Container direction="column">
        <Heading centered>Choose your token type</Heading>
        <div className={styles.tokenTypes}>
          {tokenTypes.map((tokenType) => (
            <div className={styles.tokenType} key={tokenType.name}>
              <h2>{tokenType.name}</h2>
              <p>{tokenType.description}</p>
              <BodyText bold>Available extensions:</BodyText>
              <div className={styles.tags}>
                {tokenType.extensions?.map((extension) => (
                  <div className={styles.tag} key={extension.name}>
                    {extension.name}
                  </div>
                ))}
              </div>
              <BodyText bold>Available access control:</BodyText>
              <div className={styles.tags}>
                {tokenType.accessControl?.map((accessControl) => (
                  <div className={styles.tag} key={accessControl}>
                    {accessControl}
                  </div>
                ))}
              </div>
              <p>License: {tokenType.license}</p>
              <div>
                <Link href={tokenType.link}>
                  <button>Create</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Container>
          <BodyText>
            If you require custom built contract with special features,
            <a href="mailto: contact@wojciechturek.com">
              <span style={{ fontWeight: "bold" }}>
                {" "}
                click here to contact us.
              </span>
            </a>
          </BodyText>
        </Container>
      </Container>
    </FlexibleContainer>
  );
};

export default Create;
