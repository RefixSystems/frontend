import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap';
import Paragraph from '../../components/paragraph';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SuccessModal from '../../components/SuccessModal';
import BasicButton from '../../components/BasicButton';
import Loader from '../../components/Loader';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginModal from '../Authentication/LoginModel';
import { FaArrowLeft } from 'react-icons/fa';
import {
  useAddRepairCartMutation,
  useGetCartQuery,
} from '../../redux/api/UserCartApi';
import laptop1 from '../../assests/images/laptopTouchpad.webp';
import { addItemToCart, getAllItemsInCart } from '../../utils/CartStorage';
import { useTheme } from '../../Contexts/ThemeContext';
import NoDataFound from '../../components/NoDataFound';
import SideModal from '../../components/AddToCartModal';
import Warrenty from '../../assests/images/warrenty.webp';
import {
  FaWrench,
  FaShieldAlt,
  FaMousePointer,
  FaTools,
  FaClipboardCheck,
  FaHandshake,
  FaPhoneAlt,
  FaTimesCircle,
  FaCalendarAlt,
  FaCheck,
} from 'react-icons/fa'; // Im
import { FaFileInvoiceDollar } from 'react-icons/fa6';

const RepairService = ({ allIssues = [], IssueLoader, devices = [] }) => {
  const { color } = useTheme();
  const location = useLocation();
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [errorLottie, setErrorLottie] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [deviceIssues, setDeviceIssues] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [deviceModal, setDeviceModal] = useState(true);
  const [quickService, setQuickService] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [quickText, setQuickText] = useState('');
  const [ServiceCart, { isLoading }] = useAddRepairCartMutation();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [warrantyshowModal, setwarretyShowModal] = useState(false);

  const handleClose = () => setwarretyShowModal(false);
  const handleShow = () => setwarretyShowModal(true);
  useEffect(() => {
    if (location.state) {
      setDeviceModal(location.state.textToSend);
      setQuickService(location.state.textToSend === false ? true : false);
      setQuickText(location.state.text);
    }
  }, [location.state]);

  const handleIssueClick = (issueName) => {
    setSelectedIssues((prevSelectedIssues) =>
      prevSelectedIssues.includes(issueName)
        ? prevSelectedIssues.filter((item) => item !== issueName)
        : [...prevSelectedIssues, issueName]
    );
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
  // useEffect(() => {
  //   if (location.state && location.state.issue) {
  //     setSelectedIssues((prevIssues) => {
  //       if (!prevIssues.includes(location.state.issue)) {
  //         return [...prevIssues, location.state.issue];
  //       }
  //       return prevIssues;
  //     });
  //   }
  // }, [location.state]);
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

  const initialValues = {
    issueDetails: '',
    issue: '',
    os: '',
    brand: '',
    model: '',

    termsAndConditions: false,
  };
  const validationSchema = Yup.object().shape({
    issueDetails: Yup.string()
      .min(10, 'Issue Details must be at least 10 characters')
      .max(200, 'Issue Details must be at most 200 characters')
      .required('Issue Details is required'),
    issue: Yup.string()
      .min(2, 'Issue  must be at least 10 characters')
      .max(200, 'Issue  must be at most 200 characters')
      .required('Issue  is required'),
    os: Yup.string()
      .min(2, 'Operating System must be at least 10 characters')
      .max(200, 'Operating System  must be at most 200 characters')
      .required('Operating System  is required'),
    brand: Yup.string()
      .min(2, 'Brand must be at least 10 characters')
      .max(200, 'Brand  must be at most 200 characters')
      .required('Brand  is required'),
    model: Yup.string()
      .min(2, 'Model must be at least 10 characters')
      .max(200, 'Model must be at most 200 characters')
      .required('Model is required'),

    termsAndConditions: Yup.boolean()
      .oneOf([true], 'Must Accept Terms and Conditions')
      .required('Must Accept Terms and Conditions'),
  });

  const handleAddToCart = async () => {
    const data = {
      phoneNumber: phoneNumber,
      issue: selectedIssues.toString(),
      brand: 'Repair',
    };
    try {
      const response = await ServiceCart({ data: data });
      if (response?.data) {
        setErrorLottie(false);
        setSuccessMessage(response?.data?.message);
        setShowModal(true);
        setSelectedIssues([]);
        setShowFormModal(false);

        setTimeout(() => {
          setShowModal(false);
          setShowCartModal(true);
          refetch();
        }, 5000);

        setDeviceName('');
      } else {
        setErrorLottie(true);
        setSuccessMessage(response?.error?.data.error);
        setShowModal(true);
        setShowFormModal(false);
        setTimeout(() => {
          setShowModal(false);
        }, 4000);
        setDeviceName('');
        setSelectedIssues([]);
        resetForm();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSelectDevice = (device) => {
    setDeviceName(device);
    const filteredIssues = allIssues.filter(
      (issue) => issue.deviceName === device
    );
    setDeviceIssues(filteredIssues[0].issues);
    setDeviceModal(false);
  };

  const handleNavigate = () => {
    navigate('/services');
  };

  const handleAddToLocalCart = () => {
    const data = {
      phoneNumber: phoneNumber,
      issue: selectedIssues.toString(),
      type: 'Repair',
      brand: 'Repair',
    };
    const { status, message, cart, error } = addItemToCart(data);
    if (status === 200) {
      setErrorLottie(false);
      setSuccessMessage(message);
      setShowFormModal(false);
      setShowModal(true);
      setShowCartModal(true);
      setCartItems(cart);
      setSelectedIssues([]);
      setDeviceName('');
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    } else {
      setErrorLottie(true);
      setSuccessMessage(message);
      setShowFormModal(false);
      setShowModal(true);
      setSelectedIssues([]);
      setDeviceName('');
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    }
  };

  const handleAddToCartQuickService = async () => {
    const data = {
      phoneNumber: phoneNumber,
      issue: selectedIssues.toString(),
      brand: 'Repair',
    };
    try {
      const response = await ServiceCart({ data: data });
      if (response?.data) {
        setErrorLottie(false);
        setSuccessMessage(response?.data?.message);
        setShowModal(true);
        setShowCartModal(true);
        setSelectedIssues([]);
        setShowFormModal(false);
        setTimeout(() => {
          setShowModal(false);
        }, 4000);
      } else {
        setErrorLottie(true);
        setSuccessMessage(response?.error?.data.error);
        setShowModal(true);
        setShowFormModal(false);
        setTimeout(() => {
          setShowModal(false);
        }, 4000);

        setSelectedIssues([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCartLocalQuickService = () => {
    const data = {
      phoneNumber: phoneNumber,
      issue: selectedIssues.toString(),
      type: 'Repair',
      brand: 'Repair',
    };
    const { status, message, cart, error } = addItemToCart(data);
    if (status === 200) {
      setErrorLottie(false);
      setSuccessMessage(message);
      setShowFormModal(false);
      setShowModal(true);
      setShowCartModal(true);
      setCartItems(cart);
      setSelectedIssues([]);
      setDeviceName('');
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    } else {
      setErrorLottie(true);
      setSuccessMessage(message);
      setShowFormModal(false);
      setShowModal(true);
      setSelectedIssues([]);
      setDeviceName('');
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    }
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  return (
    <>
      {IssueLoader ? (
        <Loader />
      ) : (
        <div>
          <Container>
            <Modal show={deviceModal} centered className="p-2 mt-5">
              <div
                className="position-absolute"
                style={{ top: '15px', left: '10px' }}
              >
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
              </div>
              <Paragraph
                className="text-center mt-md-4 mt-5 pt-md-0 pt-2"
                fontSize="23px"
                fontWeight={400}
              >
                Select your Device
              </Paragraph>

              {allIssues.length > 0 ? (
                <>
                  <Modal.Body
                    style={{ maxHeight: '400px', overflowY: 'scroll' }}
                  >
                    <Row className="justify-content-center p-2 flex-wrap align-items-center gap-2">
                      {allIssues.map((device, index) => (
                        <Col
                          key={device._id}
                          className={`d-flex flex-column repair-card justify-content-center p-2 align-items-center m-2 col-auto pointer`}
                          onClick={() => handleSelectDevice(device.deviceName)}
                          xs={4}
                          sm={4}
                          md={4}
                          lg={4}
                          style={{
                            border: '1px solid #dee2e6',
                            borderRadius: '4px',
                            maxWidth: '250px',
                          }}
                        >
                          <div
                            style={{ maxWidth: '150px', maxHeight: '100px' }}
                          >
                            <img
                              src={device.image}
                              alt={`image`}
                              className={`p-2 rounded`}
                              style={{
                                objectFit: 'contain',
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          </div>
                          <Paragraph
                            className={'m-0 p-0 text-center'}
                            fontSize={'16px'}
                          >
                            {device.deviceName}
                          </Paragraph>
                        </Col>
                      ))}
                    </Row>
                  </Modal.Body>
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
            </Modal>

            {quickText === 'Quick' && quickText != '' ? (
              devices.length > 0 ? (
                <>
                  <Paragraph
                    className="text-center mt-4"
                    fontSize="15px"
                    fontWeight={400}
                  >
                    Select your Issues
                  </Paragraph>
                  <Row className="justify-content-center align-items-center gap-2">
                    {devices &&
                      devices.map((issue, index) => (
                        <Col
                          key={issue._id}
                          className={`d-flex flex-column repair-card justify-content-center p-4 align-items-center m-2 col-auto pointer`}
                          onClick={() => handleIssueClick(issue.issueName)}
                          style={{
                            border: selectedIssues.includes(issue.issueName)
                              ? `2px solid ${color}`
                              : '1px solid #dee2e6',
                            borderRadius: '4px',
                          }}
                        >
                          <img
                            src={issue.issueImage}
                            width={80}
                            height={40}
                            alt={`${issue.issueName} image`}
                            className={`p-2 rounded`}
                            style={{ objectFit: 'contain' }}
                          />
                          <Paragraph className={'m-0 p-0 '} fontSize={'13px'}>
                            {issue.issueName}
                          </Paragraph>
                        </Col>
                      ))}
                  </Row>

                  <div className="text-center mt-3">
                    <Button
                      onClick={() =>
                        phoneNumber.length > 0
                          ? handleAddToCartQuickService()
                          : handleAddToCartLocalQuickService()
                      }
                      className="bg-main  mt-4 px-3 py-1 w-100"
                      style={{ backgroundColor: color, borderColor: color }}
                      disabled={
                        deviceName.length !== 0 && selectedIssues.length === 0
                      }
                    >
                      Add to Cart{' '}
                    </Button>
                  </div>
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
              )
            ) : deviceIssues.length > 0 ? (
              <>
                <Paragraph
                  className="text-center mt-4"
                  fontSize="15px"
                  fontWeight={400}
                >
                  Select your Issues
                </Paragraph>
                <Row className="justify-content-center align-items-center gap-2">
                  {deviceIssues &&
                    deviceIssues.map((issue, index) => (
                      <Col
                        key={issue._id}
                        className={`d-flex flex-column repair-card justify-content-center p-4 align-items-center m-2 col-auto pointer`}
                        onClick={() =>
                          deviceName.length > 0
                            ? handleIssueClick(issue.issueName)
                            : setDeviceModal(true)
                        }
                        style={{
                          border: selectedIssues.includes(issue.issueName)
                            ? `2px solid ${color}`
                            : '1px solid #dee2e6',
                          borderRadius: '4px',
                        }}
                      >
                        <img
                          src={issue.issueImage}
                          width={80}
                          height={40}
                          alt={`${issue.issueName} image`}
                          className={`p-2 rounded`}
                          style={{ objectFit: 'contain' }}
                        />
                        <Paragraph className={'m-0 p-0 '} fontSize={'13px'}>
                          {issue.issueName}
                        </Paragraph>
                      </Col>
                    ))}
                </Row>
                <div className="text-center mt-3">
                  <Button
                    onClick={() =>
                      deviceName.length > 0
                        ? phoneNumber.length > 0
                          ? handleAddToCart()
                          : handleAddToLocalCart()
                        : setDeviceModal(true)
                    }
                    className="bg-main  mt-4 px-3 py-1 w-100"
                    style={{ backgroundColor: color, borderColor: color }}
                    disabled={
                      deviceName.length !== 0 && selectedIssues.length === 0
                    }
                  >
                    {deviceName.length > 0
                      ? 'Add to Cart'
                      : 'Select Your Device'}
                  </Button>
                </div>
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
            <Col className="text-center mt-4 mb-3">
              <h4 className="mt-5">What's in it for you</h4>
              <Row>
                <Col>
                  <ul
                    className="d-flex justify-content-center flex-row mt-3"
                    style={{ listStyle: 'none', padding: 0 }}
                  >
                    <li
                      onClick={() => navigate('/price-chart')}
                      style={{
                        height: '50px',
                        width: '145px',
                        borderRadius: '25px 0 0 5px',
                        color: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '600',
                        lineHeight: '26px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        border: `2px solid ${color}`,
                      }}
                    >
                      <FaFileInvoiceDollar size={20} className="me-1" />
                      Price list
                    </li>

                    <li
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '50px',
                        width: '145px',
                        borderRadius: '0 5px 25px 0',
                        backgroundColor: 'transparent',
                        color: '#000',
                        fontWeight: '600',
                        lineHeight: '26px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        border: `2px solid ${color}`,
                      }}
                      onClick={handleShow}
                    >
                      {/* Shield icon */}
                      <FaShieldAlt
                        style={{ fontSize: '20px' }}
                        className="me-2"
                      />
                      Warranty
                    </li>
                  </ul>
                </Col>
              </Row>

              <Modal
                show={warrantyshowModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title className="fs-5">
                    Warranty Information
                  </Modal.Title>
                </Modal.Header>
                <Col style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                  <Modal.Body>
                    <Col className="container">
                      <img
                        src={Warrenty}
                        alt="Warranty"
                        style={{
                          width: '100%',
                          height: '280px',
                          objectFit: 'contain',
                          display: 'block',
                          margin: '0 auto',
                        }}
                      />
                    </Col>
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

                    <div className="container card mt-3">
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
                  </Modal.Body>
                </Col>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* <h5
                className="animation "
                style={{
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/price-chart')}
              >
                Price List
              </h5> */}
            </Col>
            <Col className="text-center mt-4 mb-3">
              <h4>Our Repair & Services</h4>
              <Col md={12} className="my-3">
                <Card onClick={handleNavigate} className="pointer">
                  <Row className="my-4 mx-1">
                    <Col md={4}>
                      <Card.Img
                        variant="top"
                        width="200px"
                        height="200px"
                        src={laptop1}
                        alt="topImage"
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title>Laptop Service</Card.Title>
                        <Card.Text className="text-start">
                          Our laptop service offers comprehensive repair and
                          maintenance solutions, ensuring your device runs
                          smoothly and efficiently. With expert technicians and
                          quick turnaround times, we address hardware and
                          software issues professionally. Trust us for reliable
                          service and competitive pricing to keep your laptop in
                          top condition.{' '}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Col>
            <Modal
              show={showFormModal}
              onHide={() => setShowFormModal(false)}
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title className="fs-5">
                  Repair and Service Application Form
                </Modal.Title>
              </Modal.Header>

              <Formik
                initialValues={{
                  ...initialValues,
                  phoneNumber: phoneNumber || '',
                  issue: selectedIssues.toString(),
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
                    <Modal.Body
                      style={{ maxHeight: '400px', overflowY: 'scroll' }}
                    >
                      <Row>
                        <Col md={6} className="my-1">
                          <Form.Group>
                            <Form.Label>
                              Device <span className="text-danger">*</span>
                            </Form.Label>
                            <Field
                              type="text"
                              value={deviceName}
                              className="form-control"
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="my-1">
                          <Form.Group>
                            <Form.Label>
                              Brand <span className="text-danger">*</span>
                            </Form.Label>
                            <Field
                              type="text"
                              name="brand"
                              placeholder="Enter your Brand"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="brand"
                              component="div"
                              className="text-danger"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className="my-1">
                          <Form.Group>
                            <Form.Label>
                              Model <span className="text-danger">*</span>
                            </Form.Label>
                            <Field
                              type="text"
                              name="model"
                              placeholder="Enter your Model"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="model"
                              component="div"
                              className="text-danger"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="my-1">
                          <Form.Group>
                            <Form.Label>
                              Operating System{' '}
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Field
                              type="text"
                              name="os"
                              className="form-control"
                              placeholder="Enter your Operating system"
                            />
                            <ErrorMessage
                              name="os"
                              component="div"
                              className="text-danger"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className="my-1">
                          <Form.Group>
                            <Form.Label>
                              Issue <span className="text-danger">*</span>
                            </Form.Label>
                            <Field
                              type="text"
                              name="issue"
                              className="form-control"
                              readOnly
                            />
                            <ErrorMessage
                              name="issue"
                              component="div"
                              className="text-danger"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} className="my-1">
                          <Form.Group>
                            <Form.Label>
                              Issue Details{' '}
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Field
                              type="text"
                              name="issueDetails"
                              className="form-control"
                              placeholder="Enter your Issue Details"
                            />
                            <ErrorMessage
                              name="issueDetails"
                              component="div"
                              className="text-danger"
                            />
                          </Form.Group>
                        </Col>
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
                          className="form-check-label mx-1"
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
                        label="Add to cart"
                        isLoading={isLoading}
                      />
                    </Modal.Body>
                  </Form>
                )}
              </Formik>
              {/* </Col> */}
            </Modal>
          </Container>
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
        </div>
      )}
    </>
  );
};

export default RepairService;
