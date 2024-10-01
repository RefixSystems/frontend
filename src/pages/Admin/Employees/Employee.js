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
  useDeleteUserCreationMutation,
  useGetUserCreationQuery,
} from '../../../redux/api/UserCreationApi';
import { BsSearch, BsX } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { FaEdit, FaPlus } from 'react-icons/fa';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { getRole } from '../../../Constants/Global';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import { getEmail } from '../../../Constants/EmailGlobal';
import ServerError from '../../../components/ServerError';

const UserCreation = () => {
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
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  const email = getEmail();
  const role = getRole();
  const {
    data: UserCreationData,
    isLoading,
    isError, 
    error,
    refetch,
  } = useGetUserCreationQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    role: role,
    email:email,
  });
  

  const [deleteUserCreation] = useDeleteUserCreationMutation();
  useEffect(() => {
    if (UserCreationData && UserCreationData.data) {
      setData(Array.isArray(UserCreationData.data)?UserCreationData.data:[UserCreationData.data]);
      setStartIndex(UserCreationData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(UserCreationData.pagination.totalItems);
      setEndIndex(UserCreationData.pagination.endIndex);
      setTotalPages(UserCreationData.pagination.totalPages);
      setWrite(UserCreationData.moduleAccess.write);
      setRead(UserCreationData.moduleAccess.read);
      setFullAccess(UserCreationData.moduleAccess.fullAccess);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [UserCreationData, currentPage, role,error,isError]);

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

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleDeleteUserCreation = async () => {
    try {
      const response = await deleteUserCreation({ id: idToDelete, role: role });
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

  const navigate = useNavigate();
  const handleAddRental = () => {
    navigate('/admin/add-employee');
  };

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: 's_no',
    },
    {
      Header: 'Photo',
      accessor: 'image',
      Cell: (props) => {
        const imageUrl = props.value;
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '100%',
            }}
          />
        ) : (
          <HiUserCircle size={50} />
        );
      },
    },
    {
      Header: 'Id Proof',
      accessor: 'idProof',
      Cell: (props) => {
        const imageUrl = props.value;
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '100%',
            }}
          />
        ) : (
          <HiUserCircle size={50} />
        );
      },
    },
    {
      Header: 'Employee Id',
      accessor: 'employeeId',
    },
    {
      Header: 'Name Of Employee',
      accessor: 'nameOfEmployee',
    },
    {
      Header: 'Role',
      accessor: 'roleOfEmployee',
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
      Header: 'Date Of Birth',
      accessor: 'dateOfBirth',
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
            <Link to={`/admin/edit-employee/${rowIdx}`}>
              <Button variant="warning" className="ms-2">
                <FaEdit />
              </Button>
            </Link>
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
                  <h4 className="fw-bold">Employee</h4>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddRental}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline">
                          {' '}
                          Add Employee
                        </span>
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
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
                      placeholder="Search Employee..."
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
                YES={handleDeleteUserCreation}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this Employee"
                DELETETITLE="Employee"
              />
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}
    </div>
  );
};

export default UserCreation;
