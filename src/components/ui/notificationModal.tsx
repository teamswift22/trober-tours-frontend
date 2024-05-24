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
    backgroundColor: "white",
  },
};

const NotificationModal = ({
  modalIsOpen,
  setModalIsOpen,
}: {
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
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
      <div className="flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold mb-4">
          Send Notification to Participants
        </h2>
        <div className="mb-10 w-full">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message
          </label>
          <textarea
            placeholder="Input message here"
            // TODO:Check how to handle this
            className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={() => {
            closeModal();
          }}
          className="bg-button-blue-bg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Done
        </button>
      </div>
    </Modal>
  );
};

export default NotificationModal;
