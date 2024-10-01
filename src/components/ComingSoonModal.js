import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Lottie from 'lottie-react';
import WorkInProcess from '../assests/json/WorkInProcess.json';
import Paragraph from './paragraph';
import { useTheme } from '../Contexts/ThemeContext';

const ComingSoonModal = ({ show, handleClose, text }) => {
  const { color } = useTheme();
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        className="border-0 "
        closeButton
        style={{ color: 'white' }}
        color="white"
      ></Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
        <Lottie
          loop={true}
          animationData={WorkInProcess}
          style={{ width: 300, height: 300, padding: 0, margin: 0 }}
        />
        <Paragraph
          color={color}
          fontSize={'30px'}
          fontWeight={800}
          className="text-center"
        >
          {text}
        </Paragraph>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ComingSoonModal;
