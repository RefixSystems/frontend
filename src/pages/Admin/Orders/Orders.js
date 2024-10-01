import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  Form,
  Spinner,
} from 'react-bootstrap';
import BasicTable from '../../../components/TablePaginationComponent';
import {
  useDeleteOrdersMutation,
  useGetOrdersQuery,
  useAcceptOtpMutation,
  useConfirmOtpMutation,
} from '../../../redux/api/OrdersApi';
import { BsSearch, BsX } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { useParams, useNavigate, Link } from 'react-router-dom';
import RequestIdCell from '../../../components/RequestIdCell';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import { IoIosPaper } from 'react-icons/io';
import ServerError from '../../../components/ServerError';
import { getPhoneNumber } from '../../../Constants/PhoneNumberGlobal';
const Orders = () => {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [selectedAssigned, setSelectedAssigned] = useState('All');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [idToEdit, setIdToEdit] = useState('');
  const [showOtpEnterModal, setShowOtpEnterModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [requestId, setRequestId] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [timer, setTimer] = useState(120);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const [count, setCount] = useState(0);
  const inputRefs = useRef([]);
  const timerRef = useRef(null);
  const role = getRole();
  const PhoneNumberGlobal = getPhoneNumber();
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  const {
    data: OrdersData,
    isLoading,
    isError,
    error,
    refetch: refetchRoleAccess,
  } = useGetOrdersQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    assigned: selectedAssigned === 'All' ? '' : selectedAssigned,
    role: role,
    startDate: startDate,
    endDate: endDate,
    dayFilter: selectedPeriod,
    phoneNumber: PhoneNumberGlobal,
  });

  const [deleteOrders] = useDeleteOrdersMutation();
  const [acceptOtp] = useAcceptOtpMutation();
  const [confirmOtp] = useConfirmOtpMutation();

  const handleInvoice = (requestId) => {
    navigate(`/admin/invoice/${requestId}`);
  };

  useEffect(() => {
    if (OrdersData && OrdersData.data) {
      setData(OrdersData.data);
      setStartIndex(OrdersData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(OrdersData.pagination.totalItems);
      setEndIndex(OrdersData.pagination.endIndex);
      setTotalPages(OrdersData.pagination.totalPages);
      setWrite(OrdersData.moduleAccess.write);
      setRead(OrdersData.moduleAccess.read);
      setFullAccess(OrdersData.moduleAccess.fullAccess);
      setCount(OrdersData.orderCount);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [OrdersData, currentPage, role, error, isError]);

  useEffect(() => {
    if (showOtpModal) {
      inputRefs.current[0]?.focus();
    }
  }, [showOtpModal]);

  useEffect(() => {
    if (showOtpEnterModal) {
      startTimer();
    }
    return () => {
      // Cleanup timer interval on component unmount
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [showOtpEnterModal]);

  const startTimer = () => {
    setTimer(120);
    setResendEnabled(false);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setResendEnabled(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleClear = () => {
    setSearchInput('');
    setSearchTerm('');
  };

  const handleSearch = () => {
    setIsSearching(true);
    setSearchTerm(searchInput);
    refetchRoleAccess({ page: currentPage, search: searchInput }).then(() => {
      setIsSearching(false);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleDeleteOrders = async () => {
    try {
      const response = await deleteOrders({ id: idToDelete, role: role });
      setDeleteShow(false);
      setIdToDelete('');
      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        refetchRoleAccess();
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (id, customerLocationReached, requestId) => {
    if (role === 'Admin') {
      navigate(`/admin/edit-order/${id}`);
    } else if (customerLocationReached) {
      navigate(`/admin/edit-order/${id}`);
    } else {
      setIdToEdit(id);
      setRequestId(requestId);
      setShowOtpModal(true);
    }
  };

  const handleOtpSend = async () => {
    setShowOtpModal(false);
    const selectedOrder = data.find((order) => order._id === idToEdit);
    if (selectedOrder && selectedOrder.phoneNumber) {
      // Remove the +91 from the phone number
      const phoneNumberWithoutPrefix = selectedOrder.phoneNumber.replace(
        /^(\+91)/,
        ''
      );
      setPhoneNumber(phoneNumberWithoutPrefix);
      try {
        const response = await acceptOtp({
          phoneNumber: phoneNumberWithoutPrefix,
        });
        if (response?.data?.data.responseCode === 200) {
          setShowOtpEnterModal(true);
          setVerificationId(response.data.data.data.verificationId);
          toast.success('OTP sent successfully!', { autoClose: 1000 });
        } else {
          toast.error(response?.data.data.message, { autoClose: 1000 });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Selected order or phone number is undefined.');
    }
  };

  const handleOtpCancel = () => {
    setShowOtpModal(false);
  };

  const handleOtpEnterCancel = () => {
    setShowOtpEnterModal(false);
    setOtp(new Array(4).fill(''));
  };

  const handleOtpSubmit = async () => {
    const otpValue = otp.join('');
    if (otpValue.length < 4) {
      setOtpError(true);
    } else {
      try {
        const response = await confirmOtp({
          requestId,
          phoneNumber,
          verificationId,
          code: otpValue,
        });

        if (
          response.data.data.data.verificationStatus ===
          'VERIFICATION_COMPLETED'
        ) {
          toast.success('OTP verified successfully!', { autoClose: 1000 });
          setShowOtpEnterModal(false);
          setOtp(new Array(4).fill(''));
          navigate(`/admin/edit-order/${idToEdit}`);
        } else {
          toast.error(response?.data?.message || 'Failed to verify OTP', {
            autoClose: 1000,
          });
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to verify OTP', { autoClose: 1000 });
      }
      setOtpError(false);
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleResendOtp = async () => {
    const selectedOrder = data.find((order) => order._id === idToEdit);

    if (selectedOrder && selectedOrder.phoneNumber) {
      const phoneNumberWithoutPrefix = selectedOrder.phoneNumber.replace(
        /^(\+91)/,
        ''
      );
      setPhoneNumber(phoneNumberWithoutPrefix);
      try {
        const response = await acceptOtp({
          phoneNumber: phoneNumberWithoutPrefix,
        });
        console.log(response?.data?.data);
        console.log('-----------------------------');
        if (response?.data?.data.responseCode === 200) {
          setVerificationId(response.data.data.data.verificationId);
          toast.success('OTP sent successfully!', { autoClose: 1000 });
          startTimer();
        } else {
          toast.error(response?.data.data.message, { autoClose: 1000 });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Selected order or phone number is undefined.');
    }
  };

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: 's_no',
    },
    {
      Header: 'User Name',
      accessor: 'userName',
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber',
    },
    {
      Header: 'Alternate PhoneNumber',
      accessor: 'alternatePhoneNumber',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Address',
      accessor: 'address',
    },

    {
      Header: 'Request Id',
      accessor: 'requestId',
      Cell: ({ row }) => {
        const { requestId, type } = row.original;
        return <RequestIdCell requestId={requestId} type={type} />;
      },
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },

    {
      Header: 'Notes',
      accessor: 'notes',
    },
    {
      Header: 'Bill Generated',
      accessor: 'billGenerated',
    },
    {
      Header: 'Initial Amount',
      accessor: 'amount',
    },
    {
      Header: ' Initial Amount Paid Through',
      accessor: 'initialAmountPaidThrough',
    },
    {
      Header: 'Assigned On',
      accessor: 'assignedOn',
    },
    {
      Header: 'Assigned To',
      accessor: 'assignedTo',
    },
    {
      Header: 'Technician Comments',
      accessor: 'technicianComments',
    },
    {
      Header: 'Closed On',
      accessor: 'closedOn',
    },
    {
      Header: 'Paid Through',
      accessor: 'paidThrough',
    },
    {
      Header: 'Final Transaction Id',
      accessor: 'finalTransactionId',
    },
    {
      Header: 'Final Amount Paid',
      accessor: 'finalAmountPaid',
    },
    {
      Header: 'Total Amount Paid',
      accessor: 'totalAmountPaid',
    },

    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ value }) => formatDateTime(value),
    },
    {
      Header: 'Updated At',
      accessor: 'updatedAt',
      Cell: ({ value }) => formatDateTime(value),
    },
  ];
  if (fullAccess) {
    COLUMNS.push({
      Header: 'ACTIONS',
      accessor: 'action',
      Cell: (props) => {
        const {
          _id: rowIdx,
          customerLocationReached,
          requestId,
          billGenerated,
        } = props.row.original;
        const printerButtonVariant =
          billGenerated === 'yes' ? 'success' : 'secondary';
        const handlePrinterClick = () => {
          if (billGenerated === 'yes') {
            const { requestId } = props.row.original;
            handleInvoice(requestId);
          }
        };

        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            {billGenerated === 'yes' ? (
              <Button
                variant={printerButtonVariant}
                className="ms-2"
                onClick={handlePrinterClick}
              >
                <IoIosPaper />
              </Button>
            ) : (
              <Link to={`/admin/bill-information/${rowIdx}`}>
                <Button variant={printerButtonVariant} className="ms-2">
                  <IoIosPaper />
                </Button>
              </Link>
            )}

            <Button
              variant="warning"
              className="ms-2"
              onClick={() =>
                handleEditClick(rowIdx, customerLocationReached, requestId)
              }
            >
              <FaEdit />
            </Button>

            {/* <Button
              variant="danger"
              className="ms-2"
              onClick={() => deleteHandleShow(rowIdx)}
            >
              <MdDelete />
            </Button> */}
          </div>
        );
      },
    });
  }

  return (
    <div>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <>
          {hasServerError ? (
            <ServerError />
          ) : read ? (
            <Container fluid className="mt-3 ">
              <Row className="boxShadow p-4 mb-4 mt-4 align-items-center">
                <Col
                  xs={12}
                  md={2}
                  className="d-flex align-items-center justify-content-start mb-3 mb-md-0"
                >
                  <h4 className="fw-bold mb-0">Orders</h4>
                </Col>

                <Col
                  xs={12}
                  sm={6}
                  md={3}
                  className="d-flex flex-column align-items-start  mb-3 mb-md-0"
                >
                  <p className="mb-0">
                    Total Orders: {OrdersData?.totalOrders}
                  </p>
                  <p className="mb-0">
                    Completed Orders: {OrdersData?.completedOrders}
                  </p>
                </Col>

                <Col
                  xs={12}
                  sm={6}
                  md={3}
                  className="d-flex flex-column align-items-start  mb-3 mb-md-0"
                >
                  <p className="mb-0">
                    In Process Orders: {OrdersData?.inProcessOrders}
                  </p>
                  <p className="mb-0">
                    Pending Orders: {OrdersData?.pendingOrders}
                  </p>
                </Col>

                <Col
                  xs={12}
                  sm={6}
                  md={3}
                  className="d-flex flex-column align-items-start  mb-3 mb-md-0"
                >
                  <p className="mb-0">
                    In Transit Orders: {OrdersData?.inTransitOrders}
                  </p>
                  <p className="mb-0">
                    Cancelled Orders: {OrdersData?.cancelledOrders}
                  </p>
                </Col>
              </Row>

              <Row className="boxShadow p-3 mb-4 d-flex flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row">
                <Col className="my-4 mx-2" xxl={3} xl={3} lg={3} sm={6} md={6}>
                  <div className="input-group">
                    <span className="input-group-text">
                      <BsSearch />
                    </span>
                    <input
                      type="text"
                      placeholder="Search Orders..."
                      className="form-control"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    {searchInput && (
                      <span className="input-group-text" onClick={handleClear}>
                        <BsX />
                      </span>
                    )}
                  </div>
                </Col>
                <Col
                  className="d-flex flex-column text-center my-4"
                  xxl={2}
                  xl={2}
                  lg={2}
                  sm={3}
                  md={3}
                >
                  <Button
                    style={{ backgroundColor: color, border: 'none' }}
                    onClick={handleSearch}
                    disabled={isSearching || searchInput === ''}
                  >
                    {isSearching ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Searching...
                      </>
                    ) : (
                      'Search'
                    )}
                  </Button>
                </Col>
              </Row>
              <Row className="boxShadow p-4 mb-4">
                <BasicTable
                  COLUMNS={COLUMNS}
                  MOCK_DATA={data}
                  currentPage={currentPage}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  setCurrentPage={setCurrentPage}
                  totalItems={totalItems}
                  totalPages={totalPages}
                  count={count}
                />
              </Row>

              <DeleteModel
                YES={handleDeleteOrders}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this Orders"
                DELETETITLE="Orders"
              />
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}

      {/* Send OTP Modal */}
      <Modal show={showOtpModal} onHide={handleOtpCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Send OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Customer location has not been reached. Do you want to send an OTP to
          the customer?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOtpCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleOtpSend}
            style={{ backgroundColor: color, border: 'none' }}
          >
            Send OTP
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Enter OTP Modal */}
      <Modal show={showOtpEnterModal} onHide={handleOtpEnterCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>
              Enter the OTP sent to {phoneNumber} Number{' '}
              <span className="text-danger">*</span>
            </Form.Label>
            <div className="d-flex justify-content-between">
              {otp.map((data, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="otp-input mx-1"
                  style={{
                    width: '3rem',
                    height: '3rem',
                    margin: '0 0.5rem',
                    fontSize: '1rem',
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.3)',
                    textAlign: 'center',
                  }}
                  centered
                />
              ))}
            </div>
            {otpError && (
              <Form.Text className="text-danger">
                Please enter the OTP.
              </Form.Text>
            )}
          </Form.Group>
          <div className="text-center mt-3">
            <p>Resend OTP in {timer} seconds</p>
            <Button
              onClick={handleResendOtp}
              variant="link"
              disabled={!resendEnabled}
            >
              Resend OTP
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOtpEnterCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOtpSubmit}>
            Submit OTP
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
