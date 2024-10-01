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
  useDeleteSupportMutation,
  useEditSupportMutation,
  useGetSupportQuery,
} from '../../../redux/api/SupportApi';
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
import { getEmail } from '../../../Constants/EmailGlobal';
import ServerError from '../../../components/ServerError';
import { getPhoneNumber } from '../../../Constants/PhoneNumberGlobal';

const Support = () => {
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
  const [adminComments, setAdminComments] = useState('');
  const [message, setMessage] = useState('');
  const [fullAccess, setFullAccess] = useState(false);
  const [read, setRead] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const [count, setCount] = useState(0);
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  const phoneNumber = getPhoneNumber();
  const role = getRole();

  const {
    data: SupportData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetSupportQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    role: role,
    phoneNumber: phoneNumber,
  });
  const [editSupportData] = useEditSupportMutation();
  const [deleteSupport] = useDeleteSupportMutation();

  useEffect(() => {
    if (SupportData && SupportData.data) {
      setData(SupportData.data);
      setStartIndex(SupportData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(SupportData.pagination.totalItems);
      setEndIndex(SupportData.pagination.endIndex);
      setTotalPages(SupportData.pagination.totalPages);
      setFullAccess(SupportData.moduleAccess.fullAccess);
      setRead(SupportData.moduleAccess.read);
      setCount(SupportData.supportCount);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [SupportData, currentPage, role, error, isError]);

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
    const Support = data.find((d) => d._id === id);

    if (Support) {
      setEditId(id);
      setstatus(Support.status);
      setAdminComments(Support.adminComments);
      setMessage(Support.message);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setstatus('');
    setAdminComments('');
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
  const handleAdminCommentsChange = (e) => {
    setAdminComments(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleDeleteSupport = async () => {
    try {
      const response = await deleteSupport({ id: idToDelete, role: role });
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
    if (!adminComments || !status) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);
    try {
      const response = await editSupportData({
        id: editId,
        role: role,
        phoneNumber: phoneNumber,
        data: {
          status: status,
          adminComments: adminComments,
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
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
    {
      Header: 'Support Id',
      accessor: 'supportId',
      Cell: (props) => {
        const { supportId, type } = props.row.original;

        if (type === 'Custom Laptop Request') {
          return (
            <Link
              to={`/admin/request-details/${supportId}`}
              style={{ color: '#245bad' }}
            >
              {supportId}
            </Link>
          );
        }
        return <span>{supportId}</span>;
      },
    },

    {
      Header: 'Message',
      accessor: 'message',
    },
    {
      Header: 'Admin Comments',
      accessor: 'adminComments',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Completed By',
      accessor: 'doneBy',
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
            <ServerError />
          ) : read ? (
            <Container fluid className="mt-3 ">
              <Row className="boxShadow p-4 mb-4 mt-4">
                <Col className="d-flex flex-row justify-content-between mt-1">
                  <h4 className="fw-bold">Support</h4>
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
                      placeholder="Search Support..."
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
                YES={handleDeleteSupport}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this Support"
                DELETETITLE="Support"
              />
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}

      <Modal show={editShow} onHide={handleEditClose} centered dialogClassName="all-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Support</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="messageInput" className="mt-3">
              <Form.Label>
                Message:<span className="text-danger"></span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                placeholder="Enter the message here"
                onChange={handleMessageChange}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="paragraphInput" className="mt-3">
              <Form.Label>
                Admin Comments:<span className="text-danger"> *</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={adminComments}
                placeholder="Enter the admin comments here"
                onChange={handleAdminCommentsChange}
              />
            </Form.Group>

            <Form.Group controlId="statusDropdown" className="mt-3">
              <Form.Label>Edit Status:</Form.Label>
              <Form.Select
                value={status}
                placeholder="Enter the status here"
                onChange={handlestatusChange}
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="Pending">Pending</option>
                <option value="InProcess">InProcess</option>
                <option value="Closed">Closed</option>
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
                Update...
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

export default Support;
