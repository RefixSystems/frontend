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
import { HiUserCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { FaEdit, FaPlus } from 'react-icons/fa';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import {
  useAddDevicesMutation,
  useDeleteDevicesMutation,
  useEditDevicesMutation,
  useGetDevicesQuery,
} from '../../../redux/api/DevicesApi';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import InputImage from '../../../components/InputImage';
import DragAndDropImageUpload from '../../../components/DragAndDropImageUpload';
import ServerError from '../../../components/ServerError';

const Devices = () => {
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
  const [editDevice, setEditDevice] = useState('');
  const [file, setFile] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [addShow, setAddShow] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [newFile, setNewFile] = useState(null);
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const role = getRole();

  const {
    data: DevicesData,
    refetch,
    isLoading,
    isError, 
    error,
  } = useGetDevicesQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    role: role,
  });
  const [editDevicesData] = useEditDevicesMutation();
  const [deleteDevices] = useDeleteDevicesMutation();
  const [addDevices] = useAddDevicesMutation();
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  useEffect(() => {
    if (DevicesData && DevicesData.data) {
      setData(DevicesData.data);
      setStartIndex(DevicesData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(DevicesData.pagination.totalItems);
      setEndIndex(DevicesData.pagination.endIndex);
      setTotalPages(DevicesData.pagination.totalPages);
      setFullAccess(DevicesData.moduleAccess.fullAccess);
      setWrite(DevicesData.moduleAccess.write);
      setRead(DevicesData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [DevicesData, currentPage, role,error,isError]);

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
    const editDevice = data.find((d) => d._id === id);

    if (editDevice) {
      setEditId(id);
      setEditDevice(editDevice.deviceName);
      setFile(editDevice.image);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setEditDevice('');
    setFile(null);
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleEditeditDeviceChange = (e) => {
    setEditDevice(e.target.value);
  };

  const handleEditFileChange = (file) => {
    setFile(file);
  };

  const handleAddFileChange = (file) => {
    setNewFile(file);
  };

  const handleAddeditDeviceChange = (e) => {
    setDeviceName(e.target.value);
  };

  const handleDeleteDevices = async () => {
    try {
      const response = await deleteDevices({
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
    if (!editDevice || !file) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('deviceName', editDevice);
      formData.append('image', file);

      const response = await editDevicesData({
        id: editId,
        role: role,
        data: formData,
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
    setDeviceName('');
    setNewFile(null);
  };

  const handleAddData = async () => {
    if (!deviceName || !newFile) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('deviceName', deviceName);
      formData.append('image', newFile);

      const response = await addDevices({
        role: role,
        data: formData,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setAddShow(false);
        refetch();
        setDeviceName('');
        setNewFile('');
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setDeviceName('');
        setNewFile('');
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
      Header: 'Image',
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
            }}
          />
        ) : (
          <HiUserCircle size={50} />
        );
      },
    },
    {
      Header: 'Device Name',
      accessor: 'deviceName',
      Cell: (props) => {
        const deviceName = props.value;
        return (
          <Link to={`/admin/issues/${deviceName}`} style={{ color: '#245bad' }}>
            {deviceName}
          </Link>
        );
      },
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
                  <h4 className="fw-bold">Devices</h4>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddShow}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline"> Add Devices</span>
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
                      placeholder="Search Devices..."
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
                YES={handleDeleteDevices}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this Devices"
                DELETETITLE="Devices"
              />
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}

      <Modal show={editShow} onHide={handleEditClose} centered dialogClassName="all-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="deviceNameInput" className="mb-3">
              <Form.Label>
                Devices Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={editDevice}
                onChange={handleEditeditDeviceChange}
                placeholder="Enter the device name here"
              />
            </Form.Group>
            <DragAndDropImageUpload
              labelText="Upload Image"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
              }}
              handleFileChange={(file) => {
                handleEditFileChange(file);
              }}
            />
            <div>
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp{' '}
              </small>
            </div>
            <InputImage image={file} valueImage={file} />
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

      <Modal show={addShow} onHide={handleAddClose} centered dialogClassName="all-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editDeviceInput" className="mb-3">
              <Form.Label>
                Device Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the device name here"
                value={deviceName}
                onChange={handleAddeditDeviceChange}
              />
            </Form.Group>
            <DragAndDropImageUpload
              labelText="Upload Image"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
              }}
              handleFileChange={(file) => {
                handleAddFileChange(file);
              }}
            />
            <div>
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp{' '}
              </small>
            </div>
            <InputImage image={newFile} valueImage={newFile} />
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

export default Devices;
