import React, { useEffect, useState } from 'react';
import { Col, Container, Modal, Button, Row, Card } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { AiOutlineSend } from 'react-icons/ai';
import { Heading } from '../../components/Heading';
import { useNavigate } from 'react-router-dom';
import {
  useAddRepairCartMutation,
  useGetCartQuery,
} from '../../redux/api/UserCartApi';
import SuccessModal from '../../components/SuccessModal';
import BasicButton from '../../components/BasicButton';
import laptop from '../../assests/images/laptopBanner.png';
import SideModal from '../../components/AddToCartModal';
import { addItemToCart, getAllItemsInCart } from '../../utils/CartStorage';
import { useTheme } from '../../Contexts/ThemeContext';
import Paragraph from '../../components/paragraph';
import Price from '../../assests/images/price-tag.png';
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClipboardCheck,
  FaHandshake,
  FaPhoneAlt,
  FaShieldAlt,
  FaTimesCircle,
  FaWrench,
} from 'react-icons/fa';
import Laptop from '../../assests/images/Keyboard.png';
import Desktop from '../../assests/images/desktop-laptop.png';
import Macbook from '../../assests/images/macbook-laptop.png';
import Imac from '../../assests/images/imac-laptop.png';
import { FaRupeeSign, FaTools, FaCheckSquare } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';

const SectionTwo = ({ services = [], banner = [] }) => {
  const { color } = useTheme();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showSModal, setShowSModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [errorLottie, setErrorLottie] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [ServiceCart, { isLoading }] = useAddRepairCartMutation();

  const systemImages = {
    laptop: Laptop,
    desktop: Desktop,
    macbook: Macbook,
    imac: Imac,
  };
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      setPhoneNumber(parsedToken.phoneNumber);
    }
  }, []);

  const {
    data: CartData,
    isLoading: isCartLoading,
    refetch,
  } = useGetCartQuery({
    currentPage: 1,
    phoneNumber,
  });
  useEffect(() => {
    if (phoneNumber) {
      refetch();
    } else {
      const { cart } = getAllItemsInCart();
      setCartItems(cart || []);
    }
  }, [phoneNumber]);
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

  const handleItemClick = (item) => {
    setSelectedService(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

 const handleAddToCart = async (system) => {
  const phoneNumberWithoutPrefix = phoneNumber.replace(/^(\+91)/, '');
  const data = {
    phoneNumber: phoneNumberWithoutPrefix,
    issue: selectedService.serviceName,
    system: system,
    brand: 'Repair',
  };

  try {
    const response = await ServiceCart({ data: data });
    if (response?.data) {
      setShowModal(false);
      setErrorLottie(false);
      setSuccessMessage(response?.data?.message);
      setShowSModal(true);

     
      setTimeout(() => {
        setShowSModal(false);
        setShowCartModal(true);
        refetch();
      }, 5000); 

    } else {
      setShowModal(false);
      setErrorLottie(true);
      setSuccessMessage(response?.error?.data.error);
      setShowSModal(true);
      setTimeout(() => {
        setShowSModal(false);
      }, 4000);
    }
  } catch (error) {
    console.error(error);
    setShowModal(false);
  } finally {
    setTimeout(() => {
      setShowSModal(false);
    }, 4000);
  }
};


  const handleAddToLocalCart = (system) => {
    const phoneNumberWithoutPrefix = phoneNumber.replace(/^(\+91)/, '');
    const data = {
      phoneNumber: phoneNumberWithoutPrefix,
      issue: selectedService.serviceName,
      system: system,
      type: 'Repair',
      brand: 'Repair',
    };
    try {
      const { status, message, cart, error } = addItemToCart(data);
      if (status === 200) {
        setErrorLottie(false);
        setSuccessMessage(message);
        setShowModal(false);
        setShowSModal(true);
        setShowCartModal(true);
        setCartItems(cart);
        setTimeout(() => {
          setShowModal(false);
        }, 4000);
      } else {
        setErrorLottie(true);
        setSuccessMessage(message);
        setShowModal(false);
        setShowSModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 4000);
      }
    } catch (error) {
      console.error(error);
      setShowModal(false);
    } finally {
      setTimeout(() => {
        setShowSModal(false);
      }, 4000);
    }
  };

  const warrantyContent = [
    {
      heading: 'Free & No Questions Asked Warranty',
      definition:
        'Refix Systems provides a free, no-questions-asked warranty on all repairs, including spare parts.',
      icon: <FaWrench size={20} />,
    },
    {
      heading: '100% Warranty Coverage',
      definition:
        'Enjoy 100% coverage for repair costs, labor charges, and any additional fees.',
      icon: <FaShieldAlt size={20} />,
    },
  
  ];

  const quoteVerificationContent = [
    {
      heading: 'Verified Repair Quote',
      definition:
        'A professional provides a verified repair quote based on a fixed rate card after conducting a checkup.',
      icon: <FaClipboardCheck size={20} />,
    },
    {
      heading: 'Accept and Start Repair',
      definition:
        'If you accept the quote, the professional will begin the repair immediately.',
      icon: <FaHandshake size={20} />,
    },
    {
      heading: 'Talk to an Expert',
      definition:
        "If you're unsure about the quote, you can talk to a Refix System expert for free advice and clarification.",
      icon: <FaPhoneAlt size={20} />,
    },
  ];

  const exclusionsContent = [
    {
      definition:
        'Any new issues occurring after repair in parts that were not repaired by Refix systems.',
      icon: <FaTimesCircle size={20} />,
    },
    {
      definition:
        'Spare parts not purchased from Refix Systems are not covered under the warranty.',
      icon: <FaTimesCircle size={20} />,
    },
  ];

  const warrantyPeriodContent = [
    {
      definition: '180 days warranty on all repairs.',
      icon: <FaCalendarAlt size={20} />,
    },
    {
      definition:
        '5 days warranty on servicing and minor repairs that do not require any spare parts.',
      icon: <FaCalendarAlt size={20} />,
    },
  ];

  return (
    <>
      {services.length > 0 ? (
        <Container fluid className="mt-5">
          <Col>
            <Heading>Most booked Services</Heading>
          </Col>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            arrows={false}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            className="mt-4"
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center justify-content-center text-center p-3"
              >
                <div
                  className="d-flex flex-row align-items-center justify-content-center border pointer p-3 image-container"
                  style={{ width: '250px', height: '50px' }}
                  onClick={() => handleItemClick(service)}
                >
                  <AiOutlineSend size={30} className="me-2" />
                  <span className="text-nowrap">{service.serviceName}</span>
                </div>
              </div>
            ))}
          </Carousel>
        </Container>
      ) : null}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedService?.serviceName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row
            className="d-flex justify-content-center align-items-center"
            style={{
              maxHeight: '350px',
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
          >
            {banner.length > 0 && (
              <img
                src={banner[0].image}
                alt="Banner"
                className="my-2"
                style={{
                  maxHeight: '200px',
                  maxWidth:'100%',
                  height: '100%',
                  width: '100%',
                  objectFit: 'contain',
                }}
              />
            )}{' '}
            {selectedService?.applicableSystems?.length > 0 ? (
              selectedService.applicableSystems.map((system, index) => (
                <Col md={12} key={index}>
                  <div className="card shadow-sm border-2 m-1">
                    <div>
                      <Row className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center">
                        <Col
                          xs={12}
                          md={12}
                          lg={4}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <h5 className="text-center">{system}</h5>
                        </Col>
                        <Col
                          xs={12}
                          md={12}
                          lg={8}
                          className="text-md-end order-md-2 text-center"
                        >
                          <div className="applicable-image-container my-2 text-center">
                            <img
                              src={systemImages[system.toLowerCase()]}
                              alt={system}
                              width={70}
                              height={70}
                              className="img-fluid"
                            />
                            <div
                              className="d-flex flex-row justify-content-center align-items-center mx-2"
                              style={{ cursor: 'pointer' }}
                            >
                              <BasicButton
                                type="submit"
                                className="bg-main px-2 py-1"
                                label="Add to cart"
                                onClick={() =>
                                  phoneNumber.length > 0
                                    ? handleAddToCart()
                                    : handleAddToLocalCart()
                                }
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <>
                <div className="mx-2 my-2">
                  <BasicButton
                    type="submit"
                    className="bg-main w-100 px-2 py-1"
                    label="Add to cart"
                    onClick={() =>
                      phoneNumber.length > 0
                        ? handleAddToCart()
                        : handleAddToLocalCart()
                    }
                  />
                </div>
              </>
            )}
            <div className="mx-2">
              <div className="container card mt-2">
                <div className="d-flex text-center align-items-center m-3">
                  <FaCheckSquare color="green" />
                  <h6 className="mb-0 ">Notes</h6>
                </div>
                <div className="m-3">
                  <FaRupeeSign size={18} style={{ fontSize: '16px' }} />{' '}
                  <span>
                    The initial amount(without GST) you've paid will be deducted
                    from the total amount.
                  </span>
                  <br></br>
                  <br></br>
                  <FaTools size={18} style={{ fontSize: '16px' }} />{' '}
                  <span>
                    Spare parts and repair costs will be charged separately.
                  </span>
                </div>
              </div>
              <div className="container card mt-2">
                <h5 className="text-center mt-3">
                  How Refix Systems Warranty Works
                </h5>

                {/* Warranty Highlights */}
                <ul className="list-unstyled mt-4">
                  {warrantyContent.map((item, index) => (
                    <React.Fragment key={index}>
                      <h6 className="text-center">{item.heading}</h6>
                      <li className="d-flex">
                        <p className="me-2">{item.icon}</p>
                        <span>{item.definition}</span>
                      </li>
                      <hr
                        style={{
                          border: '1px solid black',
                          width: '100%',
                        }}
                      />
                    </React.Fragment>
                  ))}
                </ul>
              </div>

              <div className="container card mt-3">
                <h5 className="text-center mt-3">
                  How Quote Verification Works
                </h5>

                {/* Quote Verification Process */}
                <ul className="list-unstyled mt-4">
                  {quoteVerificationContent.map((item, index) => (
                    <React.Fragment key={index}>
                      <h6 className="text-center">{item.heading}</h6>
                      <li className="d-flex">
                        <p className="me-2">{item.icon}</p>
                        <span>{item.definition}</span>
                      </li>
                      <hr
                        style={{
                          border: '1px solid black',
                          width: '100%',
                        }}
                      />
                    </React.Fragment>
                  ))}
                </ul>
              </div>

              <div className="container card mt-3">
                <h5 className="text-center mt-3">
                  What Isn't Covered in Refix System Warranty
                </h5>

                {/* Exclusions List */}
                <ul className="list-unstyled">
                  {exclusionsContent.map((item, index) => (
                    <React.Fragment key={index}>
                      <h6 className="text-center">{item.heading}</h6>
                      <li className="d-flex">
                        <p className="me-2">{item.icon}</p>
                        <span>{item.definition}</span>
                      </li>
                      <hr
                        style={{
                          border: '1px solid black',
                          width: '100%',
                        }}
                      />
                    </React.Fragment>
                  ))}
                </ul>
              </div>

              <div className="container card my-3">
                <h5 className="text-center mt-3">
                  How is Warranty Period Calculated?
                </h5>

                {/* Warranty Period Details */}
                <ul className="list-unstyled">
                  {warrantyPeriodContent.map((item, index) => (
                    <React.Fragment key={index}>
                      <h6 className="text-center">{item.heading}</h6>
                      <li className="d-flex">
                        <p className="me-2">{item.icon}</p>
                        <span>{item.definition}</span>
                      </li>
                      <hr
                        style={{
                          border: '1px solid black',
                          width: '100%',
                        }}
                      />
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            </div>
          </Row>

          <Col className="my-1 orangecolor">
            <div
              className="price-list-container mt-2"
              onClick={() => navigate('/price-chart')}
            >
              <span style={{ fontSize: '18px', fontWeight: 'bolder' }}>
                Price History
              </span>
              <span className="arrow">
                <MdKeyboardArrowRight size={30} />
              </span>
            </div>
          </Col>
        </Modal.Body>
      </Modal>
 <SideModal
        showCartModal={showCartModal}
        handleCloseCartModal={() => setShowCartModal(false)}
         cartItems={phoneNumber ? CartData?.data || [] : cartItems}
      />
      {/* Side Modal Component */}
      {/* <SideModal
        show={showCartModal}
        onClose={handleCloseCartModal}
        cartItems={phoneNumber ? CartData?.data || [] : cartItems}
      /> */}

      <SuccessModal
        showModal={showSModal}
        setShowModal={setShowSModal}
        successMessage={successMessage}
        error={errorLottie}
      />
    </>
  );
};

export default SectionTwo;
