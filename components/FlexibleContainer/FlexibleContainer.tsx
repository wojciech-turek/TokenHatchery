import React from "react";
import styles from "./FlexibleContainer.module.scss";

const FlexibleContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default FlexibleContainer;
