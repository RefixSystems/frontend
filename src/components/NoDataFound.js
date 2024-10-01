import React from 'react';
import nodatafound from '../assests/json/nodatafound.json';
import { Container } from 'react-bootstrap';
import Lottie from 'react-lottie';

const NoDataFound = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: nodatafound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Container
      fluid
      className="w-100 d-flex flex-column justify-content-center align-items-center"
    >
      {' '}
      <Lottie
        options={options}
        height="100%"
        width="100%"
      
      />
    </Container>
  );
};

export default NoDataFound;
