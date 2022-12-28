import classNames from "classnames";
import React from "react";
import styles from "./Backdrop.module.scss";

const Backdrop = ({
  onClick,
  visible,
}: {
  onClick: () => void;
  visible: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={classNames(styles.backdrop, {
        [styles.active]: visible,
      })}
    />
  );
};

export default Backdrop;
