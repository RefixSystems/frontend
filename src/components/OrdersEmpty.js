import React from 'react';
import Ordersnotfound from '../assests/json/Noorders.json';
import { Container } from 'react-bootstrap';
import Lottie from 'react-lottie';

const OrdersEmpty = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: Ordersnotfound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Container
      fluid
      className="w-100 d-flex flex-column justify-content-center align-items-center "
    >
      {' '}
      <Lottie
        options={options}
        height="auto"
        width="100%"
        style={{ maxWidth: '600px', maxHeight: '400px',alignItems:'center'}}
      />
    </Container>
  );
};

export default OrdersEmpty ;


