import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FiCheckCircle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import OtpInput from "react-otp-input";
import { useRouter } from "next/navigation";

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

const OTPModal = ({
  modalIsOpen,
  setModalIsOpen,
}: {
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
}) => {
  const router = useRouter();

  const [otp, setOtp] = useState("");

  const handleOtpChange = (otp: React.SetStateAction<string>) => {
    setOtp(otp);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(otp); // Here you would handle the OTP input, like sending it to a server
    // Close the modal after submitting
    setModalIsOpen(false);
    router.push("/setpin", { scroll: false });
  };

  const handleResendOTP = () => {
    console.log("Resend OTP");
    // Logic to handle OTP resend
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="OTP Verification"
      style={customStyles}
      overlayClassName="modal-backdrop"
    >
      <div className="flex flex-col justify-between gap-8 ">
        <>
          <button onClick={closeModal} className="absolute top-0 right-0 m-2">
            <IoClose size={24} />
          </button>
          <h2 className="text-lg font-semibold mb-4 px-24 text-center text-black drop border-[#828282]">
            Enter OTP Digits
          </h2>
        </>
        <div className="flex justify-center w-full">
          <OtpInput
            value={otp}
            inputStyle={{
              width: "3rem",
              height: "3rem",
              fontSize: "1rem",
              borderRadius: 4,
            }}
            onChange={handleOtpChange}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                className="border border-[#828282] py-2 mx-2 rounded-md bg-white text-black"
              />
            )}
          />
        </div>
        <div className="flex flex-col">
          <button
            className="text-[#4F4F4F] hover:text-blue-700 mt-4"
            onClick={handleResendOTP}
          >
            Resend OTP
          </button>
          <button
            className="bg-button-blue-bg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleSubmit}
          >
            Verify
          </button>
          <div />
        </div>
      </div>
    </Modal>
  );
};

export default OTPModal;
