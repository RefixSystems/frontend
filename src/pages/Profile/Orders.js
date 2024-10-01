import React, { useState, useEffect, useRef } from 'react';
import {
  useAddProductReviewMutation,
  useAddProductsReviewMutation,
} from '../../redux/api/ReviewsApi';

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Image,
} from 'react-bootstrap';
import Laptop from '../../assests/images/laptop.webp';

import Paragraph from '../../components/paragraph';
import { BsChevronDown } from 'react-icons/bs';
import { Rating } from 'react-simple-star-rating';
import BasicButton from '../../components/BasicButton';
import { useGetViewUserOrderQuery } from '../../redux/api/ProfileOrdersApi';
import { Heading } from '../../components/Heading';
import CustomPagination from '../../components/CustomPagination';
import { Formik, Field, ErrorMessage } from 'formik';
import SuccessModal from '../../components/SuccessModal';

import {
  reviewValidationSchema,
  productReviewValidationSchema,
} from './OrderReviewValidation';
import FetchLoader from '../../components/FetchLoader';
import OrdersEmpty from '../../components/OrdersEmpty';
import { useTheme } from '../../Contexts/ThemeContext';

import { MdInsertPhoto } from 'react-icons/md';
import { IoMdCloseCircle } from 'react-icons/io';
import { FiUploadCloud, FiXCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { FaCircle, FaStar } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa';
function Orders() {
  const { color } = useTheme();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewModal, setReviewModal] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [errorLottie, setErrorLottie] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]);
  const [similarProduct, setSimilarProduct] = useState([]);
  const [productReviewModal, setProductReviewModal] = useState(false);
  const { data: OrdersData, isLoading: orderLoader } = useGetViewUserOrderQuery(
    {
      phoneNumber: phoneNumber,
      page: currentPage,
    }
  );

  const [ReviewsApi, { isLoading }] = useAddProductReviewMutation();
  const [productReview, { isLoading: reviewLoader }] =
    useAddProductsReviewMutation();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      setPhoneNumber(parsedToken.phoneNumber);
    }
  }, []);

  useEffect(() => {
    if (OrdersData && OrdersData.data) {
      setActivities(OrdersData.data);
    }
    if (OrdersData && OrdersData.pagination) {
      setTotalPage(OrdersData.pagination.totalPages);
      setTotalItems(OrdersData.pagination.totalItems);
      setCurrentPage(currentPage);
    }
  }, [OrdersData, currentPage]);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 1);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleImageChange = (e, index, setFieldValue, values) => {
    const selectedFile = e.target.files[0];
    const updatedImages = [...values.images];
    updatedImages[index] = selectedFile;
    setFieldValue('images', updatedImages);
  };

  const handleImageRemove = (index, setFieldValue, values) => {
    const updatedImages = values.images.filter((_, idx) => idx !== index);
    setFieldValue('images', updatedImages);
  };
  const handleSubmit = async (values, { resetForm, setFieldValue }) => {
    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    formData.append('rating', values.rating);
    formData.append('review', values.review);
    values.images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await ReviewsApi({ data: formData });
      if (response?.data) {
        setReviewModal(false);
        setErrorLottie(false);
        setSuccessMessage(response.data.message);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 4000);
        resetForm();
        setImages([]);
        setFieldValue('rating', 0);
      } else {
        setReviewModal(false);
        setErrorLottie(true);
        setSuccessMessage(response?.error?.data.error);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 4000);
        resetForm();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleProductSubmit = async (values, { resetForm, setFieldValue }) => {
    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    formData.append('rating', values.rating);
    formData.append('review', values.review);
    formData.append('productId', selectedActivity?.productId);
    formData.append('productType', selectedActivity?.type);
    values.images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await productReview({ data: formData });
      if (response?.data) {
        setProductReviewModal(false);
        setErrorLottie(false);
        setSuccessMessage(response.data.message);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 4000);
        resetForm();
        setImages([]);
        setFieldValue('rating', 0);
      } else {
        setProductReviewModal(false);
        setErrorLottie(true);
        setSuccessMessage(response?.error?.data.error);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 4000);
        resetForm();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrorLottie(true);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 4000);
    }
  };

  const navigateToRentDetails = (productDetails, laptop) => {
    let similarProduct;
    if (laptop.type === 'Rental') {
      similarProduct = OrdersData.rentalCarousel;
      navigate('/rent/rent-details', {
        state: { laptop: productDetails, similarProduct },
      });
    } else if (laptop.type === 'Refurbished') {
      similarProduct = OrdersData.refurbishedCarousel;
      navigate('/refurbished/refurbished-details', {
        state: { laptop: productDetails, similarProduct },
      });
    } else {
      navigate('/repair-service');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-2">
        <Heading>Your Orders</Heading>
      </Row>
      {orderLoader ? (
        <FetchLoader />
      ) : (
        <>
          {activities.length > 0 ? (
            activities.map((laptop, idx) => (
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
                                <strong>Ship To: </strong>
                                <BsChevronDown
                                  onClick={() => handleChevronClick(laptop)}
                                  style={{
                                    cursor: 'pointer',
                                    marginLeft: '1px',
                                  }}
                                />
                              </span>
                              <span className="d-md-block custom-span">
                                {laptop.userName}
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
                                  <strong>Order Status:</strong>
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
                                        <FaDownload
                                          size={16}
                                          className="mx-1"
                                        />
                                        Invoices
                                      </button>
                                    </div>
                                  </>
                                )}
                              </Col>
                            </Row>
                          </Row>

                          <hr className="horizontal-line" />
                          {/* *****laptop**** */}
                          <Row className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center d-none d-md-flex">
                            <Col
                              xs={12}
                              md={4}
                              lg={4}
                              className="d-flex justify-content-center align-items-center"
                            >
                              <img
                                src={laptop.image ?? Laptop}
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
                                (laptop.type === 'Rental' ||
                                  laptop.productDetails.type ===
                                    'Refurbished') && (
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
                                          {
                                            laptop.productDetails
                                              .operatingSystem
                                          }
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

                              {laptop && laptop.type === 'Repair' && (
                                <>
                                  <Paragraph className="custom-paragraph text-center text-md-start">
                                    Initial Amount:{'  '}
                                    <span
                                      style={{
                                        fontWeight: 'normal',
                                        fontSize: '14px',
                                      }}
                                    >
                                      {laptop.amount !== null
                                        ? `₹ ${laptop.amount}`
                                        : '₹ 00.00'}
                                    </span>
                                  </Paragraph>

                                  {laptop.issue && (
                                    <span className="custom-span text-center text-md-start">
                                      Your Laptop issue {laptop.issue} is still
                                      not working, it's time to take it to a
                                      qualified technician for repair.
                                    </span>
                                  )}
                                  {laptop.issueDetails && (
                                    <span className="custom-span text-center text-md-start">
                                      I'm pleased with the laptop. It meets my
                                      needs perfectly {laptop.issueDetails}{' '}
                                      without any issues.
                                    </span>
                                  )}
                                </>
                              )}
                            </Col>
                          </Row>

                          {/* *****small device*** */}

                          <Row className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center  d-block d-md-none">
                            <Col
                              xs={12}
                              md={4}
                              lg={4}
                              className="d-flex justify-content-center align-items-center"
                            >
                              <img
                                src={laptop.image ?? Laptop}
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
                              {laptop &&
                                laptop.productDetails &&
                                (laptop.type === 'Rental' ||
                                  laptop.productDetails.type ===
                                    'Refurbished') && (
                                  <Row className="gx-2 gy-1 mt-2">
                                    <Col
                                      xs={12}
                                      md={6}
                                      lg={4}
                                      className="d-flex flex-column align-items-start text-wrap text-lg-nowrap"
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
                                        OS:{'   '}
                                        <span
                                          style={{
                                            fontWeight: 'normal',
                                            fontSize: '15px',
                                          }}
                                        >
                                          {
                                            laptop.productDetails
                                              .operatingSystem
                                          }
                                        </span>
                                      </Paragraph>
                                    </Col>
                                    <Col
                                      xs={12}
                                      md={6}
                                      lg={4}
                                      className="d-flex flex-column align-items-start text-wrap text-lg-nowrap"
                                    >
                                      <Paragraph className="custom-paragraph">
                                        RAM:{'   '}
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
                                            className="ms-1"
                                            style={{
                                              fontWeight: 'normal',
                                              fontSize: '16px',
                                            }}
                                            color={laptop.productDetails.color}
                                          />
                                          
                                        </span>
                                      </Paragraph>
                                      <Paragraph className="custom-paragraph ">
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
                                )}

                              {laptop && laptop.type === 'Repair' && (
                                <>
                                  <Paragraph className="custom-paragraph text-center text-md-start">
                                    Initial Amount:{'  '}
                                    <span
                                      style={{
                                        fontWeight: 'normal',
                                        fontSize: '14px',
                                      }}
                                    >
                                      {laptop.amount !== null
                                        ? `₹ ${laptop.amount}`
                                        : '₹ 00.00'}
                                    </span>
                                  </Paragraph>

                                  {laptop.issue && (
                                    <span className="custom-span text-center text-md-start">
                                      Your Laptop issue {laptop.issue} is still
                                      not working, it's time to take it to a
                                      qualified technician for repair.
                                    </span>
                                  )}
                                  {laptop.issueDetails && (
                                    <span className="custom-span text-center text-md-start">
                                      I'm pleased with the laptop. It meets my
                                      needs perfectly {laptop.issueDetails}{' '}
                                      without any issues.
                                    </span>
                                  )}
                                </>
                              )}
                            </Col>
                          </Row>
                          <hr className="horizontal-line mt-3" />
                          <Row className="flex-wrap flex-column flex-md-row justify-content-center align-items-center">
                            <Col className="d-flex justify-content-md-start justify-content-center align-items-center mt-2">
                              <span
                                style={{ fontSize: '15px', fontWeight: 'bold' }}
                              >
                                {laptop.type}
                              </span>
                            </Col>
                            {laptop.status === 'Completed' && (
                              <Col className="d-flex justify-content-md-end justify-content-center align-items-center mt-2">
                                <BasicButton
                                  onClick={() => {
                                    if (laptop.type !== 'Repair') {
                                      setSelectedActivity(laptop);
                                      setProductReviewModal(true);
                                    } else {
                                      setSelectedActivity(laptop);
                                      setReviewModal(true);
                                    }
                                  }}
                                  label={'Write a Review'}
                                />
                              </Col>
                            )}
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ))
          ) : (
            <Row className="justify-content-center">
              <Col md={12}>
                <OrdersEmpty />
              </Col>
            </Row>
          )}
        </>
      )}

      <Modal
        show={showAddressModal}
        onHide={handleCloseModal}
        centered
        size="md"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Address</Modal.Title>
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

      {/* Modal for Add Review */}
      <Modal
        show={reviewModal}
        onHide={() => setReviewModal(false)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">Add Product Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              review: '',
              rating: 0,
              images: [],
              phoneNumber: phoneNumber || '',
            }}
            validationSchema={reviewValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12} className="my-1">
                    <Form.Group>
                      <Form.Label>
                        Rating <span className="text-danger">*</span>
                      </Form.Label>
                      <Col>
                        <Rating
                          name="rating"
                          onClick={(rate) => setFieldValue('rating', rate)}
                          size={26}
                          fillColor="#ffd700"
                        />
                      </Col>
                      <ErrorMessage
                        name="rating"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12} className="my-1">
                    <Form.Group>
                      <Form.Label>
                        Review <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        as="textarea"
                        name="review"
                        className="form-control"
                        placeholder="Write your review here..."
                      />
                      <ErrorMessage
                        name="review"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                  <Form.Group className="my-1">
                    <Form.Label>Upload Images or Videos</Form.Label>
                    <div className="image-upload-grid">
                      <div className="image-grid">
                        <Row>
                          {Array.from({ length: 3 }, (_, index) => (
                            <Col key={index} md={4}>
                              <div
                                className="image-item"
                                style={{
                                  position: 'relative',
                                  height: '150px',
                                }}
                              >
                                {values.images[index] ? (
                                  <>
                                    <IoMdCloseCircle
                                      className="image-clear-icon"
                                      onClick={() =>
                                        handleImageRemove(
                                          index,
                                          setFieldValue,
                                          values
                                        )
                                      }
                                      size={25}
                                      style={{
                                        position: 'absolute',
                                        top: '0px',
                                        right: '0px',
                                        cursor: 'pointer',
                                        zIndex: 2,
                                        color: 'red',
                                      }}
                                    />
                                    {[
                                      'image/jpeg',
                                      'image/jpg',
                                      'image/png',
                                      'image/webp',
                                    ].includes(values.images[index].type) ? (
                                      <img
                                        src={URL.createObjectURL(
                                          values.images[index]
                                        )}
                                        alt="Uploaded"
                                        className="image-preview"
                                        style={{
                                          width: '100%',
                                          border: `1px dotted ${color}`,
                                          height: '150px',
                                        }}
                                      />
                                    ) : (
                                      <video
                                        controls
                                        className="video-preview"
                                        style={{
                                          width: '100%',
                                          border: `1px dotted ${color}`,
                                          height: '150px',
                                        }}
                                      >
                                        <source
                                          src={URL.createObjectURL(
                                            values.images[index]
                                          )}
                                          type={values.images[index].type}
                                        />
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    )}
                                  </>
                                ) : (
                                  <div
                                    className="d-flex justify-content-center align-items-center"
                                    style={{
                                      width: '100%',
                                      border: `1px dotted ${color}`,
                                      height: '150px',
                                    }}
                                  >
                                    <label
                                      htmlFor={`image-upload-${index}`}
                                      className="d-flex justify-content-center"
                                    >
                                      <FiUploadCloud
                                        size={50}
                                        style={{ cursor: 'pointer' }}
                                      />
                                    </label>
                                    <input
                                      id={`image-upload-${index}`}
                                      type="file"
                                      accept="image/jpeg, image/jpg, image/png, image/webp, video/mp4, video/quicktime, video/x-msvideo, video/x-matroska"
                                      onChange={(e) =>
                                        handleImageChange(
                                          e,
                                          index,
                                          setFieldValue,
                                          values
                                        )
                                      }
                                      style={{ display: 'none' }}
                                    />
                                  </div>
                                )}
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                      <ErrorMessage
                        name="images"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </Form.Group>
                </Row>
                <BasicButton
                  type="submit"
                  className="bg-main w-100 px-3 py-1 my-4"
                  label="Submit Review"
                  isLoading={isLoading}
                />
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      {/* Modal for Product Review */}
      <Modal
        show={productReviewModal}
        onHide={() => setProductReviewModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              review: '',
              rating: 0,
              images: [],
              phoneNumber: phoneNumber,
              productType: selectedActivity ? selectedActivity.type : '',
              productId: selectedActivity ? selectedActivity.laptopId : '',
            }}
            validationSchema={productReviewValidationSchema}
            onSubmit={handleProductSubmit}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12} className="my-1">
                    <Form.Group>
                      <Form.Label>
                        Rating <span className="text-danger">*</span>
                      </Form.Label>
                      <Rating
                        name="rating"
                        onClick={(rate) => setFieldValue('rating', rate)}
                        size={24}
                        fillColor="#ffd700"
                      />
                      <ErrorMessage
                        name="rating"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12} className="my-1">
                    <Form.Group>
                      <Form.Label>
                        Review <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        as="textarea"
                        name="review"
                        className="form-control"
                        placeholder="Write your review here..."
                      />
                      <ErrorMessage
                        name="review"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                  <Form.Group>
                    <Form.Label>Upload Images or Videos</Form.Label>
                    <div className="image-upload-grid">
                      <div className="image-grid">
                        <Row>
                          {Array.from({ length: 3 }, (_, index) => (
                            <Col key={index} md={4}>
                              <div
                                className="image-item"
                                style={{
                                  position: 'relative',
                                  height: '150px',
                                }}
                              >
                                {values.images[index] ? (
                                  <>
                                    <FiXCircle
                                      className="image-clear-icon"
                                      onClick={() =>
                                        handleImageRemove(
                                          index,
                                          setFieldValue,
                                          values
                                        )
                                      }
                                      size={20}
                                      style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        cursor: 'pointer',
                                        zIndex: 2,
                                        color: 'red',
                                      }}
                                    />
                                    {[
                                      'image/jpeg',
                                      'image/jpg',
                                      'image/png',
                                      'image/webp',
                                    ].includes(values.images[index].type) ? (
                                      <img
                                        src={URL.createObjectURL(
                                          values.images[index]
                                        )}
                                        alt="Uploaded"
                                        className="image-preview"
                                        style={{
                                          width: '100%',
                                          border: `1px dotted ${color}`,
                                          height: '150px',
                                        }}
                                      />
                                    ) : (
                                      <video
                                        controls
                                        className="video-preview"
                                        style={{
                                          width: '100%',
                                          border: `1px dotted ${color}`,
                                          height: '150px',
                                        }}
                                      >
                                        <source
                                          src={URL.createObjectURL(
                                            values.images[index]
                                          )}
                                          type={values.images[index].type}
                                        />
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    )}
                                  </>
                                ) : (
                                  <div
                                    className="d-flex justify-content-center align-items-center"
                                    style={{
                                      width: '100%',
                                      border: `1px dotted ${color}`,
                                      height: '150px',
                                    }}
                                  >
                                    <label
                                      htmlFor={`image-upload-${index}`}
                                      className="d-flex justify-content-center"
                                    >
                                      <FiUploadCloud
                                        size={50}
                                        style={{ cursor: 'pointer' }}
                                      />
                                    </label>
                                    <input
                                      id={`image-upload-${index}`}
                                      type="file"
                                      accept="image/jpeg, image/jpg, image/png, image/webp, video/mp4, video/quicktime, video/x-msvideo, video/x-matroska"
                                      onChange={(e) =>
                                        handleImageChange(
                                          e,
                                          index,
                                          setFieldValue,
                                          values
                                        )
                                      }
                                      style={{ display: 'none' }}
                                    />
                                  </div>
                                )}
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                      <ErrorMessage
                        name="images"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </Form.Group>
                </Row>
                <BasicButton
                  type="submit"
                  className="bg-main w-100 px-3 py-1 my-4"
                  label="Submit Review"
                  isLoading={reviewLoader}
                />
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      {activities.length > 0 ? (
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
      <SuccessModal
        showModal={showModal}
        setShowModal={setShowModal}
        successMessage={successMessage}
        error={errorLottie}
      />
    </Container>
  );
}

export default Orders;
