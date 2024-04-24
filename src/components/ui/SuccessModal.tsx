import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FiCheckCircle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import OtpInput from "react-otp-input";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    backgroundColor: "#E8F6FD",
  },
};

const SuccessModal = ({
  modalIsOpen,
  setModalIsOpen,
  setOTPModalIsOpen,
}: {
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  setOTPModalIsOpen: (value: boolean) => void;
}) => {
  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Success Modal"
      style={customStyles}
      overlayClassName="modal-backdrop" // Use your styles for backdrop
    >
      <button onClick={closeModal} className="absolute top-0 right-0 m-2">
        <IoClose size={24} />
      </button>
      <div className="flex flex-col items-center justify-center px-[15%]">
        <FiCheckCircle size={60} className="text-green-500 mx-auto my-4" />
        <h2 className="text-xl font-bold mb-4">Successful</h2>
        <p className="mb-6 text-sm text-center">
          You have joined our waitlist, we will alert you when we launch
        </p>
        <button
          onClick={() => {
            closeModal();
            setOTPModalIsOpen(true);
          }}
          className="bg-button-blue-bg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Done
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
