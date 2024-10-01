import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import Laptop from '../../assests/images/laptop.webp';
import Paragraph from '../../components/paragraph';
import CustomPagination from '../../components/CustomPagination';
import { Link, useNavigate } from 'react-router-dom';
import RentalFilter from '../../components/RentalFilter';
import {
  useAddQuoteMutation,
  useAddRentalCustomMutation,
} from '../../redux/api/RentApi';
import Loader from '../../components/Loader';
import { FaXmark } from 'react-icons/fa6';
import AddQuoteModal from '../../components/AddQuoteModel';
import SuccessModal from '../../components/SuccessModal';
import { FaArrowLeft, FaCircle, FaMinus, FaPlus, FaStar } from 'react-icons/fa';
import { searchLaptop } from '../../Constants/LaptopSearch';
import { IoIosReturnRight } from 'react-icons/io';
import BasicButton from '../../components/BasicButton';
import { useGetAllRefurbishedQuery } from '../../redux/api/RefurbishUserApi';
import { truncateText } from '../../Constants/constant';
import FetchLoader from '../../components/FetchLoader';
import NoDataFound from '../../components/NoDataFound';
import { useTheme } from '../../Contexts/ThemeContext';
import { ErrorMessage, Field, Formik } from 'formik';
import { removePrefix } from '../../Constants/constant';
import * as Yup from 'yup';
import LoginModal from '../Authentication/LoginModel';
import { useGetFaqParticularQuery } from '../../redux/api/FaqApi';

const Refurbished = () => {
  const { color } = useTheme();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [itemsPerPage, setItemsPerPage] = useState();
  const [totalItems, setTotalItems] = useState();
  const [currentFaqPage, setCurrentFaqPage] = useState(1);
  const [totalFaqPage, setTotalFaqPage] = useState();
  const [itemsPerFaqPage, setItemsPerFaqPage] = useState();
  const [totalItemsFaq, setTotalItemsFaq] = useState();
  const [faqData, setFaqData] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [data, setData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [sortOption, setSortOption] = useState('desc');
  const [laptopId, setLaptopId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModel] = useState(false);
  const [errorLottie, setErrorLottie] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [similarProduct, setSimilarProduct] = useState([]);
  const [filterLenght, setFilterLenght] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bannerImage, setBannerImage] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const isMobileView = window.innerWidth < 768;
  const [filters, setFilters] = useState({
    brand: [],
    operatingSystem: [],
    ram: [],
    storage: [],
    screenSize: [],
    rating: [],
    processor: [],
  });
  const [filterOptions, setFilterOptions] = useState({
    brand: [],
    operatingSystem: [],
    ram: [],
    storage: [],
    screenSize: [],
    rating: [],
    processor: [],
  });
  const isFilterOptionsEmpty = (options) => {
    return Object.values(options).every((arr) => arr.length === 0);
  };
  const queryString = new URLSearchParams(filters).toString();
  const {
    data: RentData,
    isLoading,
    isFetching,
  } = useGetAllRefurbishedQuery({
    currentPage: currentPage,
    queryString: queryString,
    sortOption: sortOption,
    search: searchValue,
  });

  const { data: RefurbishedFaqData } = useGetFaqParticularQuery({
    page: currentFaqPage,
    type: 'refurbished',
  });

  const [addQuote, { isLoading: quoteLoader }] = useAddQuoteMutation();
  const [addCustomFilter] = useAddRentalCustomMutation();

  useEffect(() => {
    if (RentData && RentData.data) {
      setData(RentData.data);
      setSimilarProduct(RentData.carousel);
    }
    if (RentData && RentData.availbleOptionsForFilter) {
      setFilterLenght(RentData.availbleOptionsForFilter);
      const {
        availableBrands,
        availableOperatingSystems,
        availableRams,
        availableStorages,
        availableScreenSizes,
        availableRatings,
        availableProcessors,
      } = RentData.availbleOptionsForFilter[0] ?? [];

      setFilterOptions({
        brand: availableBrands,
        operatingSystem: availableOperatingSystems,
        ram: availableRams,
        storage: availableStorages,
        screenSize: availableScreenSizes,
        rating: availableRatings,
        processor: availableProcessors,
      });
    } else {
      setFilterLenght([]);
    }
    if (RentData && RentData.pagination) {
      setTotalPage(RentData.pagination.totalPages);
      setItemsPerPage(RentData.pagination.itemsPerPage);
      setTotalItems(RentData.pagination.totalItems);
      setCurrentPage(currentPage);
    }
    if (RentData && RentData.carousel) {
      setSimilarProduct(RentData.carousel);
    }

    if (RentData && RentData.refurbishedBanner) {
      setBannerImage(
        Array.isArray(RentData.refurbishedBanner)
          ? RentData.refurbishedBanner
          : [RentData.refurbishedBanner]
      );
    }
  }, [RentData, currentPage, filters, sortOption, searchValue]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      const phoneNumber = parsedToken.phoneNumber;
      setPhoneNumber(phoneNumber);
      console.log(phoneNumber);
    }
  }, []);

  useEffect(() => {
    if (RefurbishedFaqData && RefurbishedFaqData.data) {
      setFaqData(RefurbishedFaqData.data);
    }
    if (RefurbishedFaqData && RefurbishedFaqData.pagination) {
      setTotalFaqPage(RefurbishedFaqData.pagination.totalPages);
      setItemsPerFaqPage(RefurbishedFaqData.pagination.itemsPerPage);
      setTotalItemsFaq(RefurbishedFaqData.pagination.totalItems);
    }
  }, [RefurbishedFaqData, currentFaqPage]);

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowSearchResults(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleSearchResultClick = () => {
    setSearchValue(searchText);
    if (searchText.length > 0) {
      setShowSearch(true);
    }
  };
  const handleSearchCancel = () => {
    setSearchValue('');
    setSearchText('');
    setShowSearch(false);
    setShowSearchResults(false);
  };
  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (filterType, value) => {
    setCurrentPage(1);
    setFilters((prevFilters) => {
      const isValueIncluded = prevFilters[filterType].includes(value);

      const updatedFilters = isValueIncluded
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value];
      return { ...prevFilters, [filterType]: updatedFilters };
    });
  };
  const navigateToRentDetails = (laptop) => {
    navigate('/refurbished/refurbished-details', {
      state: { laptop, similarProduct },
    });
  };
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    setShowSearchResults(value.trim().length > 0);
  };
  const chunkData = (arr, size) =>
    arr.reduce(
      (acc, _, i) =>
        i % size === 0 ? acc.concat([arr.slice(i, i + size)]) : acc,
      []
    );
  const clearFilters = () => {
    setFilters({
      brand: [],
      operatingSystem: [],
      ram: [],
      storage: [],
      screenSize: [],
      rating: [],
      processor: [],
    });
  };

  const handleAddQuote = async (values) => {
    const data = {
      phoneNumber: values.phoneNumber,
      userName: values.userName,
      email: values.email,
      laptopId: laptopId,
      rentalDays: values.rentalDays,
    };
    try {
      const response = await addQuote(data);

      if (response?.data) {
        setShowModal(false);
        setErrorLottie(false);
        setSuccessMessage(response?.data?.message);
        setShowSuccessModel(true);
        setTimeout(() => setShowSuccessModel(false), 4000);
        setLaptopId('');
      } else {
        setShowModal(false);

        setErrorLottie(true);
        setSuccessMessage(response?.error?.data.error);

        setShowSuccessModel(true);
        setTimeout(() => setShowSuccessModel(false), 4000);
        setLaptopId('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCustomFilter = () => {
    setShowCustomModal(true);
  };

  const initialValues = {
    processor: '',
    phoneNumber: '',
    ram: '',
    operatingSystem: '',
    quantity: '',
    type: '',
    screenSize: '',
    message: '',
  };
  const validationSchema = Yup.object().shape({
    message: Yup.string()
      .min(2, 'Message must be at least 2 characters')
      .max(250, 'Message must be at most 250 characters')
      .required('Message is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    const data = {
      phoneNumber: values.phoneNumber,
      processor: values.processor,
      operatingSystem: values.operatingSystem,
      ram: values.ram,
      screenSize: values.screenSize,
      quantity: values.quantity,
      type: values.type,
      message: values.message,
    };

    try {
      const response = await addCustomFilter(data);
      if (response?.data) {
        setSuccessMessage(response?.data?.message);
        setShowSuccessModel(true);
        setTimeout(() => setShowSuccessModel(false), 4000);
        setShowCustomModal(false);
        setLoading(false);
      } else {
        setErrorLottie(true);
        setSuccessMessage(response?.error?.data?.error);
        setShowSuccessModel(true);
        setTimeout(() => setShowSuccessModel(false), 4000);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error while submitting form:', error);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const handlePageChangeFaq = (page) => {
    setCurrentFaqPage(page);
    window.scrollTo(0, 0);
  };
  const toggleFaq = (faqIndex) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [faqIndex]: !prevState[faqIndex],
    }));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Row className="mt-4 align-items-center">
            <Col xs="auto">
              <Link
                to="/"
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
            className="d-flex flex-column justify-content-center align-items-center"
          >
            {RentData && RentData !== null ? (
              <>
                {filterLenght.length > 0 ? (
                  <Row className="justify-content-between align-items-center d-flex my-4 w-100">
                    <Col xs={8} sm={10} md={6} lg={3} className="my-2">
                      <Form
                        className="border rounded d-flex align-items-center justify-content-start position-relative"
                        ref={formRef}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Search here..."
                          aria-label="Location"
                          className="border-0"
                          style={{ paddingLeft: '30px' }}
                          value={searchText}
                          onChange={handleInputChange}
                        />
                        <div
                          className="position-absolute"
                          style={{
                            top: '150%',
                            left: 0,
                            right: 0,
                            display: showSearchResults > 0 ? 'block' : 'none',
                          }}
                        >
                          {/* <Card
                            className="p-2"
                            style={{
                              zIndex: 1000,
                              maxHeight: '200px',
                              overflow: 'auto',
                            }}
                          >
                            {showSearchResults ? (
                              <div className="mt-2">
                                <div className="m-0 p-0 d-flex flex-row align-items-center justify-content-start flex-wrap gap-2">
                                  {searchLaptop
                                    .filter((result) =>
                                      result
                                        .toLowerCase()
                                        .includes(searchText.toLowerCase())
                                    )
                                    .map((result, index) => (
                                      <Col
                                        key={index}
                                        className="py-1 px-2 pointer d-flex flex-nowrap"
                                        onClick={() => {
                                          setSearchText(result);
                                          setShowSearchResults(false);
                                        }}
                                      >
                                        <IoIosReturnRight className="mx-2" />
                                        <span
                                          className="text-center text-nowrap"
                                          style={{ fontSize: '13px' }}
                                        >
                                          {result}
                                        </span>
                                      </Col>
                                    ))}
                                  {searchLaptop.filter((result) =>
                                    result
                                      .toLowerCase()
                                      .includes(searchText.toLowerCase())
                                  ).length === 0 && (
                                    <div
                                      className="px-2"
                                      style={{ color: 'red' }}
                                    >
                                      Data Not Found
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : null}
                          </Card> */}
                        </div>
                        <div
                          className="position-absolute"
                          style={{ top: '100%', left: 0, right: 0 }}
                        ></div>

                        {showSearch ? (
                          <div
                            className="p-1 position-absolute pointer"
                            style={{
                              right: '5px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              backgroundColor: 'white',
                            }}
                            onClick={handleSearchCancel}
                          >
                            <FaXmark color={color} />
                          </div>
                        ) : (
                          <div
                            className="p-1 position-absolute pointer"
                            style={{
                              right: '5px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              backgroundColor: 'white',
                            }}
                            onClick={handleSearchResultClick}
                          >
                            <BsSearch color={color} />
                          </div>
                        )}
                      </Form>
                    </Col>
                    {data.length > 0 ? (
                      <Col xs={4} sm={10} md={6} lg={4} className="my-2">
                        <Dropdown
                          onSelect={handleSortOptionChange}
                          className="d-flex justify-content-center justify-content-md-end custom-dropdown"
                        >
                          <Dropdown.Toggle
                            variant="secondary"
                            id="dropdown-basic"
                          >
                            Sort By
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              eventKey="asc"
                              active={sortOption === 'asc'}
                              className={
                                sortOption === 'asc' ? 'selected-asc' : ''
                              }
                            >
                              Asc
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="desc"
                              active={sortOption === 'desc'}
                              className={
                                sortOption === 'desc' ? 'selected-desc' : ''
                              }
                            >
                              Desc
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    ) : (
                      <></>
                    )}
                  </Row>
                ) : (
                  <></>
                )}
                <Row className="justify-content-center  mb-4 w-100">
                  <Carousel
                    controls={false}
                    indicators={false}
                    interval={2000}
                    nextIcon={
                      <span
                        aria-hidden="true"
                        className="carousel-control-next-icon"
                      />
                    }
                    prevIcon={
                      <span
                        aria-hidden="true"
                        className="carousel-control-prev-icon"
                      />
                    }
                    className="w-100"
                  >
                    {bannerImage.map((banner, index) => (
                      <Carousel.Item key={index} style={{ maxHeight: '250px' }}>
                        <Row>
                          {/* Main Banner Image (70%) */}
                          <img
                            className="d-block"
                            src={banner.image}
                            alt={`Banner ${index + 1}`}
                            style={{
                              height:
                                window.innerWidth < 768 ? '100px' : '250px',
                              objectFit: 'fill',
                              width: window.innerWidth < 768 ? '80%' : '90%',
                              transition: 'width 1s ease-in-out',
                            }}
                          />

                          {/* Next Banner Image (30%) */}
                          <img
                            className="d-block"
                            src={
                              bannerImage[(index + 1) % bannerImage.length]
                                .image
                            }
                            alt={`Next Banner ${index + 2}`}
                            style={{
                              height:
                                window.innerWidth < 768 ? '100px' : '250px',
                              objectFit: 'cover',
                              width: window.innerWidth < 768 ? '15%' : '5%',
                              transition: 'width 1s ease-in-out',
                            }}
                          />
                        </Row>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Row>
                <Row className="w-100 ">
                  {filterLenght.length > 0 ? (
                    <>
                      {' '}
                      {!isFilterOptionsEmpty(filterOptions) ? (
                        <RentalFilter
                          filters={filters}
                          filterOptions={filterOptions}
                          handleFilterChange={handleFilterChange}
                          clearFilters={clearFilters}
                          handleCustomFilter={() =>
                            phoneNumber
                              ? handleCustomFilter()
                              : setIsLoginOpen(true)
                          }
                        />
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}

                  <Col
                    xs={12}
                    lg={isLoading ? 12 : filterLenght.length > 0 ? 9 : 12}
                    className={`d-flex flex-row flex-wrap gaps m-0 p-0 justify-content-md-${data.length > 0 ? 'start' : 'center'} justify-content-center align-items-start align-content-start d-none d-lg-flex d-md-flex d-xxl-flex`}
                  >
                    {isFetching ? (
                      <FetchLoader />
                    ) : (
                      <>
                        {data.length > 0 ? (
                          <>
                            {data.map((laptop, index) => (
                              <div
                                className="rounded-0 mb-2 p-2 mx-2  products-card d-flex flex-column justify-content-start align-items-start"
                                key={laptop._id}
                              >
                                <Col
                                  className="d-flex justify-content-center align-items-center w-100 pointer"
                                  onClick={() => navigateToRentDetails(laptop)}
                                >
                                  <img
                                    src={laptop.image ?? Laptop}
                                    alt="Laptop"
                                    className="products-image"
                                  />
                                </Col>
                                <Col className="my-1">
                                  <Paragraph
                                    className={'p-0 m-0'}
                                    fontSize={'15px'}
                                    fontWeight={800}
                                  >
                                    {laptop.brand}
                                  </Paragraph>
                                  <Paragraph
                                    className="fw-0 text-wrap p-0 m-0  pointer products-description"
                                    fontSize="11px"
                                    fontWeight={400}
                                    onClick={() =>
                                      navigateToRentDetails(laptop)
                                    }
                                  >
                                    {truncateText(
                                      // laptop.brand +
                                      //   ' ' +
                                      laptop.model +
                                        ' (' +
                                        laptop.ram +
                                        ' ' +
                                        laptop.storage +
                                        ' ' +
                                        laptop.operatingSystem +
                                        ' ' +
                                        ' )',
                                      42
                                    )}
                                  </Paragraph>
                                </Col>
                                <div className="p-0 m-0 d-flex w-100 flex-row justify-content-between align-items-center">
                                  {/* Laptop Color Indicator */}
                                  <FaCircle
                                    className="text-start"
                                    color={laptop.color}
                                  />

                                  {/* Product Rating */}
                                  {laptop.averageRating > 0 ? (
                                    <div
                                      className={`d-flex align-items-center justify-content-center rounded px-1 rating-box ${
                                        laptop.averageRating >= 3.5
                                          ? 'bg-success'
                                          : laptop.averageRating >= 2.5
                                            ? 'bg-warning'
                                            : 'bg-danger'
                                      }`}
                                      style={{
                                        minWidth: '40px',
                                        textAlign: 'center',
                                        color: 'white',
                                      }}
                                    >
                                      {laptop.averageRating}
                                      <FaStar className="ml-1 mx-1" size={10} />
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <Row className="justify-content-center ">
                            <Col
                              xs="auto"
                              className="justify-content-center align-item-center"
                            >
                              <div>
                                <NoDataFound />
                              </div>
                            </Col>
                          </Row>
                        )}
                      </>
                    )}
                  </Col>
                  <>
                    <Col
                      xs={12}
                      className={`d-flex flex-row flex-wrap gap-3 m-0 p-0 justify-content-md-${
                        data.length > 0 ? 'start' : 'center'
                      } justify-content-center align-items-start d-md-none d-xs-flex d-lg-none d-sm-flex`}
                    >
                      {isFetching ? (
                        <FetchLoader />
                      ) : (
                        <>
                          {data.length > 0 ? (
                            <>
                              {isMobileView ? (
                                <div>
                                  {chunkData(data, 2).map(
                                    (chunk, chunkIndex) => (
                                      <div key={chunkIndex}>
                                        <Row>
                                          {chunk.map((laptop) => (
                                            <Col xs={6} key={laptop._id}>
                                              <div
                                                className="rounded-0 mb-2 p-2 mx-2 products-card d-flex flex-column justify-content-start align-items-start m-3"
                                                style={{
                                                  width: '100%',
                                                  height: '205px',
                                                }}
                                              >
                                                <Col
                                                  className="d-flex justify-content-center align-items-center w-100 pointer"
                                                  onClick={() =>
                                                    navigateToRentDetails(
                                                      laptop
                                                    )
                                                  }
                                                >
                                                  <img
                                                    src={laptop.image ?? Laptop}
                                                    alt="Laptop"
                                                    style={{
                                                      width: '110px',
                                                      height: '110px',
                                                      objectFit: 'fill',
                                                    }}
                                                  />
                                                </Col>
                                                <Col className="">
                                                  <div className="d-flex justify-content-between align-items-center w-100">
                                                    <Paragraph
                                                      className={'p-0 m-0'}
                                                      fontSize={'15px'}
                                                      fontWeight={800}
                                                    >
                                                      {laptop.brand}
                                                    </Paragraph>
                                                    {laptop.averageRating >
                                                      0 && (
                                                      <div
                                                        className={`rounded mt-1 px-1 ${
                                                          laptop.averageRating >=
                                                          3.5
                                                            ? 'bg-success'
                                                            : laptop.averageRating >=
                                                                2.5
                                                              ? 'bg-warning'
                                                              : 'bg-danger'
                                                        }`}
                                                        style={{
                                                          textAlign: 'center',
                                                          color: 'white',
                                                        }}
                                                      >
                                                        {laptop.averageRating}
                                                        <FaStar
                                                          className="ml-1 mx-1"
                                                          size={11}
                                                        />
                                                      </div>
                                                    )}
                                                  </div>
                                                  <span
                                                    style={{ fontSize: '11px' }}
                                                  >
                                                    Color: {laptop.color}{' '}
                                                    <FaCircle
                                                      className="text-start"
                                                      color={laptop.color}
                                                    />
                                                  </span>
                                                  <Paragraph
                                                    className="fw-0 text-wrap p-0 m-0 pointer products-description"
                                                    fontSize="11px"
                                                    fontWeight={400}
                                                    onClick={() =>
                                                      navigateToRentDetails(
                                                        laptop
                                                      )
                                                    }
                                                  >
                                                    {truncateText(
                                                      `${laptop.model} (${laptop.ram} ${laptop.storage})`,
                                                      42
                                                    )}
                                                  </Paragraph>
                                                </Col>
                                              </div>
                                            </Col>
                                          ))}
                                        </Row>
                                      </div>
                                    )
                                  )}
                                </div>
                              ) : (
                                <Row className="justify-content-center">
                                  <Col
                                    xs="auto"
                                    className="justify-content-center align-item-center"
                                  >
                                    <NoDataFound />
                                  </Col>
                                </Row>
                              )}
                            </>
                          ) : (
                            <NoDataFound />
                          )}
                        </>
                      )}
                    </Col>
                  </>
                  {data.length > 0 ? (
                    <Col className="d-flex mt-3 justify-content-end">
                      <CustomPagination
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        totalPages={totalPage}
                      />
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              </>
            ) : (
              <Row className="justify-content-center ">
                <Col
                  xs="auto"
                  className="justify-content-center align-item-center"
                >
                  <div>
                    <NoDataFound />
                  </div>
                </Col>
              </Row>
            )}
          </Container>
          <div className="my-5 w-100">
            <h4 className="text-center">FAQ - Refurbished</h4>

            {faqData &&
              faqData.map((faq, faqIndex) => (
                <div key={faqIndex} className="mt-4">
                  <div
                    key={faq._id}
                    style={{
                      marginBottom: '15px',
                      border: `1px solid ${color}`,
                      borderRadius: '8px',
                      backgroundColor: '#ECFEFF',
                    }}
                  >
                    <div
                      style={{
                        padding: '15px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                      onClick={() => toggleFaq(faqIndex)}
                      aria-expanded={isOpen[faqIndex]}
                    >
                      {isOpen[faqIndex] ? (
                        <FaMinus style={{ marginRight: '10px' }} />
                      ) : (
                        <FaPlus style={{ marginRight: '10px' }} />
                      )}
                      <span
                        className={`faq-question ${isOpen[faqIndex] ? 'open' : ''}`}
                      >
                        {faq.question}
                      </span>
                    </div>

                    {isOpen[faqIndex] && (
                      <div
                        style={{
                          padding: '15px',
                          fontSize: '16px',
                          fontWeight: '400',
                        }}
                      >
                        <hr className="horizontal-line" />
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
          {faqData.length > 0 && totalFaqPage > 1 ? (
            <CustomPagination
              itemsPerPage={itemsPerFaqPage}
              totalItems={totalItemsFaq}
              currentPage={currentFaqPage}
              onPageChange={handlePageChangeFaq}
              totalPages={totalFaqPage}
            />
          ) : (
            <></>
          )}
        </div>
      )}
      <AddQuoteModal
        handleAddQuote={handleAddQuote}
        handleClose={() => setShowModal(false)}
        show={showModal}
        isLoading={quoteLoader}
      />
      <SuccessModal
        showModal={showSuccessModal}
        setShowModal={setShowSuccessModel}
        successMessage={successMessage}
        error={errorLottie}
      />

      <Modal
        show={showCustomModal}
        onHide={() => setShowCustomModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">Customize your Laptop</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            ...initialValues,
            phoneNumber: removePrefix(phoneNumber) || '',
            processor: '',
            ram: '',
            operatingSystem: '',
            quantity: '',
            screenSize: '',
            type: 'Refurbished',
            message: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body style={{ maxHeight: '350px', overflowY: 'scroll' }}>
                <Row className="my-1">
                  <Form.Group>
                    <Form.Label>
                      Phone Number <span className="text-danger">*</span>
                    </Form.Label>
                    <InputGroup className="">
                      <InputGroup.Text
                        className="input-group-prepend"
                        style={{ fontSize: '14px', height: '40px' }}
                      >
                        +91
                      </InputGroup.Text>
                      <Field
                        type="text"
                        name="phoneNumber"
                        className="form-control"
                        placeholder="Enter your Phone number"
                        onInput={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 10) {
                            e.target.value = value;
                          } else {
                            e.target.value = value.slice(0, 10);
                          }
                        }}
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </Row>
                <Row className="my-1">
                  <Form.Group>
                    <Form.Label>Processor</Form.Label>
                    <Field
                      type="text"
                      name="processor"
                      className="form-control"
                      placeholder="Enter your Processor"
                    />
                    <ErrorMessage
                      name="processor"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </Row>
                <Row className="my-1">
                  <Form.Group>
                    <Form.Label>Operating System</Form.Label>
                    <Field
                      type="text"
                      name="operatingSystem"
                      className="form-control"
                      placeholder="Enter your Operating System"
                    />
                    <ErrorMessage
                      name="operatingSystem"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </Row>
                <Row className="my-1">
                  <Form.Group>
                    <Form.Label>Ram</Form.Label>
                    <Field
                      type="text"
                      name="ram"
                      className="form-control"
                      placeholder="Enter your Ram"
                    />
                    <ErrorMessage
                      name="ram"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </Row>
                <Row className="my-1">
                  <Form.Group>
                    <Form.Label>Screen Size</Form.Label>
                    <Field
                      type="text"
                      name="screenSize"
                      className="form-control"
                      placeholder="Enter your Screen Size"
                    />
                    <ErrorMessage
                      name="screenSize"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </Row>

                <Row className="my-1">
                  <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Field
                      type="text"
                      name="quantity"
                      className="form-control"
                      placeholder="Enter your Quantity"
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </Row>
                <Row className="my-1">
                  <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Field
                      type="text"
                      name="type"
                      className="form-control"
                      placeholder="Enter your Type"
                      readOnly
                    />
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </Row>
                <Row className="my-1">
                  <Form.Group controlId="message">
                    <Form.Label>
                      Message <span className="text-danger">*</span>
                    </Form.Label>
                    <Field
                      name="message"
                      as="textarea"
                      placeholder="Enter Your Message"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </Row>

                <Button
                  type="submit"
                  className="w-100 px-3 py-1 my-4"
                  style={{ backgroundColor: color, borderColor: color }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        className="mx-1"
                      />
                      Submit...
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Modal.Body>
            </Form>
          )}
        </Formik>
      </Modal>
      <LoginModal
        show={isLoginOpen}
        handleClose={() => setIsLoginOpen(false)}
      />
    </>
  );
};

export default Refurbished;
