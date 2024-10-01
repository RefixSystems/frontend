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
import { Link, useLocation } from 'react-router-dom';
import ReviewComponent from '../../components/ReviewComponent';
import { FaCircle, FaStar } from 'react-icons/fa';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Laptop from '../../assests/images/laptop.webp';
import SuccessModal from '../../components/SuccessModal';
import LoginModal from '../Authentication/LoginModel';
import SimilarProducts from '../../components/SimilarProducts';
import { FaArrowLeft } from 'react-icons/fa';
import {
  useAddRefurbishedCartMutation,
  useGetCartQuery,
} from '../../redux/api/UserCartApi';
import { addItemToCart, getAllItemsInCart } from '../../utils/CartStorage';
import QuantityButton from '../../components/QuantityBotton';
import { useTheme } from '../../Contexts/ThemeContext';
import SideModal from '../../components/AddToCartModal';
import { useGetProductReviewQuery } from '../../redux/api/RentApi';
import CustomPagination from '../../components/CustomPagination';

const RefurbishedDetails = () => {
  const { color } = useTheme();
  const location = useLocation();
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [zoomStyle, setZoomStyle] = useState({});
  const [isLensVisible, setIsLensVisible] = useState(false);
  const [AddToCart, { isLoading }] = useAddRefurbishedCartMutation();
  const [showModal, setShowModal] = useState(false);
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
    amount: 0,
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
    type: 'Refurbished',
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

    setZoomStyle({
      left: `${-x}px`,
      top: `${-y}px`,
    });
    setIsLensVisible(true);
  };

  const handleMouseLeave = () => {
    setIsLensVisible(false);
  };
  const handleAddToCart = async () => {
    const data = {
      phoneNumber: phoneNumber,
      laptopId: laptop._id,
      quantity: quantity,
    };
    try {
      const response = await AddToCart({ data: data });

      if (response?.data) {
         
        setErrorLottie(false);
        setSuccessMessage(response?.data?.message);
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
        setShowModal(true);
        setQuantity(1);
        setTimeout(() => {
          setShowModal(false);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddToLocalCart = (product) => {
    const { status, message, cart, error } = addItemToCart(product);
    if (status === 200) {
      setErrorLottie(false);
      setSuccessMessage(message);
      setShowModal(true);
      setShowCartModal(true);
      setCartItems(cart);
      setQuantity(1);
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    } else {
      setErrorLottie(true);
      setQuantity(1);
      setSuccessMessage(message);
      setShowModal(true);
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
            to="/refurbished"
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
          <h4 className="text-center">
            <span className="main">“</span>Refurbished Deals
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
          <h6 className="text-start mt-4 mb-3">Product Details : </h6>
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
        <QuantityButton quantity={quantity} setQuantity={setQuantity} />

        <Button
          onClick={() =>
            phoneNumber.length > 0
              ? handleAddToCart()
              : handleAddToLocalCart({
                  phoneNumber: phoneNumber,
                  laptopId: laptop._id,
                  type: 'Refurbished',
                  image: laptop.image,
                  brand: laptop.brand,
                  model: laptop.model,
                  amount: laptop.amount,
                  item: laptop,
                  quantity: quantity,
                })
          }
          className="bg-main w-100 mt-4 px-3 py-1"
          style={{ backgroundColor: color, borderColor: color }}
          disabled={isLoading}
        >
          {isLoading ? <Spinner size="sm" /> : 'Add to cart'}
        </Button>

        <Container>
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

export default RefurbishedDetails;
