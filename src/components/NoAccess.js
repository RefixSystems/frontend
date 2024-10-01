import React from 'react';
import noAccess from '../assests/json/noAccess.json';
import { Container } from 'react-bootstrap';
import Lottie from 'react-lottie';
import { getRole } from '../Constants/Global';

const NoAccess = () => {
  const role = getRole();
  const options = {
    loop: true,
    autoplay: true,
    animationData: noAccess,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Container
      fluid
      className="w-100 d-flex flex-column justify-content-center align-items-center vh-100"
    >
      {' '}
      <Lottie
        options={options}
        height="50%"
        width="50%"
      />
      <p
        style={{
          fontSize: '22px',
          fontWeight: 'bold',
        }}
        className="text-center main m-2"
      >
        {`No Access For ${role}`}
      </p>
    </Container>
  );
};

export default NoAccess;
