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
import { BsSearch, BsX } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import {
  useDeleteCustomLaptopRequestsMutation,
  useEditCustomLaptopRequestsMutation,
  useGetCustomLaptopRequestsQuery,
} from '../../../redux/api/CustomLaptopRequestsApi';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';

const CustomLaptopRequests = () => {
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
  const [editId, setEditId] = useState(null);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [status, setstatus] = useState('');
  const [note, setNote] = useState('');

  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const role = getRole();

  const {
    data: CustomLaptopRequestsData,
    refetch,
    isLoading,
  } = useGetCustomLaptopRequestsQuery({
    page: currentPage,
    search: searchTerm,
    role: role,
  });
  const [editCustomLaptopRequestsData] = useEditCustomLaptopRequestsMutation();
  const [deleteCustomLaptopRequests] = useDeleteCustomLaptopRequestsMutation();
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  useEffect(() => {
    if (CustomLaptopRequestsData && CustomLaptopRequestsData.data) {
      setData(CustomLaptopRequestsData.data);
      setStartIndex(CustomLaptopRequestsData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(CustomLaptopRequestsData.pagination.totalItems);
      setEndIndex(CustomLaptopRequestsData.pagination.endIndex);
      setTotalPages(CustomLaptopRequestsData.pagination.totalPages);
      setFullAccess(CustomLaptopRequestsData.moduleAccess.fullAccess);
      setRead(CustomLaptopRequestsData.moduleAccess.read);
    }
  }, [CustomLaptopRequestsData, currentPage, role]);

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
    const editCustomLaptop = data.find((d) => d._id === id);

    if (editCustomLaptop) {
      setEditId(id);
      setstatus(editCustomLaptop.status);
      setNote(editCustomLaptop.note);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setstatus('');
    // seteditCustomLaptop('');
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handlestatusChange = (e) => {
    setstatus(e.target.value);
  };

  const handleDeleteCustomLaptopRequests = async () => {
    try {
      const response = await deleteCustomLaptopRequests({
        id: idToDelete,
        role: role,
      });
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
    if (!status || !note) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);

    try {
      const data = {
        status: status,
        note: note,
      };

      const response = await editCustomLaptopRequestsData({
        id: editId,
        role: role,
        data: data,
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
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Processor ',
      accessor: 'processor',
    },
    {
      Header: 'Operating System',
      accessor: 'operatingSystem',
    },
    {
      Header: 'Ram',
      accessor: 'ram',
    },
    {
      Header: 'Screen Size',
      accessor: 'screenSize',
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
    {
      Header: 'Message',
      accessor: 'message',
    },
 
    {
      Header: 'Note',
      accessor: 'note',
    },
    {
      Header: 'Status',
      accessor: 'status',
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
          {read ? (
            <Container fluid className="mt-3 ">
              <Row className="boxShadow p-4 mb-4 mt-4">
                <Col className="d-flex flex-row justify-content-between mt-1">
                  <h4 className="fw-bold">Custom Laptop Requests</h4>
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
                      placeholder="Search Custom Laptop Requests..."
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
                />
              </Row>

              <DeleteModel
                YES={handleDeleteCustomLaptopRequests}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this CustomLaptopRequests"
                DELETETITLE="Custom Laptop Requests"
              />
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}

      <Modal show={editShow} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="deviceNameInput">
              <Form.Label>
                Note <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={note}
                onChange={handleNoteChange}
                placeholder="Enter the Note here"
              />
            </Form.Group>
            <Form.Group controlId="statusDropdown" className="mt-3">
              <Form.Label>Status:</Form.Label>
              <Form.Select
                value={status}
                placeholder="Enter the status here"
                onChange={handlestatusChange}
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Confirmed">Confirmed</option>
              </Form.Select>
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

export default CustomLaptopRequests;
