import React from "react";
import styles from "./Heading.module.scss";

const Heading = ({ children }: { children: string }) => {
  return <h2 className={styles.heading}>{children}</h2>;
};

export default Heading;
