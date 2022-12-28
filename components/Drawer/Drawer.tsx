import React from "react";
import styles from "./Drawer.module.scss";
import classNames from "classnames";
import Backdrop from "components/Backdrop/Backdrop";

const Drawer = ({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <div
        className={classNames(styles.drawer, {
          [styles.open]: open,
        })}
      >
        {children}
      </div>
      <Backdrop onClick={handleClose} visible={open} />
    </div>
  );
};

export default Drawer;
