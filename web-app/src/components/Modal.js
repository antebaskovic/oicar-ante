import React from "react";
import { Modal, Button } from "react-bootstrap";

function CustomModal({
  modalTitle,
  modalBody,
  showModal,
  onModalClose,
  onModalBtnClick,
  modalBtnText,
  delteModal,
}) {
  const handleClose = () => {
    if (onModalClose) {
      onModalClose();
    }
  };

  const handleBtnClick = () => {
    if (onModalBtnClick) {
      onModalBtnClick();
    }
  };

  delteModal = delteModal || false;

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant={delteModal ? "danger" : "primary"}
          onClick={handleBtnClick}
        >
          {modalBtnText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
