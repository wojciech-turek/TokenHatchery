import classNames from "classnames";
import React from "react";
import styles from "./Heading.module.scss";

const Heading = ({
  children,
  centered,
}: {
  children: React.ReactNode;
  centered?: boolean;
}) => {
  return (
    <h2
      className={classNames(styles.heading, {
        [styles.centered]: centered,
      })}
    >
      {children}
    </h2>
  );
};

export default Heading;
