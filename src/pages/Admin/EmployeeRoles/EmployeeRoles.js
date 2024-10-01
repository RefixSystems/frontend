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
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import {
  useAddEmployeeRoleMutation,
  useGetEmployeeRoleQuery,
} from '../../../redux/api/EmployeeRoleApi';
import { getRole } from '../../../Constants/Global';
import NoAccess from '../../../components/NoAccess';
import FetchLoader from '../../../components/FetchLoader';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import ServerError from '../../../components/ServerError';
const EmployeeRole = () => {
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
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  const roles = getRole();
  const {
    data: employeeRoleData,
    isLoading,
    isError, 
    error,
    refetch,
  } = useGetEmployeeRoleQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    role: roles,
  });
  const [addEmployeeRole] = useAddEmployeeRoleMutation();

  useEffect(() => {
    if (employeeRoleData && employeeRoleData.data) {
      setData(employeeRoleData.data);
      setStartIndex(employeeRoleData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(employeeRoleData.pagination.totalItems);
      setEndIndex(employeeRoleData.pagination.endIndex);
      setTotalPages(employeeRoleData.pagination.totalPages);
      setWrite(employeeRoleData.moduleAccess.write);
      setRead(employeeRoleData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [employeeRoleData, currentPage, role,error,isError]);

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

  const handleAddData = async () => {
    setLoading(true);

    try {
      const response = await addEmployeeRole({
        data: {
          nameOfRole: role,
        },
        role: roles,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setAddShow(false);
        refetch();
        setRole('');
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setRole('');
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
      Header: 'Name of Role',
      accessor: 'nameOfRole',
    },
    {
      Header: 'Total Employee',
      accessor: 'totalEmployees',
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
                  <h4 className="fw-bold">Employee Roles</h4>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={() => setAddShow(true)}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline"> Add Role</span>
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
              <Row className="boxShadow  p-3 mb-4 d-flex flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row">
                <Col className="my-4 mx-2" xxl={3} xl={3} lg={3} sm={6} md={6}>
                  <div className="input-group">
                    <span className="input-group-text">
                      <BsSearch />
                    </span>
                    <input
                      type="text"
                      placeholder="Search roles..."
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
            </Container>
          ) : (
            <NoAccess />
          )}

          <Modal show={addShow} onHide={() => setAddShow(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="roleInput">
                  <Form.Label>Role <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the role here"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setAddShow(false)}>
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
                    Add...
                  </>
                ) : (
                  'Add'
                )}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default EmployeeRole;
