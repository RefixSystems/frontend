import React from 'react';
import { Container } from 'react-bootstrap';
import { RotatingLines } from 'react-loader-spinner'; 
import loader from '../assests/images/loader.gif';

const FetchLoader = () => {
  return (
    <Container className="vh-100 d-flex flex-column justify-content-center align-items-center">
      {/* Add your GIF image below */}
      <img 
        src={loader} 
        alt="Loading..." 
        style={{ width: '150px', height: '150px' }} 
      />
      {/* Optional: Use a text loader if needed */}
      <div className="text mt-3">Loading ...</div>
    </Container>
  );
};

export default FetchLoader;
