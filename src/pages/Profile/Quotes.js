import React, { useState, useEffect } from 'react';
import { useGetViewMyQuotesQuery } from '../../redux/api/AuthApi';
import { Container, Card, Col, Row, Button, Modal } from 'react-bootstrap';
import FetchLoader from '../../components/FetchLoader';
import { Heading } from '../../components/Heading';
import Laptop from '../../assests/images/laptop.webp';
import CustomPagination from '../../components/CustomPagination';
import Lottie from 'react-lottie';
import QuotesNotFound from '../../assests/json/QuotesNoData.json';
import { useTheme } from '../../Contexts/ThemeContext';
import Paragraph from '../../components/paragraph';
import { BsChevronDown } from 'react-icons/bs';
import { truncateText } from '../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import { FaCircle, FaStar } from 'react-icons/fa';
const Quotes = () => {
  const { color } = useTheme();
  const navigate = useNavigate();
  const [laptop, setLaptop] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [similarProduct, setSimilarProduct] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const { data: QuotesData, isLoading } = useGetViewMyQuotesQuery({
    phoneNumber: phoneNumber,
    page: currentPage,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      setPhoneNumber(parsedToken.phoneNumber);
    }
  }, []);

  useEffect(() => {
    if (QuotesData && QuotesData.data) {
      setLaptop(QuotesData.data);
      setSimilarProduct(QuotesData.youMayLikeProducts);
    }

    if (QuotesData && QuotesData.pagination) {
      setTotalPage(QuotesData.pagination.totalPages);
      setTotalItems(QuotesData.pagination.totalItems);
      setCurrentPage(currentPage);
    }
  }, [QuotesData, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 1);
  };

  const extractDate = (dateTimeString) => {
    const datePart = dateTimeString.split(' ')[0];
    const [year, month, day] = datePart.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleChevronClick = (laptop) => {
    setSelectedActivity(laptop);
    setShowAddressModal(true);
  };

  const handleCloseModal = () => {
    setShowAddressModal(false);
    setSelectedActivity(null);
  };

  const options = {
    loop: true,
    autoplay: true,
    animationData: QuotesNotFound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const navigateToRentDetails = (productDetails) => {
    navigate('/rent/rent-details', {
      state: { laptop: productDetails, similarProduct },
    });
  };

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center mt-4">
          <Heading>Quotes Details</Heading>
        </Row>
        {isLoading ? (
          <FetchLoader />
        ) : laptop.length > 0 ? (
          laptop.map((laptop, idx) => (
            <Row className="justify-content-center mt-4" key={idx}>
              <Col md={12} sm={12}>
                <Row className="justify-content-center mt-4" key={laptop._id}>
                  <Col md={12} lg={12}>
                    <Card>
                      <Card.Body>
                        <Row className="d-flex justify-content-between ">
                          <Col xs={12} md={3} lg={3} className="mt-1">
                            <span className="d-md-block">
                              <strong>Order Date: </strong>
                            </span>
                            <span className="custom-span">
                              {extractDate(laptop.createdAt)}
                            </span>
                          </Col>

                          <Col xs={12} md={3} lg={3} className="mt-1 ">
                            <span>
                              <strong>Ship To:</strong>{' '}
                            </span>
                            <span className="d-md-block custom-span">
                              {laptop.userName}
                              <BsChevronDown
                                onClick={() => handleChevronClick(laptop)}
                                style={{
                                  cursor: 'pointer',
                                  marginLeft: '1px',
                                }}
                              />
                            </span>
                          </Col>

                          <Col
                            xs={12}
                            md={3}
                            lg={3}
                            className="mt-1 text-nowrap"
                          >
                            <span>
                              <strong>Order Id:</strong>
                            </span>
                            <span
                              className="custom-span d-md-block"
                              style={
                                window.innerWidth < 768
                                  ? { width: '100%', whiteSpace: 'normal' }
                                  : { whiteSpace: 'nowrap' }
                              }
                            >
                              #{laptop.requestId}
                            </span>
                          </Col>

                          <Col xs={12} md={3} lg={3} className="mt-1">
                            <span className="">
                              <strong>Payment Mode: </strong>
                            </span>
                            <span className=" custom-span">
                              {laptop.initialAmountPaidThrough === 'COD'
                                ? 'Cash On Delivery'
                                : 'Digital Payment'}
                            </span>
                          </Col>
                          <Row
                            className="mt-lg-3 mt-md-3 d-none d-md-flex "
                            style={{ cursor: 'pointer' }}
                          >
                            <Col
                              xs={12}
                              className="text-lg-end d-flex justify-content-end align-items-center"
                            >
                              <span className="">
                                <strong>Order Status: </strong>
                              </span>
                              <span className="m-1"> {laptop.status}</span>

                              {laptop.status === 'Completed' && (
                                <>
                                  <span className="mx-2">|</span>
                                  <span
                                    className="ms-1"
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <div>
                                      <button
                                        style={{
                                          border: `1px solid ${color}`,
                                          cursor: 'pointer',
                                        }}
                                        className="rounded p-1"
                                        onClick={() =>
                                          navigate('/invoice', {
                                            state: { data: laptop.billInfo },
                                          })
                                        }
                                        key={laptop._id}
                                      >
                                        <FaDownload
                                          size={16}
                                          className="mx-1"
                                        />
                                        Invoice
                                      </button>
                                    </div>
                                  </span>
                                </>
                              )}
                            </Col>
                          </Row>

                          {/* Order Status and Invoice */}
                          <Row className="d-block d-md-none ">
                            <Col xs={12} className="mt-1">
                              <span className="">
                                <strong>Status: </strong>
                              </span>
                              <span className="custom-span text-nowrap d-md-block">
                                {laptop.status}
                              </span>
                            </Col>
                            <Col
                              className="d-flex justify-content-start mt-2"
                              xs={12}
                            >
                              {laptop.status === 'Completed' && (
                                <>
                                  <div>
                                    <button
                                      style={{
                                        border: `1px solid ${color}`,
                                        cursor: 'pointer',
                                      }}
                                      className="rounded p-1"
                                      onClick={() =>
                                        navigate('/invoice', {
                                          state: { data: laptop.billInfo },
                                        })
                                      }
                                      key={laptop._id}
                                    >
                                      <FaDownload size={16} className="mx-1" />
                                      Invoices
                                    </button>
                                  </div>
                                </>
                              )}
                            </Col>
                          </Row>
                        </Row>
                        <hr className="horizontal-line" />
                        {/* ************* small device*************** */}

                        <Row className="  justify-content-center justify-content-md-between align-items-center  d-block d-md-none ">
                          <Col
                            xs={12}
                            md={4}
                            lg={4}
                            className="d-flex justify-content-center align-items-center"
                          >
                            <img
                              src={laptop.productDetails.image ?? Laptop}
                              width={150}
                              height={100}
                              style={{
                                backgroundColor: 'white',
                                objectFit: 'cover',
                                cursor: 'pointer',
                              }}
                              alt="Laptop"
                              onClick={() =>
                                navigateToRentDetails(
                                  laptop.productDetails,
                                  laptop
                                )
                              }
                            />
                          </Col>
                          <Col xs={12} md={8} lg={8}>
                            <Row className=" ">
                              <Col
                                xs={12}
                                md={6}
                                lg={4}
                                className="d-flex flex-column align-items-start justify-content-start text-wrap text-lg-nowrap mt-3"
                              >
                                <Paragraph className="custom-paragraph">
                                  Brand:{' '}
                                  <span
                                    style={{
                                      fontWeight: 'normal',
                                      fontSize: '15px',
                                    }}
                                  >
                                    {laptop.productDetails.brand}
                                  </span>
                                </Paragraph>
                                <Paragraph className="fw-0 custom-paragraph">
                                  Storage:{' '}
                                  <span
                                    style={{
                                      fontWeight: 'normal',
                                      fontSize: '15px',
                                    }}
                                  >
                                    {laptop.productDetails?.storage}
                                  </span>
                                </Paragraph>

                                <Paragraph className="custom-paragraph">
                                  Processor:{' '}
                                  <span
                                    style={{
                                      fontWeight: 'normal',
                                      fontSize: '15px',
                                    }}
                                  >
                                    {laptop.productDetails.processor}
                                  </span>
                                </Paragraph>
                                <Paragraph className="fw-0 custom-paragraph">
                                  OS:{' '}
                                  <span
                                    style={{
                                      fontWeight: 'normal',
                                      fontSize: '15px',
                                    }}
                                  >
                                    {laptop.productDetails.operatingSystem}
                                  </span>
                                </Paragraph>
                              </Col>
                              <Col
                                xs={12}
                                md={6}
                                lg={4}
                                className="d-flex flex-column align-items-start justify-content-start text-wrap text-lg-nowrap"
                              >
                                <Paragraph className="custom-paragraph">
                                  RAM:{' '}
                                  <span
                                    style={{
                                      fontWeight: 'normal',
                                      fontSize: '15px',
                                    }}
                                  >
                                    {laptop.productDetails.ram}
                                  </span>
                                </Paragraph>

                                <Paragraph className="fw-0 custom-paragraph">
                                  ScreenSize:{' '}
                                  <span
                                    style={{
                                      fontWeight: 'normal',
                                      fontSize: '15px',
                                    }}
                                  >
                                    {laptop.productDetails.screenSize}
                                  </span>
                                </Paragraph>
                                <Paragraph className="custom-paragraph">
                                  Color:{' '}
                                  <span
                                    style={{
                                      fontWeight: 'normal',
                                      fontSize: '15px',
                                      
                                    }}
                                  >
                                    {laptop.productDetails.color}
                                    <FaCircle
                                      className='ms-1'
                                      style={{
                                      
                                        fontWeight: 'normal',
                                        fontSize: '15px',
                                      }}
                                      color={laptop.productDetails.color}
                                    />
                                    
                                  </span>
                                </Paragraph>
                                <Paragraph className="custom-paragraph">
                                  Model:{' '}
                                  <span
                                    style={{
                                      fontWeight: 'normal',
                                      fontSize: '15px',
                                    }}
                                  >
                                    {laptop.productDetails.model}
                                  </span>
                                </Paragraph>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        {/* ************* laptop device*************** */}
                        <Row className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center d-none d-md-flex">
                          <Col
                            xs={12}
                            md={4}
                            lg={4}
                            className="d-flex justify-content-start align-items-start"
                          >
                            <img
                              src={laptop.productDetails.image ?? Laptop}
                              width={150}
                              height={100}
                              style={{
                                backgroundColor: 'white',
                                objectFit: 'cover',
                                cursor: 'pointer',
                              }}
                              alt="Laptop"
                              onClick={() =>
                                navigateToRentDetails(
                                  laptop.productDetails,
                                  laptop
                                )
                              }
                            />
                          </Col>
                          <Col xs={12} md={8} lg={8} className="mt-3">
                            {laptop &&
                              laptop.productDetails &&
                              (laptop.type === 'Rental' || 'Refurbished') && (
                                <Row className="gx-5 gy-5">
                                  <Col
                                    xs={6}
                                    md={4}
                                    className="d-lg-inline text-nowrap"
                                  >
                                    <Paragraph className="custom-paragraph ">
                                      Brand:{' '}
                                      <span
                                        style={{
                                          fontWeight: 'normal',
                                          fontSize: '14px',
                                        }}
                                      >
                                        {laptop.brand}
                                      </span>
                                    </Paragraph>
                                    <Paragraph className="custom-paragraph ">
                                      RAM:{' '}
                                      <span
                                        style={{
                                          fontWeight: 'normal',
                                          fontSize: '14px',
                                        }}
                                      >
                                        {laptop.productDetails.ram}
                                      </span>
                                    </Paragraph>
                                    <Paragraph className="custom-paragraph ">
                                      Color:{' '}
                                      <span
                                        style={{
                                          fontWeight: 'normal',
                                          fontSize: '14px',
                                        }}
                                      >
                                        {laptop.productDetails.color}{' '}
                                      </span>
                                      (
                                      <FaCircle
                                        style={{
                                          fontWeight: 'normal',
                                          fontSize: '14px',
                                        }}
                                        color={laptop.productDetails.color}
                                      />
                                      )
                                    </Paragraph>

                                    <Paragraph className="fw-0  custom-paragraph">
                                      OS:{' '}
                                      <span
                                        style={{
                                          fontWeight: 'normal',
                                          fontSize: '14px',
                                        }}
                                      >
                                        {laptop.productDetails.operatingSystem}
                                      </span>
                                    </Paragraph>
                                  </Col>

                                  <Col
                                    xs={6}
                                    md={4}
                                    className="justify-content-center align-items-start d-lg-inline text-nowrap"
                                  >
                                    <Paragraph className=" custom-paragraph">
                                      Model:{' '}
                                      <span
                                        style={{
                                          fontWeight: 'normal',
                                          fontSize: '14px',
                                        }}
                                      >
                                        {laptop.productDetails.model}
                                      </span>
                                    </Paragraph>

                                    <Paragraph className="fw-0  custom-paragraph">
                                      Storage:{' '}
                                      <span
                                        style={{
                                          fontWeight: 'normal',
                                          fontSize: '14px',
                                        }}
                                      >
                                        {laptop.productDetails?.storage}
                                      </span>
                                    </Paragraph>

                                    <Paragraph className="custom-paragraph ">
                                      Processor:{' '}
                                      <span
                                        style={{
                                          fontWeight: 'normal',
                                          fontSize: '14px',
                                        }}
                                      >
                                        {laptop.productDetails.processor}
                                      </span>
                                    </Paragraph>

                                    <Paragraph className="fw-0  custom-paragraph">
                                      ScreenSize:{' '}
                                      <span
                                        style={{
                                          fontWeight: 'normal',
                                          fontSize: '14px',
                                        }}
                                      >
                                        {laptop.productDetails.screenSize}
                                      </span>
                                    </Paragraph>
                                  </Col>
                                </Row>
                              )}
                          </Col>
                        </Row>
                        <hr className="horizontal-line mt-2" />
                        <Row className="flex-wrap flex-column flex-md-row justify-content-center align-items-center">
                          <Col className="d-flex justify-content-md-start justify-content-center align-items-center mt-1">
                            <span
                              style={{ fontSize: '15px', fontWeight: 'bold' }}
                            >
                              {laptop.type}
                            </span>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))
        ) : (
          <div className="text-center mt-4">
            <Lottie options={options} height="250px" width="250px" />
            <h4 style={{ color: color }}>No Quotes Found</h4>
          </div>
        )}

        {laptop.length > 0 ? (
          <Col className="d-flex justify-content-end mt-4">
            <CustomPagination
              totalItems={totalItems}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPage}
            />
          </Col>
        ) : (
          <></>
        )}
      </Container>

      <Modal
        show={showAddressModal}
        onHide={handleCloseModal}
        centered
        size="md"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Quotes Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedActivity && (
            <>
              <Paragraph>UserName: {selectedActivity.userName}</Paragraph>
              <Paragraph>
                Phone Number: {selectedActivity.phoneNumber}
              </Paragraph>
              <Paragraph>Address: {selectedActivity.address}</Paragraph>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Quotes;
