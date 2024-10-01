import React, { useState } from 'react';

import { Card, Container, Row, Col } from 'react-bootstrap';

import ReviewCard from '../../components/ReviewCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import login from '../../assests/images/loginImage.svg';
import Reach from '../../assests/images/Reach.webp';
import Book from '../../assests/images/Book.webp';
import Repair from '../../assests/images/Repair.webp';
import BookService from '../../assests/images/BookService.webp';
import Delivery from '../../assests/images/Delivery.webp';
import Paragraph from '../../components/paragraph';
import BasicButton from '../../components/BasicButton';
import RunningImages from '../../components/RunningImages';
import ComingSoonModal from '../../components/ComingSoonModal';
import { useNavigate } from 'react-router-dom';
import PriceandComparison from '../Priceandcomparison/PriceandComparison';

const SectionFour = ({ reviews, brands, repair_service = false }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [modalText, setModalText] = useState('');

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const handleShow = (text) => {
    setModalText(text);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  return (
    <Container fluid className="mt-5  ">
      {reviews.length > 0 ? (
        <>
          <h4 className="text-center ">Words from our Customers</h4>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            arrows={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            className="mt-4 "
          >
            {reviews.map((review, index) => (
              <div key={index} className="mx-3 mb-4 ">
                <ReviewCard {...review} />
              </div>
            ))}
          </Carousel>
        </>
      ) : (
        <></>
      )}
      <h4 className="text-center mt-5 ">How Does It Works?</h4>
     
     <Row className="justify-content-center py-3 text-center">
  <Col xs={4} sm={4} md={2} className="m-1 custom-col">
    <Card.Img
      alt="book"
      src={Book}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  </Col>
  <Col xs={4} sm={4} md={2} className="m-1 custom-col">
    <Card.Img
      alt="repair"
      src={Repair}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  </Col>
  <Col xs={4} sm={4} md={2} className="m-1 custom-col">
    <Card.Img
      alt="reach"
      src={Reach}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  </Col>
  <Col xs={4} sm={4} md={2} className="m-1 custom-col">
    <Card.Img
      src={BookService}
      alt="bookService"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  </Col>
  <Col xs={4} sm={4} md={2} className="m-1 custom-col">
    <Card.Img
      src={Delivery}
      alt="delivery"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  </Col>
</Row>


    
      <h4 className="text-center mt-5 ">
        Looking to get your laptop repair at home?
      </h4>
      <Col>
        <Col className="d-flex flex-row flex-wrap gap-1 justify-content-between align-items-center mt-4">
          <Col
            xs={12}
            md={5}
            lg={5}
            xl={5}
            className="justify-content-start  align-items-center"
          >
            <Paragraph>
              Are you tired of dealing with the hassle of taking your laptop to
              a repair shop? Do you need a convenient and reliable solution to
              get your laptop fixed without leaving the comfort of your home?
              Our at-home laptop repair service is here to help!
            </Paragraph>
          </Col>

          <Col
            xs={12}
            md={5}
            lg={5}
            xl={5}
            className="justify-content-end  align-items-center "
          >
            <img
              className="img-fluid bg-main d-flex ml-10 mt-md-4 justify-content-center align-items-center"
              src={login}
              alt="adminLoginImage"
              style={{ height: '160px', width: '100%' }}
            />
          </Col>
        </Col>
        <Col
          className={
            'd-flex align-items-center justify-content-center my-4 mt-5'
          }
        >
          {repair_service ? (
            <BasicButton
              label="Book a home repair service now"
              onClick={() => navigate('/repair-service')}
            />
          ) : (
            <></>
          )}
        </Col>
      </Col>
      {brands.length > 0 ? (
        <>
          <h4 className="text-center mt-5 mb-4  ">
            Exclusive Laptop Repair Service Center for  the below Brands
          </h4>
          {brands ? <RunningImages brandImages={brands} /> : <></>}
          <ComingSoonModal
            show={show}
            handleClose={handleClose}
            text={modalText}
          />
        </>
      ) : (
        <></>
      )}
      <PriceandComparison/>
    </Container>
  );
};

export default SectionFour;
