import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  ProgressBar,
  Row,
  Spinner,
} from 'react-bootstrap';
import Paragraph from '../../components/paragraph';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReviewComponent from '../../components/ReviewComponent';
import { FaCircle, FaStar } from 'react-icons/fa';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BasicButton from '../../components/BasicButton';
import Laptop from '../../assests/images/laptop.webp';
import SuccessModal from '../../components/SuccessModal';
import LoginModal from '../Authentication/LoginModel';
import SimilarProducts from '../../components/SimilarProducts';
import { FaArrowLeft } from 'react-icons/fa';
import {
  useAddRetalCartMutation,
  useGetCartQuery,
} from '../../redux/api/UserCartApi';
import { addItemToCart, getAllItemsInCart } from '../../utils/CartStorage';
import QuantityButton from '../../components/QuantityBotton';
import { useTheme } from '../../Contexts/ThemeContext';
import SideModal from '../../components/AddToCartModal';
import { useGetProductReviewQuery } from '../../redux/api/RentApi';
import CustomPagination from '../../components/CustomPagination';

const RentDetails = () => {
  const { color } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [zoomStyle, setZoomStyle] = useState({});
  const [isLensVisible, setIsLensVisible] = useState(false);
  // const [bookRent, { isLoading }] = useAddQuoteMutation();
  const [AddToCart, { isLoading }] = useAddRetalCartMutation();
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [errorLottie, setErrorLottie] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [similarProduct, setSimilarProduct] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewProduct, setReviewProduct] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState({});
  const [ratingPercentages, setRatingPercentages] = useState({});
  const [laptop, setLaptop] = useState({
    brand: 'Unknown Brand',
    model: 'Unknown Model',
    image: '...',
    images: [],
    processor: 'Unknown Processor',
    ram: 'Unknown RAM',
    storage: 'Unknown Storage',
    screenSize: 'Unknown Screen Size',
    operatingSystem: 'Unknown OS',
    color: 'Unknown Color',
    description: 'No Description',
    status: 'Inactive',
    offer: 'Non Applicable',
    reviews: [],
    createdAt: 'Unknown',
    updatedAt: 'Unknown',
    _id: 'Unknown',
    quantity: 1,
  });
  const [quantity, setQuantity] = useState(laptop.quantity);

  useEffect(() => {
    if (location.state && location.state.laptop) {
      setLaptop(location.state.laptop);
      setSimilarProduct(location.state.similarProduct);
    }
  }, [location.state]);

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
  const { data: reviewData } = useGetProductReviewQuery({
    currentPage: currentPage,
    type: 'Rental',
    id: laptop._id,
  });
  useEffect(() => {
    if (reviewData && reviewData.data) {
      setReviewProduct(reviewData.data);
    }
    if (reviewData && reviewData.pagination) {
      setTotalPage(reviewData.pagination.totalPages);
      setTotalItems(reviewData.pagination.totalItems);
      setCurrentPage(currentPage);
    }
    if (reviewData) {
      setAverageRating(reviewData.averageRating || 0);
      setRatingCounts(reviewData.ratingCounts || {});
      setRatingPercentages(reviewData.ratingCountPercentages || {});
    }
  }, [reviewData, currentPage]);

  useEffect(() => {
    if (phoneNumber) {
      refetch();
    } else {
      const { cart } = getAllItemsInCart();
      setCartItems(cart || []);
    }
  }, [phoneNumber]);
  const initialValues = {
    rentalPurpose: '',
    rentalPeriod: '',
    termsAndConditions: false,
  };
  const validationSchema = Yup.object().shape({
    termsAndConditions: Yup.boolean()
      .oneOf([true], 'Must Accept Terms and Conditions')
      .required('Must Accept Terms and Conditions'),
    rentalPurpose: Yup.string()
      .required('Please select a purpose for the rental')
      .oneOf(
        ['Study', 'Work Purpose', 'Business', 'Others'],
        'Invalid rental purpose selected'
      ),
  });

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
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

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const lensX = x - 50;
    const lensY = y - 50;

    setLensPosition({ x: lensX, y: lensY });

    const percentX = (x / width) * 100;
    const percentY = (y / height) * 100;

    setZoomStyle({
      left: `${-x}px`,
      top: `${-y}px`,
    });
    setIsLensVisible(true);
  };

  const handleMouseLeave = () => {
    setIsLensVisible(false);
  };
  const handleAddToCart = async (values, { resetForm }) => {
    const data = {
      phoneNumber: phoneNumber,
      laptopId: laptop._id,
      rentalPeriod: values.rentalPeriod,
      purposeOfRental: values.rentalPurpose,
      quantity: quantity,
    };
    try {
      const response = await AddToCart({ data: data });
      if (response?.data) {
        resetForm();
        setErrorLottie(false);
        setSuccessMessage(response?.data?.message);
        setShowFormModal(false);
        setShowModal(true); 
        setQuantity(1);
        setTimeout(() => {
          setShowModal(false);
          setShowCartModal(true);
          refetch();
         
        }, 5000);
      } else {
        setErrorLottie(true);
        setSuccessMessage(response?.error?.data.error);
        setShowFormModal(false);
        setShowModal(true);
        setQuantity(1);

  
        setTimeout(() => {
        setShowModal(false);
      }, 4000);
        setDeviceName('');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddToLocalCart = (values, { resetForm }) => {
    const data = {
      phoneNumber: phoneNumber,
      laptopId: laptop._id,
      rentalPeriod: values.rentalPeriod,
      purposeOfRental: values.rentalPurpose,
      type: 'Rental',
      image: laptop.image,
      brand: laptop.brand,
      model: laptop.model,
      item: laptop,
      quantity: quantity,
    };
    const { status, message, cart, error } = addItemToCart(data);
    if (status === 200) {
      resetForm();
      setErrorLottie(false);
      setSuccessMessage(message);
      setShowFormModal(false);
      setShowModal(true);
      setShowCartModal(true);
      setCartItems(cart);
      setQuantity(1);
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    } else {
      setErrorLottie(true);
      setSuccessMessage(message);
      setShowFormModal(false);
      setShowModal(true);
      setQuantity(1);
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    }
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 1);
  };

  const progressBarColors = ['#01AD23', '#80C02B', '#FFCC00', '#F18030', 'red'];

  return (
    <div>
      <Row className="mt-4 align-items-center">
        <Col xs="auto">
          <Link
            to="/rent"
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: color,
              borderRadius: '50%',
            }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <FaArrowLeft size={15} color="#fff" />
          </Link>
        </Col>
        <Col>
          <h4 className="d-flex justify-content-center align-items-center">
            <span className="main">“</span>Rent a Laptop
            <span className="main">”</span>
          </h4>
        </Col>
      </Row>

      <Container
        fluid
        className="mt-3 d-flex flex-column  justify-content-center align-items-center"
      >
        <Col
          xs={12}
          md={6}
          lg={4}
          className="d-flex border rounded flex-column justify-content-center align-items-center my-2 zoom-container"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={image ? image ?? Laptop : laptop.image ?? Laptop}
            alt="Laptop"
            className="p-2 rounded zoom-image"
          />
          {isLensVisible && (
            <>
              <div
                className="zoom-lens d-none d-xxl-block d-xl-block d-lg-block"
                style={{ left: lensPosition.x, top: lensPosition.y }}
              ></div>
              <div className="zoom-result d-none d-xxl-block d-xl-block d-lg-block">
                <img
                  src={image ? image ?? Laptop : laptop.image ?? Laptop}
                  alt="Zoomed Laptop"
                  className="zoom-result-img"
                  style={zoomStyle}
                />
              </div>
            </>
          )}
        </Col>
        <Container fluid>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            arrows={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            showDots={true}
          >
            {laptop.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setImage(image)}
                className="d-flex  justify-content-center"
              >
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  width={200}
                  height={200}
                  className="d-block pointer"
                  style={{ backgroundColor: 'white', objectFit: 'cover' }}
                />
              </div>
            ))}
          </Carousel>
        </Container>

        <Row className="d-flex flex-column flex-md-row justify-content-center mt-3 align-items-center flex-wrap">
          <h6 className="text-start fw-4">Product Description :</h6>
          <Paragraph className={''} fontSize={'14px'}>
            {laptop.description}
          </Paragraph>
          <h6 className="text-start mt-4">Product Details : </h6>
          <Col
            xs={12}
            md={4}
            className="d-flex flex-column justify-content-center align-items-start"
          >
            <Paragraph className="fw-0 text-wrap" fontSize="14px">
              Brand:{' '}
              <span className="fw-5" style={{ fontWeight: 800 }}>
                {laptop.brand}
              </span>
            </Paragraph>
            <Paragraph className="fw-0 text-wrap" fontSize="14px">
              Model:{' '}
              <span className="fw-5" style={{ fontWeight: 800 }}>
                {laptop.model}
              </span>
            </Paragraph>
            <Paragraph className="fw-0 text-wrap" fontSize="14px">
              Processor:{' '}
              <span className="fw-5" style={{ fontWeight: 800 }}>
                {laptop.processor}
              </span>
            </Paragraph>
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex flex-column justify-content-center align-items-start "
          >
            <Paragraph className="fw-0 text-wrap" fontSize="14px">
              RAM:{' '}
              <span className="fw-5" style={{ fontWeight: 800 }}>
                {laptop.ram}
              </span>
            </Paragraph>
            <Paragraph className="fw-0 text-wrap" fontSize="14px">
              Storage:{' '}
              <span className="fw-5" style={{ fontWeight: 800 }}>
                {laptop.storage}
              </span>
            </Paragraph>
            <Paragraph className="fw-0 text-wrap" fontSize="14px">
              Screen Size:{' '}
              <span className="fw-5" style={{ fontWeight: 800 }}>
                {laptop.screenSize}
              </span>
            </Paragraph>
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex flex-column justify-content-center align-items-start "
          >
            <Paragraph className="fw-0 text-wrap" fontSize="14px">
              OS:{' '}
              <span className="fw-5" style={{ fontWeight: 800 }}>
                {laptop.operatingSystem}
              </span>
            </Paragraph>
            <Paragraph className="fw-0 text-wrap" fontSize="14px">
              Color:{' '}
              <span className="fw-5" style={{ fontWeight: 800 }}>
                <FaCircle color={laptop.color} />
              </span>
            </Paragraph>

            <Paragraph className="fw-0 text-wrap" fontSize="14px">
              Rating:{' '}
              <div className="my-2 mx-1 d-inline">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    color={
                      index < laptop.averageRating ? '#ffc107' : 'lightgray'
                    }
                  />
                ))}
              </div>
              <span
                className="fw-5"
                style={{ fontWeight: 800, marginLeft: '8px' }}
              >
                ({laptop.totalRatings})
              </span>
            </Paragraph>
          </Col>
        </Row>

        <Button
          onClick={() => setShowFormModal(true)}
          className="bg-main w-100 mt-4 px-3 py-1"
          style={{ backgroundColor: color, borderColor: color }}
        >
          Add to cart
        </Button>

        <Container fluid className="w-100">
          {' '}
          <SimilarProducts similarProduct={similarProduct} />
        </Container>
        {reviewProduct.length > 0 && (
          <Col className="w-100 justify-content-between">
            <h2 className="text-center mt-5">Product Ratings & Reviews</h2>
            {/* Average Rating and Rating Distribution Section */}
            <Row className="my-3 p-3 border-bottom">
              <Col
                xs={12}
                md={4}
                className="d-flex align-items-center justify-content-center text-center"
              >
                <div className="mx-5 mb-3 text-center ">
                  <h1 className="text-center" style={{ fontSize: '42px' }}>
                    {averageRating.toFixed(1)}{' '}
                    <span className="text-center">
                      <FaStar size={37} color={color} />
                    </span>
                  </h1>
                  <small
                    className="text-muted text-nowrap"
                    style={{ fontSize: '14px', fontWeight: 'bold' }}
                  >
                    ( Total Ratings{' '}
                    {totalItems !== undefined ? totalItems.toLocaleString() : 0}{' '}
                    )
                  </small>
                </div>
              </Col>
              <Col xs={12} md={8}>
                {/* Adjust the mapping to ensure correct star alignment */}
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="d-flex align-items-center mb-2">
                    <div
                      style={{ width: '70px' }}
                      className="d-flex justify-content-end"
                    >
                      {/* Render the number of stars based on the current star count */}
                      {Array.from({ length: star }, (_, i) => (
                        <FaStar key={i} color="#ffc107" size={14} />
                      ))}
                    </div>
                    <ProgressBar
                      now={ratingPercentages[star] || 0}
                      className="flex-grow-1 mx-3"
                      style={{
                        height: '10px',
                        backgroundColor: '#e9ecef',
                        borderRadius: '5px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${ratingPercentages[star] || 0}%`,
                          backgroundColor: progressBarColors[5 - star], // Adjust color indexing accordingly
                          height: '100%',
                        }}
                      ></div>
                    </ProgressBar>{' '}
                    <span className="ms-2">{ratingCounts[star] || 0}</span>{' '}
                  </div>
                ))}
              </Col>
            </Row>
            {reviewProduct.map((review) => (
              <ReviewComponent key={review._id} {...review} />
            ))}
          </Col>
        )}
        {reviewProduct.length > 0 ? (
          <Col className="d-flex justify-content-end mt-4">
            {currentPage.length > 1 ? (
              <CustomPagination
                totalItems={totalItems}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalPages={totalPage}
              />
            ) : (
              <></>
            )}
          </Col>
        ) : (
          <></>
        )}

        {reviewProduct.length > 0 && totalPage > 1 ? (
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
        <LoginModal
          show={isLoginOpen}
          handleClose={() => setIsLoginOpen(false)}
        />
        <Modal
          show={showFormModal}
          onHide={() => setShowFormModal(false)}
          centered
          backdrop="static"
          keyboard={false}
          s
        >
          <Modal.Header closeButton>
            <Modal.Title className="fs-5">Rental Application Form</Modal.Title>
          </Modal.Header>
          {/* <h4 className="text-center mt-4">Rental Application Form</h4>
      <Col className="w-100 justify-content-between"> */}{' '}
          <Formik
            initialValues={{
              ...initialValues,
              phoneNumber: phoneNumber || '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) =>
              phoneNumber.length > 0
                ? handleAddToCart(values, { resetForm })
                : handleAddToLocalCart(values, { resetForm })
            }
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Modal.Body style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                  <Row className="my-1">
                    <Form.Group>
                      <Form.Label>Rental Period (Optional)</Form.Label>
                      <Field
                        as="select"
                        name="rentalPeriod"
                        className="form-select"
                      >
                        <option
                          value=""
                          disabled
                          label="Select rental period"
                          selected
                        />
                        <option value="1" label="1 month" />
                        <option value="2" label="2 months" />
                        <option value="3" label="3 months" />
                        <option value="6" label="6 months" />
                        <option value="12" label="12 months" />
                      </Field>
                      <ErrorMessage
                        name="rentalPeriod"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Row>
                  <Row className="my-1">
                    <Form.Group>
                      <Form.Label>
                        Purpose of Rental <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        as="select"
                        name="rentalPurpose"
                        className="form-select"
                      >
                        <option
                          value=""
                          disabled
                          label="Select Purpose of rental "
                          selected
                        />
                        <option value="Study" label="Study" />
                        <option value="Work Purpose" label="Work Purpose" />
                        <option value="Business" label=" Business" />
                        <option value="Others" label="Others" />
                      </Field>

                      <ErrorMessage
                        name="rentalPurpose"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Row>
                  <Row className="my-1 ">
                    <Form.Label>
                      Quantity <span className="text-danger">*</span>
                    </Form.Label>

                    <QuantityButton
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                  </Row>
                  <Form.Group
                    controlId="termsAndConditions"
                    className="my-2 pointer"
                  >
                    <Field
                      type="checkbox"
                      name="termsAndConditions"
                      className="form-check-input"
                    />
                    <Form.Label
                      id="termsAndConditions"
                      className="form-check-label  mx-1"
                      style={{ fontSize: '14px' }}
                    >
                      I accept the terms and conditions
                    </Form.Label>
                    <ErrorMessage
                      name="termsAndConditions"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>

                  <BasicButton
                    type="submit"
                    className="bg-main w-100 px-3 py-1 my-4"
                    label="Submit"
                    isLoading={isLoading}
                  />
                </Modal.Body>
              </Form>
            )}
          </Formik>
          {/* </Col> */}
        </Modal>
        {/* Side Modal Component */}
        <SideModal
        showCartModal={showCartModal}
        handleCloseCartModal={() => setShowCartModal(false)}
         cartItems={phoneNumber ? CartData?.data || [] : cartItems}
      />
        {/* <SideModal
          show={showCartModal}
          onClose={handleCloseCartModal}
          cartItems={phoneNumber ? CartData?.data || [] : cartItems}
        /> */}
      </Container>
    </div>
  );
};

export default RentDetails;
