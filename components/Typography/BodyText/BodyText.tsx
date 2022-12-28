import classNames from "classnames";
import React from "react";
import styles from "./BodyText.module.scss";

const BodyText = ({
  children,
  bold = false,
}: {
  children: React.ReactNode;
  bold?: boolean;
}) => {
  return (
    <div
      className={classNames(styles.bodyText, {
        [styles.bold]: bold,
      })}
    >
      {children}
    </div>
  );
};

export default BodyText;
