import FlexibleContainer from "components/FlexibleContainer/FlexibleContainer";
import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <FlexibleContainer>
        <div className={styles.content}>
          Author of this website is not responsible for any tokens created by
          the users.
        </div>
      </FlexibleContainer>
    </footer>
  );
};

export default Footer;
