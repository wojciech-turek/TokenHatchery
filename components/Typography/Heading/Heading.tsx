import classNames from "classnames";
import React from "react";
import styles from "./Heading.module.scss";

const Heading = ({
  children,
  centered,
  type = "h4",
}: {
  children: React.ReactNode;
  centered?: boolean;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  return (
    <div
      className={classNames(styles.heading, {
        [styles.centered]: centered,
      })}
    >
      {React.createElement(type, {}, children)}
    </div>
  );
};

export default Heading;
