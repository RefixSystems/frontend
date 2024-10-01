import React, { useState, useEffect } from 'react';
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
  useDeleteQuotesMutation,
  useEditQuotesMutation,
  useGetQuotesQuery,
} from '../../../redux/api/QuotesApi';
import { BsSearch, BsX } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import ServerError from '../../../components/ServerError';
import { getPhoneNumber } from '../../../Constants/PhoneNumberGlobal';
const Quotes = () => {
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
  const [editId, setEditId] = useState(null);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [status, setstatus] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [fullAccess, setFullAccess] = useState(false);
  const [read, setRead] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const [count, setCount] = useState(0);
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  const role = getRole();
  const phoneNumber = getPhoneNumber();


  const {
    data: QuotesData,
    isLoading,
    isError, 
    error,
    refetch,
  } = useGetQuotesQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    role: role,
    phoneNumber:phoneNumber,
  });
  const [editQuotesData] = useEditQuotesMutation();
  const [deleteQuotes] = useDeleteQuotesMutation();
  useEffect(() => {
    if (QuotesData && QuotesData.data) {
      setData(QuotesData.data);
      setStartIndex(QuotesData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(QuotesData.pagination.totalItems);
      setEndIndex(QuotesData.pagination.endIndex);
      setTotalPages(QuotesData.pagination.totalPages);
      setFullAccess(QuotesData.moduleAccess.fullAccess);
      setRead(QuotesData.moduleAccess.read);
      setCount(QuotesData.quoteCounts);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [QuotesData, currentPage, role,error,isError]);

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

  const handleEditShow = (id) => {
    const Quotes = data.find((d) => d._id === id);

    if (Quotes) {
      setEditId(id);
      setstatus(Quotes.status);
      setAddress(Quotes.address);
      setNotes(Quotes.notes);

      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setstatus('');
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handlestatusChange = (e) => {
    setstatus(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleDeleteQuotes = async () => {
    try {
      const response = await deleteQuotes({ id: idToDelete, role: role });
      setDeleteShow(false);
      setIdToDelete('');
      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditData = async () => {
    if (!status || !address || !notes) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);
    try {
      const response = await editQuotesData({
        id: editId,
        role: role,
        data: {
          status: status,
          address:address,
          notes: notes,
        },
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setEditShow(false);
        refetch();
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      Header: 'Rental Request Details',
      accessor: 'requestId',
      Cell: (props) => {
        const requestId = props.row.original.requestId;
        return (
          <Link
            to={`/admin/quotes-details/${requestId}`}
            style={{ color: '#245bad' }}
          >
            {requestId}
          </Link>
        );
      },
    },

    {
      Header: 'Address',
      accessor: 'address',
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
        const rowIdx = props.row.original._id;
        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <Button variant="warning" onClick={() => handleEditShow(rowIdx)}>
              <FaEdit />
            </Button>
            <Button
              variant="danger"
              className="ms-2"
              onClick={() => deleteHandleShow(rowIdx)}
            >
              <MdDelete />
            </Button>
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
         <ServerError/>
        ) : read ? (
            <Container fluid className="mt-3 ">
              <Row className="boxShadow p-4 mb-4 mt-4">
                <Col className="d-flex flex-row justify-content-between mt-1">
                  <h4 className="fw-bold">Quotes</h4>
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
                      placeholder="Search Quotes..."
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
                YES={handleDeleteQuotes}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this Quotes"
                DELETETITLE="Quotes"
              />
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}

      <Modal show={editShow} onHide={handleEditClose} centered dialogClassName="all-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Quotes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="statusDropdown" className="mt-3">
              <Form.Label>Edit Status:</Form.Label>
              <Form.Select value={status} onChange={handlestatusChange}>
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Confirmed">Confirmed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="bookingAddress" className="mt-3">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={address}
                onChange={handleAddressChange}
                disabled
              />
            </Form.Group>
            
            <Form.Group controlId="notes" className="mt-3">
              <Form.Label>Notes:</Form.Label>
              <Form.Control
                type="text"
                value={notes}
                onChange={handleNotesChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleEditData}
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
                Updating...
              </>
            ) : (
              'Update'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Quotes;
