import React from 'react';
import { Modal } from 'react-bootstrap';
import Lottie from 'react-lottie';
import sucessLottie from '../assests/json/SuccessAnimation.json';
import errorLottie from '../assests/json/notSuccess.json';

const SuccessModal = ({ showModal, setShowModal, successMessage, error }) => {
  const sucessOptions = {
    loop: true,
    autoplay: true,
    animationData: sucessLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const errorOptions = {
    loop: true,
    autoplay: true,
    animationData: errorLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Body>
        {error === false ? (
          <Lottie options={sucessOptions} height={80} width={80} />
        ) : (
          <Lottie options={errorOptions} height={80} width={80} />
        )}
        <p
          style={{
            fontSize: '18px',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {successMessage}
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
