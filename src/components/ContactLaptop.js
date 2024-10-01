import React from 'react'
import contactus from '../assests/json/ContactUs.json';
import { Container } from 'react-bootstrap';
import Lottie from 'react-lottie';
export const ContactLaptop = () => {
    const options = {
        loop: true,
        autoplay: true,
        animationData: contactus,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      };
  return (
    <Container
    
    className="lottie-animation"
  >
    {' '}
    <Lottie
      options={options}
      height="400px"  
      width="100%" 
    
    />
  </Container>
  )
}
