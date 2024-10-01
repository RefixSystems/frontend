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
import BasicTable from '../../../../components/TablePaginationComponent';
import { BsSearch, BsX } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { FaEdit, FaPlus } from 'react-icons/fa';
import DeleteModel from '../../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import {
  useAddMostBookedServiceMutation,
  useDeleteMostBookedServiceMutation,
  useEditMostBookedServiceMutation,
  useGetMostBookedServiceQuery,
} from '../../../../redux/api/MostBookedServiceApi';
import { getRole } from '../../../../Constants/Global';
import FetchLoader from '../../../../components/FetchLoader';
import NoAccess from '../../../../components/NoAccess';
import { useTheme } from '../../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import Select from 'react-select/creatable';
import ServerError from '../../../../components/ServerError';

const MostBookedService = () => {
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
  const [editServiceName, setEditServiceName] = useState('');
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [addShow, setAddShow] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSystems, setSelectedSystems] = useState([]);
  const initialOptions = [
    { value: 'Desktop', label: 'Desktop' },
    { value: 'Laptop', label: 'Laptop' },
    { value: 'MacBook', label: 'MacBook' },
    { value: 'Tablet', label: 'Tablet' },
  ];
  const [options, setOptions] = useState(initialOptions);

  const role = getRole();

  const {
    data: MostBookedServiceData,
    refetch,
    isLoading,
    isError, 
    error,
  } = useGetMostBookedServiceQuery({
    page: currentPage,
    search: searchTerm,
    role: role,
  });
  const [editMostBookedServiceData] = useEditMostBookedServiceMutation();
  const [deleteMostBookedService] = useDeleteMostBookedServiceMutation();
  const [addMostBookedService] = useAddMostBookedServiceMutation();
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  useEffect(() => {
    if (MostBookedServiceData && MostBookedServiceData.data) {
      setData(MostBookedServiceData.data);
      setStartIndex(MostBookedServiceData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(MostBookedServiceData.pagination.totalItems);
      setEndIndex(MostBookedServiceData.pagination.endIndex);
      setTotalPages(MostBookedServiceData.pagination.totalPages);
      setFullAccess(MostBookedServiceData.moduleAccess.fullAccess);
      setWrite(MostBookedServiceData.moduleAccess.write);
      setRead(MostBookedServiceData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [MostBookedServiceData, currentPage, role,error,isError]);



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
    const editServiceName = data.find((d) => d._id === id);

    if (editServiceName) {
      setEditId(id);
      setEditServiceName(editServiceName.serviceName);
      const selectedSystemOptions = editServiceName.applicableSystems.map(
        (system) => ({
          value: system,
          label: system,
        })
      );
      setSelectedSystems(selectedSystemOptions);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setEditServiceName('');
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleEditeditServiceNameChange = (e) => {
    setEditServiceName(e.target.value);
  };

  const handleAddeditServiceNameChange = (e) => {
    setServiceName(e.target.value);
  };
  const handleSystemChange = (selectedOptions) => {
    setSelectedSystems(selectedOptions);
  };

  const handleDeleteMostBookedService = async () => {
    try {
      const response = await deleteMostBookedService({
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
    if (!editServiceName) {
      toast.error('Please fill the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);
    try {
      const applicableSystems = selectedSystems.map((system) => system.value);
      const response = await editMostBookedServiceData({
        id: editId,
        role: role,
        data: {
          serviceName: editServiceName,
          applicableSystems: applicableSystems,
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

  const handleAddShow = () => {
    setAddShow(true);
  };

  const handleAddClose = () => {
    setAddShow(false);
    setServiceName('');
    setSelectedSystems([]);
  };

  const handleAddData = async () => {
    setLoading(true);
    try {
      const applicableSystems = selectedSystems.map((system) => system.value);

      const response = await addMostBookedService({
        role: role,
        data: {
          serviceName: serviceName,
          applicableSystems: applicableSystems,
        },
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setAddShow(false);
        refetch();
        setServiceName('');
        setSelectedSystems([]);
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setServiceName('');
        setSelectedSystems([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  

  const handleCreateOption = (inputValue) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    setOptions((prevOptions) => [...prevOptions, newOption]);
    setSelectedSystems((prevSelected) => [...prevSelected, newOption]);
  };

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: 's_no',
    },

    {
      Header: 'Service Name',
      accessor: 'serviceName',
    },
    {
      Header: 'Applicable Systems',
      accessor: 'applicableSystems',
      Cell: ({ value }) => value.join(', '),
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
                  <h4 className="fw-bold">MostBookedService</h4>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddShow}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline">
                          {' '}
                          Add MostBookedService
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
                      placeholder="Search MostBookedService..."
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
                YES={handleDeleteMostBookedService}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this MostBookedService"
                DELETETITLE="MostBookedService"
              />
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}

      <Modal show={editShow} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit MostBookedService</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="serviceNameInput">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                value={editServiceName}
                onChange={handleEditeditServiceNameChange}
                placeholder="Enter the service name here"
              />
            </Form.Group>
            <Form.Group controlId="systemsSelect">
              <Form.Label>Applicable Systems</Form.Label>
              <Select
                isMulti
                options={options}
                value={selectedSystems}
                onChange={handleSystemChange}
                placeholder="Select applicable systems"
                isClearable
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

      <Modal show={addShow} onHide={handleAddClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editServiceNameInput">
              <Form.Label>
                Service Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={serviceName}
                onChange={handleAddeditServiceNameChange}
                placeholder="Enter the service name here"
              />
            </Form.Group>
            <Form.Group controlId="applicableSystemsInput" className="mt-2">
              <Form.Label>
                Applicable Systems <span className="text-danger">*</span>
              </Form.Label>
              <Select
                isMulti
                options={options}
                value={selectedSystems}
                onChange={handleSystemChange}
                placeholder="Select applicable systems"
                onCreateOption={handleCreateOption}
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
                Add...
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

export default MostBookedService;
