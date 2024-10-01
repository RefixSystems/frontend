import React, { useState } from 'react';
import {
  Container,
  Col,
  Modal,
  ModalBody,
  Image,
  Card,
  Row,
  Button,
} from 'react-bootstrap';
import {
  FaUsers,
  FaDollarSign,
  FaCheckCircle,
  FaSmile,
  FaClock,
  FaToolbox,
  FaUserCheck,
  FaHeadset,
  FaCopy,
} from 'react-icons/fa';
import { Heading } from '../../components/Heading';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { truncateText } from '../../Constants/constant';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../Contexts/ThemeContext';
import Qulaity from '../../assests/images/quality_assurance.png';
import Experienced from '../../assests/images/experienced_professinals.png';
import Customer from '../../assests/images/customer_satisfaction.png';
import Support from '../../assests/images/support.png';
const SectionThree = ({ coupons }) => {
  const { color } = useTheme();
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);
  const [couponDetails, setCouponDetails] = useState({});
  const responsives = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const reasons = [
    {
      image: Experienced,
      text: 'Experienced Professionals',
      link: '/about-us',
    },
    // {
    //   icon: <FaDollarSign size={30} className="me-2" color={color} />,
    //   text: 'Transparent Pricing',
    //   link: '/price-comparison',
    // },
    {
      image: Qulaity,
      text: 'Quality Service',
      link: '/services',
    },
    {
      image: Customer,
      text: 'Customer Satisfaction',
      link: '/reviews',
    },
    // {
    //   icon: <FaClock size={30} className="me-2" color={color} />,
    //   text: 'Timely Delivery',
    //   link: '/price-comparison',
    // },
    // {
    //   icon: <FaToolbox size={30} className="me-2" color={color} />,
    //   text: 'Wide Range of Solutions',
    //   link: '/',
    // },
    // {
    //   icon: <FaUserCheck size={30} className="me-2" color={color} />,
    //   text: 'Personalized Approach',
    //   link: '/contact-us',
    // },
    {
      image: Support,
      text: 'Reliable Support',
      link: '/contact-us',
    },
  ];

  const copyToClipboard = (textToCopy) => {
    // Create a temporary input element
    const el = document.createElement('textarea');
    el.value = textToCopy;

    // Make it hidden
    el.style.position = 'absolute';
    el.style.left = '-9999px';

    // Append the textarea element to the body
    document.body.appendChild(el);

    // Select the text inside the textarea
    el.select();

    // Copy to clipboard
    document.execCommand('copy');

    // Remove the textarea from the body
    document.body.removeChild(el);
    toast.success('Code copied to clipboard: ' + textToCopy, {
      position: 'bottom-center', // Set position to bottom center
      autoClose: 1000, // Set auto close time to 1 second
    });
  };
  return (
    <Container fluid className="mt-5">
      <Col>
        <h4 className="text-center mb-3">Why You Should Choose Us?</h4>
      </Col>

      <Row className="mt-4">
        <Carousel
          responsive={responsives}
          infinite={true}
          autoPlay={true}
          arrows={false}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          indicators={false}
        >
          {reasons.map((reason, index) => (
            <Col
              key={index}
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <Link
                key={index}
                to={reason.link}
                className="d-flex flex-column border p-2 align-items-center justify-content-center pointer image-container my-3 mx-3 "
                style={{ textDecoration: 'none' }}
              >
                <Image src={reason.image} width="100%" height="270px" />
                <span className="mt-3 mb-3 text-dark">{reason.text}</span>
              </Link>
            </Col>
          ))}
        </Carousel>
      </Row>

      {/* <div className="d-flex flex-wrap justify-content-center align-items-center text-center px-3  mt-4">
        {reasons.map((point, index) => (
          <Card>
            <Link
              key={index}
              to={point.link}
              className="d-flex flex-column border p-2 align-items-center justify-content-center pointer image-container my-3 mx-3 "
              style={{ textDecoration: 'none' }}
            >
              {point.icon}
              <span className="text-wrap text-dark ">{point.text}</span>
            </Link>
          </Card>
        ))}
      </div> */}

      {coupons.length > 0 && (
        <>
          <Col className="mt-5">
            <Heading>Coupon's for you</Heading>
          </Col>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            arrows={false}
            autoPlaySpeed={2000}
            keyBoardControl={true}
          >
            {coupons.map((item, index) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center justify-content-center text-center p-3"
              >
                <div
                  className="d-flex align-items-center justify-content-start border pointer p-1"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '15px',
                  }}
                  onClick={() => {
                    setCouponDetails(item);
                    setShowTerms(true);
                  }}
                >
                  <Image
                    src={item.image}
                    width={50}
                    height={50}
                    alt={`${item.title}'s profile`}
                    className="m-2"
                  />
                  <div className="text-start d-flex flex-column">
                    <span
                      className="text-wrap"
                      style={{ fontWeight: 'bolder', fontSize: '18px' }}
                    >
                      {truncateText(item.title, 20)}
                    </span>
                    <span
                      style={{ fontSize: '15px' }}
                      className="text-nowrap text-secondary"
                    >
                      USE {item.code}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </>
      )}

      <Modal
        show={showTerms}
        onHide={() => {
          setShowTerms(false);
          setCouponDetails({});
        }}
        centered
      >
        <Modal.Header
          closeButton
          className="mx-2 mt-2 text-wrap"
          style={{ fontSize: '22px' }}
        >
          <Modal.Title>
          {couponDetails.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          <div className="text-center">
            <Image
              src={couponDetails.image}
              width={150}
              height={150}
              alt={`${couponDetails.title}'s profile`}
              className="me-2 text-center"
            />
          </div>
          <hr className="my-4" style={{ width: '100%' }} />
          <span
            style={{ fontSize: '15px' }}
            className="text-wrap text-secondary my-4"
          >
            {couponDetails.description}
          </span>
          <div className="d-flex justify-content-between m-2">
            {' '}
            <div>
              <span
                style={{ fontSize: '22px', color: color }}
                className="text-nowrap"
              >
                {couponDetails.code}
              </span>
            </div>
            <div
              className=" d-flex align-items-center gap-2 pointer"
              onClick={() => copyToClipboard(couponDetails.code)}
            >
              <FaCopy color="grey" size={22} />
            </div>
          </div>
          <hr className="my-4" style={{ width: '100%' }} />
          <h5 style={{ fontSize: '22px', color: color }}>
            Terms and Conditions
          </h5>
          <ul>
            <li>Offer will be applicable automatically.</li>
            <li>This offer cannot be combined with other coupons.</li>
            <li>Offer will be applicable on selected items.</li>
            <li>
              Offer is only valid on{' '}
              <span style={{ fontSize: '18px', color: color }}>
                {couponDetails.applicable}
              </span>
              .
            </li>
            <li>
              Offer valid till{' '}
              <span style={{ fontSize: '18px', color: color }}>
                {couponDetails.endDate}.
              </span>
            </li>
          </ul>
          
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SectionThree;
