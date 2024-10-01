import React, { useEffect, useRef, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap';

import axios from 'axios';
import { LuLogIn } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../Authentication/LoginModel';
import {
  useGetHomeDetailsQuery,
  useGetSearchSuggestQuery,
} from '../../redux/api/HomeApi';
import DeleteModel from '../../components/DeleteModel';
import { useGetUserDetailsQuery } from '../../redux/api/ProfileOrdersApi';
import { handleWhatsappClick } from '../../Constants/constant';
import { FaShoppingCart } from 'react-icons/fa';
import { useGeolocated } from 'react-geolocated';
import Laptop from '../../assests/images/laptop.webp';
import LaptopRepairImage from '../../assests/images/Repair.webp';
import LaptopRentalImage from '../../assests/images/desktop-laptop.png';
import RefurbishedLaptopImage from '../../assests/images/Delivery.webp';
import MacBookRepairImage from '../../assests/images/Dvd.webp';
import DesktopRepairImage from '../../assests/images/Chennaicity.webp';
import { getAllItemsInCart } from '../../utils/CartStorage';
import { useTheme } from '../../Contexts/ThemeContext';
import BasicButton from '../../components/BasicButton';
import ComingSoonModal from '../../components/ComingSoonModal';

const Navbar = () => {
  const { color } = useTheme();
  const [locationValue, setLocationValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showLocationResults, setShowLocationResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [token, setToken] = useState(null);
  const formRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [modalText, setModalText] = useState('');

  const searchRef = useRef(null);
  const [logo, setLogo] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [RentalSimilarProduct, setRentalSimilarProduct] = useState([]);
  const [RefurbishedSimilarProduct, setRefurbishedSimilarProduct] = useState(
    []
  );
  const [imageLink, setImageLink] = useState('');
  const [cartLength, setCartLenght] = useState(0);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [logoutShow, setLogoutShow] = useState(false);
  const defaultSuggestions = [
    { text: 'Laptop Repair & Service', image: LaptopRepairImage },
    { text: 'Laptop for Rental', image: LaptopRentalImage },
    { text: 'Refurbished Laptops', image: RefurbishedLaptopImage },
    { text: 'MacBook Repair', image: MacBookRepairImage },
    { text: 'Desktop Repair', image: DesktopRepairImage },
  ];

  const {
    data: HomeData,
    isLoading,
    refetch,
  } = useGetHomeDetailsQuery({
    phoneNumber: userPhoneNumber,
  });
  const { data: SearchData, isFetching: searchLoader } =
    useGetSearchSuggestQuery({ query: searchValue });

  const { data: userData } = useGetUserDetailsQuery({
    phoneNumber: userPhoneNumber,
  });
  const navigateToProfile = (path) => {
    navigate('/my-profile', { state: { path } });
  };
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      const phoneNumber = parsedToken.phoneNumber;
      setToken(parsedToken);
      setUserPhoneNumber(phoneNumber);
    }
  }, []);
  useEffect(() => {
    if (userData && userData.data) {
      setImageLink(userData.data.profileImage ?? '');
    }
  }, [userData]);
  useEffect(() => {
    if (SearchData && SearchData.data) {
      setSearchData(SearchData?.data);
      console.log('search data', SearchData?.data);
      setRentalSimilarProduct(SearchData?.rentalCarousel);
      setRefurbishedSimilarProduct(SearchData?.refurbishedCarousel);
    }
  }, [
    searchValue,
    SearchData,
    RentalSimilarProduct,
    RefurbishedSimilarProduct,
  ]);
  useEffect(() => {
    if (HomeData && HomeData.data) {
      setLogo(HomeData?.data?.logo[0]);
    }
    if (HomeData && HomeData.data.cartLength) {
      setCartLenght(HomeData.data.cartLength);
    }
  }, [HomeData]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userPhoneNumber) {
        refetch();
      } else {
        const { length } = getAllItemsInCart();
        setCartLenght(length);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [userPhoneNumber, refetch]);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    setShowSearchResults(value.trim().length > 0);
  };

  const handleSearchResultClick = (laptop) => {
    setSearchValue(laptop.brand);
    const type = laptop.type === 'Rental';
    const similarProduct = type
      ? RentalSimilarProduct
      : RefurbishedSimilarProduct;
    navigate(type ? '/rent/rent-details' : '/refurbished/refurbished-details', {
      state: { laptop, similarProduct },
    });
    setShowSearchResults(false);
    setSearchValue('');
  };

  const handleSearchDefaultResultClick = (laptop) => {
    setSearchValue(laptop);
    setShowSearchResults(false);
    setSearchValue('');
    if (laptop === 'Laptop for Rental') {
      navigate('/rent');
    } else if (laptop === 'Refurbished Laptops') {
      navigate('/refurbished');
    } else if (
      laptop === 'Laptop Repair & Service' ||
      laptop === 'MacBook Repair' ||
      laptop === 'Desktop Repair'
    ) {
      navigate('/repair-service');
    } else {
      handleShow('Coming Soon');
    }
  };

  const handleCategoryClick = (category) => {
    setSearchValue(category);
    setShowSearchResults(false);
    setSearchValue('');
    switch (category) {
      case 'Laptop Repair & Service':
        navigate('/repair-service');
        break;
      case 'Laptop for Rental':
        navigate('/rent');
        break;
      case 'Refurbished Laptops':
        navigate('/refurbished');
        break;
      default:
        navigate('/repair-service');
    }
  };
  const handleShow = (text) => {
    setModalText(text);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowLocationResults(false);
    }
  };

  const handleModelClose = () => setLogoutShow(false);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    document.addEventListener('mousedown', handleSearchClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleSearchClickOutside);
    };
  }, []);
  const handleSearchClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearchResults(false);
    }
  };
  const handleLogin = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const handleLocationInputChange = (event) => {
    setLocationValue(event.target.value);
  };

  const handleLocationResultClick = (result) => {
    setLocationValue(result);
    setShowModal(false);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const address = response.data.display_name;
            setLocationValue(address);
            setShowModal(false);
          } catch (error) {
            console.error('Error fetching address:', error);
            alert('Error fetching address: ' + error.message);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Error getting location: ' + error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <>
      <div className="bg-dark d-flex justify-content-center align-items-center p-2">
        <Container className="d-flex justify-content-center align-items-center">
          <span
            className={'text-center text-light '}
            style={{ fontSize: '12px' }}
          >
            free Pick-up Delivery Call or Whatsapp{' '}
            <span
              onClick={() => handleWhatsappClick('+918973653436')}
              className="text-underline pointer"
            >
              +918973653436
            </span>
          </span>
        </Container>
      </div>
      <div className={`bg-main sticky-navbar  `} style={{ zIndex: 1010 }}>
        <Container
          className={` p-xxl-3 p-xl-3 p-lg-3 p-md-3 py-3 px-2 d-flex  justify-content-between align-items-center`}
        >
          <Col className={`d-flex col-md-2 col-lg-3 logo-col pointer`}>
            <Image
              src={logo}
              alt="Logo"
              className="logo pointer"
              style={{ width: '50px', height: '50px' }}
              onClick={() => navigate('/')}
            />
          </Col>
          <Col
            className={`col-7 col-md-4 col-lg-3 justify-content-md-start justify-content-center align-items-center  mx-md-0`}
          >
            <Form
              className="border rounded d-flex align-items-center position-relative w-100"
              ref={searchRef}
            >
              <Form.Control
                type="text"
                placeholder="Search Laptop"
                aria-label="Search"
                className="border-0"
                style={{ paddingLeft: '8px' }}
                value={searchValue}
                onChange={handleSearchInputChange}
                onClick={() => setShowSearchResults(true)}
              />
              {showSearchResults && (
                <div
                  className="position-absolute w-100"
                  style={{ top: '100%', left: 0 }}
                >
                  <div
                    className="bg-light border rounded mt-1 w-100"
                    style={{
                      maxHeight: '300px',
                      overflowY: 'auto',
                    }}
                  >
                    <Col className="list-unstyled m-0 p-0 d-flex flex-column">
                      {searchLoader ? (
                        <Col className="d-flex justify-content-center py-2">
                          <Spinner />
                        </Col>
                      ) : (
                        <Container fluid>
                          {searchValue.length === 0 &&
                          defaultSuggestions.length > 0 ? (
                            defaultSuggestions.map((suggestion, index) => (
                              <Row
                                key={index}
                                className="p-1 pointer align-items-center search-result-item"
                                onClick={() => handleCategoryClick(suggestion)}
                                style={{
                                  borderBottom: '1px solid #e0e0e0',
                                }}
                              >
                                <Col>
                                  <span
                                    className="text-start text-wrap w-100"
                                    style={{
                                      fontSize: '14px',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    {suggestion.text}
                                  </span>
                                </Col>
                              </Row>
                            ))
                          ) : searchData.length > 0 ? (
                            searchData.map((result, index) =>
                              typeof result === 'string' ? (
                                <Row
                                  key={index}
                                  className="p-1 pointer align-items-center search-result-item"
                                  onClick={() => handleCategoryClick(result)}
                                  style={{
                                    borderBottom: '1px solid #e0e0e0',
                                  }}
                                >
                                  {/* <Col md="auto">
                        <img
                          src={suggestion.image} // Use the corresponding image for each suggestion
                        alt={suggestion.text}
                          
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                          }}
                        />
                      </Col> */}
                                  <Col>
                                    <span
                                      className="text-start text-wrap w-100"
                                      style={{
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      {result}
                                    </span>
                                  </Col>
                                </Row>
                              ) : (
                                <Row
                                  key={index}
                                  className="p-1 pointer align-items-center search-result-item"
                                  onClick={() =>
                                    handleSearchResultClick(result)
                                  }
                                  style={{
                                    borderBottom: '1px solid #e0e0e0',
                                  }}
                                >
                                  <Col md="auto">
                                    <img
                                      src={result.image ?? Laptop}
                                      alt={`${result.brand} ${result.model}`}
                                      style={{
                                        width: '50px',
                                        height: '50px',
                                        objectFit: 'cover',
                                      }}
                                    />
                                  </Col>
                                  <Col>
                                    <Row>
                                      <Col>
                                        <span
                                          className="text-start text-wrap w-100"
                                          style={{
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                          }}
                                        >
                                          {result.brand} {result.model}{' '}
                                          {result.ram} {result.processor} -{' '}
                                          {result.type}
                                        </span>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col>
                                        <span
                                          className="text-start text-wrap w-100"
                                          style={{
                                            fontSize: '12px',
                                            color: '#757575',
                                          }}
                                        >
                                          in {result.brand}
                                        </span>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              )
                            )
                          ) : (
                            <Row className="py-2 px-3 d-flex align-items-center justify-content-center w-100">
                              <Col
                                className="text-center"
                                style={{ color: 'red', fontSize: '16px' }}
                              >
                                No Results Found
                              </Col>
                            </Row>
                          )}
                        </Container>
                      )}
                    </Col>
                  </div>
                </div>
              )}
            </Form>
          </Col>

          <Col className="d-lg-none d-xxl-none d-xl-none d-md-none  d-flex justify-content-evenly ">
            <div
              className="fixed-bottom d-flex justify-content-evenly align-items-center"
              style={{
                backgroundColor: color,
                padding: '10px 0',
                zIndex: '1000',
              }}
            >
              {/* Cart */}
              <div className="position-relative">
                <FaShoppingCart
                  size={25}
                  color="#fff"
                  className="w-100 pointer"
                  onClick={() => navigateToProfile('cart')}
                />
                <Badge
                  pill
                  bg="danger"
                  style={{
                    position: 'absolute',
                    top: '0px',
                    right: '2px',
                    fontSize: '10px',
                    transform: 'translate(50%, -50%)',
                  }}
                >
                  {cartLength.toString()}
                </Badge>
              </div>

              {/* Login Button */}
              <div
                className={`d-${token ? 'none' : 'flex'} align-items-center d-md-none`}
              >
                <Button
                  size="md"
                  variant="light"
                  onClick={openLoginModal}
                  className="open-login-button"
                >
                  <span className="d-block d-xxl-none d-xl-none d-lg-none">
                    <LuLogIn color={color} />
                  </span>
                  <span className="main d-none d-xxl-block d-xl-block  d-md-none mx-3 d-lg-block">
                    Login
                  </span>
                </Button>
              </div>

              <div
                className={`d-${!token ? 'none' : 'flex'} align-items-center d-block d-xxl-none d-xl-none d-md-none  d-lg-none`}
              >
                <Dropdown className="p-0 m-0 custom-dropdown">
                  <Dropdown.Toggle
                    color="white"
                    id="dropdown-basic"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'white',
                    }}
                    className="p-0 m-0"
                  >
                    <Image
                      src={
                        imageLink.length > 0
                          ? imageLink
                          : 'https://p7.hiclipart.com/preview/636/702/321/computer-icons-user-profile-avatar-black-man.jpg'
                      }
                      alt="Logo"
                      className="logo"
                      style={{ width: '40px', height: '40px' }}
                      roundedCircle
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => navigateToProfile('personal-info')}
                    >
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setLogoutShow(true)}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Col>

          <Col
            className={`justify-content-md-end justify-content-center col-md-3 col-2 notification-bell position-relative d-none d-md-flex`}
          >
            <div className="position-relative ">
              <FaShoppingCart
                size={25}
                color="#fff"
                className="w-100 pointer"
                onClick={() => navigateToProfile('cart')}
              />
              <Badge
                pill
                bg="danger"
                style={{
                  position: 'absolute',
                  top: '0px',
                  right: '2px',
                  fontSize: '10px',
                  transform: 'translate(50%, -50%)',
                }}
              >
                {cartLength.toString()}
              </Badge>
            </div>
          </Col>
          <div className="d-none d-md-flex justify-content-evenly">
            <Col
              className={`d-${token ? 'none' : 'flex'}  col-md-3 col-2  justify-content-center`}
            >
              <Button
                size="md"
                variant="light"
                onClick={openLoginModal}
                className="open-login-button"
              >
                <span className="d-block d-xxl-none d-xl-none d-lg-none">
                  <LuLogIn color={color} />
                </span>
                <span className="main d-none d-xxl-block d-xl-block mx-3 d-lg-block">
                  Login
                </span>
              </Button>
            </Col>

            <div
              className={`d-${!token ? 'none' : 'flex'}  col-md-3 col-auto  justify-content-center`}
            >
              <Dropdown className="p-0 m-0 custom-dropdown">
                <Dropdown.Toggle
                  color="white"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'white',
                  }}
                  className="p-0 m-0"
                >
                  <Image
                    src={
                      imageLink.length > 0
                        ? imageLink
                        : 'https://p7.hiclipart.com/preview/636/702/321/computer-icons-user-profile-avatar-black-man.jpg'
                    }
                    alt="Logo"
                    className="logo"
                    style={{ width: '40px', height: '40px' }}
                    roundedCircle
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => navigateToProfile('personal-info')}
                  >
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setLogoutShow(true)}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Container>
      </div>

      <LoginModal show={isLoginOpen} handleClose={closeLoginModal} />
      <DeleteModel
        DELETESTATE={logoutShow}
        ONCLICK={handleModelClose}
        YES={handleLogin}
        DESCRIPTION="Do You Want To Logout"
        DELETETITLE="Logout"
      />
      <ComingSoonModal show={show} handleClose={handleClose} text={modalText} />
    </>
  );
};

export default Navbar;
