import React from 'react';
import serverError from '../assests/json/ServerError.json';
import { Container } from 'react-bootstrap';
import Lottie from 'react-lottie';

const ServerError = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: serverError,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ textAlign: 'center' }}
    >
      <Lottie options={options} height="40%" width="40%" />
    </Container>
  );
};

export default ServerError;
