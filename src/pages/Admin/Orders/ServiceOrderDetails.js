import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import BasicTable from '../../../components/TableComponent';
import { useGetRentalOrderDetailsQuery } from '../../../redux/api/RentalOrderDetailsApi';
import { BsSearch, BsX } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import SuccessModal from '../../../components/SuccessModal';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import { useTheme } from '../../../Contexts/ThemeContext';

const ServiceOrderDetails = () => {
  const { color } = useTheme();
  const { requestId, type } = useParams();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(false);

  const role = getRole();

  const {
    data: ServiceOrderDetailsData,
    isLoading,
    refetch,
    error,
    isError,
  } = useGetRentalOrderDetailsQuery({
    requestId: requestId,
    type: type,
    search: searchTerm,
    role: role,
  });

  useEffect(() => {
    if (ServiceOrderDetailsData && ServiceOrderDetailsData.data) {
      setData(ServiceOrderDetailsData.data);
    }
    if (isError) {
      if (error && error.status === 403) {
        setMessage(error.data.error);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false), setMessage('');
        }, 4000);
      } else {
        console.warn('Unexpected error structure:', error);
      }
    }
  }, [ServiceOrderDetailsData, isError, error, role]);

  const handleClear = () => {
    setSearchInput('');
    setSearchTerm('');
  };

  const handleSearch = () => {
    setIsSearching(true);
    setSearchTerm(searchInput);
    refetch({ requestId, type, search: searchInput }).then(() => {
      setIsSearching(false);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const COLUMNS = [
    { Header: 'ID', accessor: (d, i) => i + 1 },
    { Header: 'User Name', accessor: 'userName' },
    { Header: 'Phone Number', accessor: 'phoneNumber' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Type', accessor: 'type' },
    { Header: 'Issue', accessor: 'issue' },
    { Header: 'Issue Details', accessor: 'issueDetails' },
    { Header: 'Request Id', accessor: 'requestId' },
    { Header: 'Laptop Brand', accessor: 'brand' },
    { Header: 'Laptop Model', accessor: 'model' },
    { Header: 'Operating System', accessor: 'operatingSystem' },
    { Header: 'Booking Address', accessor: 'bookingAddress' },
    { Header: 'Shipping Address', accessor: 'shippingAddress' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Coupon Code', accessor: 'couponCode' },
    { Header: 'Coupon Type', accessor: 'couponType' },
    { Header: 'Coupon Value', accessor: 'couponValue' },
    { Header: 'Created At', accessor: 'createdAt' },
    { Header: 'Updated At', accessor: 'updatedAt' },
  ];

  return (
    <div>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <>
          <Container fluid className="mt-3 reduced-width-row ">
            <Row className="boxShadow p-4 mb-4 mt-4">
              <Col className="d-flex flex-row justify-content-between mt-1">
                <h4 className="fw-bold">Order Details</h4>
              </Col>
            </Row>
            <Row className="boxShadow p-4 mb-3 mt-3 d-flex flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row">
              <Col className="my-2 mx-2" xxl={3} xl={3} lg={3} sm={6} md={6}>
                <div className="input-group">
                  <span className="input-group-text">
                    <BsSearch />
                  </span>
                  <input
                    type="text"
                    placeholder="Search ServiceOrderDetails..."
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
                className="d-flex flex-column text-center my-2"
                xxl={2}
                xl={2}
                lg={2}
                sm={3}
                md={3}
              >
                <Button
                  style={{ backgroundColor: color, border: 'none' }}
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </Col>
            </Row>
            <Row className="boxShadow p-4 mb-4">
              <BasicTable COLUMNS={COLUMNS} MOCK_DATA={data} />
            </Row>
            <SuccessModal
              error={true}
              setShowModal={() => setShowModal(false)}
              showModal={showModal}
              successMessage={message}
            />
          </Container>
        </>
      )}
    </div>
  );
};

export default ServiceOrderDetails;
