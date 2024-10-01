import React, { useState } from 'react';
import { Col, Container, Modal, Button } from 'react-bootstrap';

const testimonials = [
  {
    id: 1,
    image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3530-intel/media-gallery/black/notebook-inspiron-15-3530-nt-plastic-black-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=606&qlt=100,1&resMode=sharp2&size=606,402&chrss=full',
    name: 'Ankita Nath',
    rating: 4.5,
    review: "It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you!",
  },
  {
    id: 2,
    image: '',
    name: 'priya',
    rating: 4.5,
    review: "It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you!",
  },
  
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const { image, name, rating, review } = testimonials[currentIndex];

  return (
    <section className="ezy__testimonial12_1KtWYff9 position-relative">
      <div className="container">
      <Col>
        <h4 className="text-center ">What People says? </h4>
      </Col>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row mt-4">
              <div className="col-md-6 py-md-5">
                <div
                  className="ezy__testimonial12_1KtWYff9-bg-holder h-100"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              </div>
              <div className="col-md-6 pb-4 py-md-5 position-relative">
                <div className="ezy__testimonial12_1KtWYff9-shape"></div>
                <div className="p-4 p-lg-5 mb-4">
                  <h4 className="ezy__testimonial12_1KtWYff9-title fs-4 fw-bold mb-3">{name}</h4>
                  <p className="mb-3 ezy__testimonial11_1KtWYff9-rating">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`fas ${i < Math.floor(rating) ? 'fa-star active' : 'fa-star'} ${
                          i === Math.floor(rating) && rating % 1 !== 0 ? 'fa-star-half-alt active' : ''
                        }`}
                      ></span>
                    ))}
                  </p>
                  <p className="opacity-50 mb-0">
                    {review}
                  </p>
                </div>

                <div className="px-4 px-lg-5 text-end">
                  <button
                    className="ezy__testimonial12_1KtWYff9-control-prev me-3"
                    onClick={handlePrev}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button
                    className="ezy__testimonial12_1KtWYff9-control-next"
                    onClick={handleNext}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
