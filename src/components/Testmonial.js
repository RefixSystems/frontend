import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = ({ images }) => {
  return (
    <Carousel>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            src={image}
            alt={`Slide ${index}`}
            className="d-block w-100"
            style={{ height: '300px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
