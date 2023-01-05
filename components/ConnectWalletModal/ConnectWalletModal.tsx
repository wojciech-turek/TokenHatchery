import Modal from "components/Modal/Modal";
import React from "react";

const ConnectWalletModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal show={show} onClose={onClose} title="Select and connect wallet">
      ConnectWalletModal
    </Modal>
  );
};

export default ConnectWalletModal;
