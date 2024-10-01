import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  Form,
  Spinner,
  Card,
  Pagination,
} from 'react-bootstrap';
import {
  BsChevronDoubleLeft,
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleRight,
  BsSearch,
  BsX,
} from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  useAddServiceAreaMutation,
  useEditServiceAreaMutation,
  useGetServiceAreaQuery,
} from '../../../../redux/api/ServiceAreaApi';
import { getRole } from '../../../../Constants/Global';
import FetchLoader from '../../../../components/FetchLoader';
import NoAccess from '../../../../components/NoAccess';
import { useTheme } from '../../../../Contexts/ThemeContext';
import ServerError from '../../../../components/ServerError';
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

const ServiceArea = () => {
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
  const [addShow, setAddShow] = useState(false);
  const [pincode, setPincode] = useState('');
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [toggle, setToggle] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const role = getRole();

  const {
    data: ServiceAreaData,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetServiceAreaQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    role: role,
  });
  const [editServiceAreaData] = useEditServiceAreaMutation();
  const [addServiceArea] = useAddServiceAreaMutation();

  useEffect(() => {
    if (ServiceAreaData && ServiceAreaData.data) {
      setData(ServiceAreaData.data);
      setStartIndex(ServiceAreaData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(ServiceAreaData.pagination.totalItems);
      setEndIndex(ServiceAreaData.pagination.endIndex);
      setTotalPages(ServiceAreaData.pagination.totalPages);
      setFullAccess(ServiceAreaData.moduleAccess.fullAccess);
      setWrite(ServiceAreaData.moduleAccess.write);
      setRead(ServiceAreaData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [ServiceAreaData, currentPage, role, error, isError]);

  const handleClear = () => {
    setSearchInput('');
    setSearchTerm('');
  };

  const handleSearch = () => {
    setIsSearching(true);
    setSearchTerm(searchInput);
    refetch({ page: currentPage, search: searchInput }).then(() => {
      setIsSearching(false);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCheckboxClick = (rowIdx, check) => {
    setSelectedRowId(rowIdx);
    setShowConfirmationModal(true);
    setToggle(check);
  };

  const handleAddPincode = (e) => {
    setPincode(e.target.value);
  };

  const handleConfirmToggle = async () => {
    setLoading(true);

    const toggledValue = toggle === 'yes' ? 'no' : 'yes';
    try {
      const data = {
        provideService: toggledValue,
      };

      const response = await editServiceAreaData({
        id: selectedRowId,
        role: role,
        data: data,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setShowConfirmationModal(false);
        refetch();
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setShowConfirmationModal(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddShow = () => {
    setAddShow(true);
  };

  const handleAddClose = () => {
    setAddShow(false);
    setPincode('');
  };

  const handleAddData = async () => {
    
    const pincodePattern = /^\d{6}$/;
    if (!pincodePattern.test(pincode)) {
      toast.error('Please enter a valid 6-digit pincode', { autoClose: 1000 });
      return;
    }
  
    setLoading(true);
  
    try {
      const data = {
        pincode: pincode,
      };
      const response = await addServiceArea({
        role: role,
        data: data,
      });
  
      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setAddShow(false);
        refetch();
        setPincode('');
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add Service Area.', { autoClose: 1000 });
    } finally {
      setLoading(false);
    }
  };
  
  // Pagination Items
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
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
            <Container fluid className="mt-3">
              {/* Header */}
              <Row className="boxShadow p-4 mb-4 mt-4">
                <Col className="d-flex flex-row justify-content-between mt-1">
                  <h4 className="fw-bold">Service Area</h4>
                  {write && (
                    <Button
                      style={{ backgroundColor: color, border: 'none' }}
                      className="p-2 m-1"
                      onClick={handleAddShow}
                    >
                      <FaPlus size={20} />
                      <span className="d-none d-md-inline ms-2">
                        Add Service Area
                      </span>
                    </Button>
                  )}
                </Col>
              </Row>

              {/* Search */}
              <Row className="boxShadow p-3 mb-4 d-flex flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row">
                <Col className="my-4 mx-2" xxl={3} xl={3} lg={3} sm={6} md={6}>
                  <div className="input-group">
                    <span className="input-group-text">
                      <BsSearch />
                    </span>
                    <input
                      type="text"
                      placeholder="Search Service Areas..."
                      className="form-control"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    {searchInput && (
                      <span
                        className="input-group-text"
                        onClick={handleClear}
                        style={{ cursor: 'pointer' }}
                      >
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

              {/* Service Areas Grid */}
              <Row className="boxShadow p-4 mb-0">
                {data.length > 0 ? (
                  <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {data.map((serviceArea) => (
                      <Col key={serviceArea._id}>
                        <Card className="h-100">
                          <Card.Body className="d-flex flex-column">
                            <Card.Title>
                              Pincode: {serviceArea.pincode}
                            </Card.Title>
                            <Card.Text>
                              {/* You can add more details here if needed */}
                            </Card.Text>
                            <div className="mt-auto text-center">
                              <Button
                                variant={
                                  serviceArea.provideService === 'yes'
                                    ? 'success'
                                    : 'danger'
                                }
                                className="me-2"
                                onClick={() => {
                                  handleCheckboxClick(
                                    serviceArea._id,
                                    serviceArea.provideService
                                  );
                                }}
                              >
                                {serviceArea.provideService === 'yes'
                                  ? 'Yes'
                                  : 'No'}
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Col>
                    <p className="text-center">No Service Areas found.</p>
                  </Col>
                )}
              </Row>

              {/* Pagination */}
              {totalPages > 1 && (
                <Row className="mb-4 mt-4">
                  <Col className="mt-3 d-none d-sm-none d-md-none d-xxl-flex d-xl-flex d-lg-flex justify-content-end align-items-center">
                    <ReactPaginate
                      breakLabel="..."
                      onPageChange={(selectedPage) =>
                        setCurrentPage(selectedPage.selected + 1)
                      }
                      pageRangeDisplayed={5}
                      pageCount={totalPages}
                      renderOnZeroPageCount={null}
                      activeClassName={'active'}
                      pageClassName={'page-item'}
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      containerClassName="pagination"
                      previousLabel={
                        <IconContext.Provider
                          value={{ color: color, size: '28px' }}
                        >
                          <AiFillLeftCircle />
                        </IconContext.Provider>
                      }
                      nextLabel={
                        <IconContext.Provider
                          value={{ color: color, size: '28px' }}
                        >
                          <AiFillRightCircle />
                        </IconContext.Provider>
                      }
                    />
                  </Col>

                  {/* Small screens: Render buttons with icons */}
                  <Col className="d-flex d-sm-flex d-md-flex d-xxl-none d-xl-none d-lg-none justify-content-end align-items-center">
                    <Button
                      style={{ backgroundColor: color, border: 'none' }}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="m-2"
                    >
                      <BiLeftArrow size={14} />
                    </Button>
                    <Button
                      style={{ backgroundColor: color, border: 'none' }}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <BiRightArrow size={14} />
                    </Button>
                  </Col>
                </Row>
              )}
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}

      {/* Edit Service Area Modal */}
      <Modal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to update ?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmationModal(false)}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: color }}
            onClick={handleConfirmToggle}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Confirm...
              </>
            ) : (
              'Confirm'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Add Service Area Modal */}
      <Modal
        show={addShow}
        onHide={handleAddClose}
        centered
        dialogClassName="all-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Service Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="addDeviceInput" className="mb-3">
              <Form.Label>
                Pincode <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the pincode here"
                value={pincode}
                onChange={handleAddPincode}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleAddData}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Adding...
              </>
            ) : (
              'Add'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiceArea;
