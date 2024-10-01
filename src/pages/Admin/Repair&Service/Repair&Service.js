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
import { useParams } from 'react-router-dom';
import {
  useAddIssuesMutation,
  useDeleteIssuesMutation,
  useEditIssuesMutation,
  useGetIssuesQuery,
} from '../../../redux/api/Repair&ServiceApi';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
const RepairService = () => {
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
  const [issue, setIssue] = useState('');
  const [file, setFile] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [addShow, setAddShow] = useState(false);
  const [newissue, setNewissue] = useState('');
  const [mostBookedService, setmostBookedService] = useState('');
  const [newFile, setNewFile] = useState(null);
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const role = getRole();
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  const {
    data: RepairServiceData,
    refetch,
    isLoading,
  } = useGetIssuesQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    role: role,
  });
  const [editRepairServiceData] = useEditIssuesMutation();
  const [deleteRepairService] = useDeleteIssuesMutation();
  const [addRepairService] = useAddIssuesMutation();

  useEffect(() => {
    if (RepairServiceData && RepairServiceData.data) {
      setData(RepairServiceData.data);
      setStartIndex(RepairServiceData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(RepairServiceData.pagination.totalItems);
      setEndIndex(RepairServiceData.pagination.endIndex);
      setTotalPages(RepairServiceData.pagination.totalPages);
      setFullAccess(RepairServiceData.moduleAccess.fullAccess);
      setWrite(RepairServiceData.moduleAccess.write);
      setRead(RepairServiceData.moduleAccess.read);
    }
  }, [RepairServiceData, currentPage, role]);

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
    const issue = data.find((d) => d._id === id);

    if (issue) {
      setEditId(id);
      setIssue(issue.issue);
      setmostBookedService(issue.mostBookedService);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setIssue('');
    setFile(null);
    setmostBookedService('');
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handlemostBookedServiceChange = (e) => {
    setmostBookedService(e.target.value);
  };

  const handleEditIssueChange = (e) => {
    setIssue(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddissueChange = (e) => {
    setNewissue(e.target.value);
  };

  const handleNewFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const handleDeleteRepairService = async () => {
    try {
      const response = await deleteRepairService({
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
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('issue', issue);
      formData.append('image', file);
      formData.append('mostBookedService', mostBookedService);

      const response = await editRepairServiceData({
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
    setNewissue('');
    setNewFile(null);
    setmostBookedService('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newissue) {
      newErrors.newissue = 'Category name is required';
    }

    if (!newFile) {
      newErrors.newFile = 'Image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddData = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('issue', newissue);
      formData.append('image', newFile);

      const response = await addRepairService({
        role: role,
        data: formData,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setAddShow(false);
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
              borderRadius: '100%',
            }}
          />
        ) : (
          <HiUserCircle size={50} />
        );
      },
    },
    {
      Header: 'Issue',
      accessor: 'issue',
    },
    {
      Header: 'Most Booked Service',
      accessor: 'mostBookedService',
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
                  <h4 className="fw-bold">Repair & Service</h4>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddShow}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline"> Add Issue</span>
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
                      placeholder="Search RepairService..."
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
                    disabled={isSearching}
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
                YES={handleDeleteRepairService}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this RepairService"
                DELETETITLE="RepairService"
              />
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}

      <Modal show={editShow} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit RepairService</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="mostBookedServiceDropdown" className="mt-3">
              <Form.Label>Most Booked Service:</Form.Label>
              <Form.Select
                value={mostBookedService}
                onChange={handlemostBookedServiceChange}
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="Active">Active</option>
                <option value="Inactive">InActive</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="deviceNameInput">
              <Form.Label>RepairService Name</Form.Label>
              <Form.Control
                type="text"
                value={issue}
                onChange={handleEditIssueChange}
              />
            </Form.Group>
            <Form.Group controlId="fileUpload" className="mt-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control
                type="file"
                accept=".jpg,.jpeg,.png,.svg,.webp"
                onChange={handleFileChange}
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
          <Modal.Title>Add RepairService</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="issueInput">
              <Form.Label>
                RepairService Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={newissue}
                onChange={handleAddissueChange}
                isInvalid={!!errors.newissue}
              />
              <Form.Control.Feedback type="invalid">
                {errors.newissue}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="newFileUpload" className="mt-3">
              <Form.Label>
                Upload File <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="file"
                accept=".jpg,.jpeg,.png,.svg,.webp"
                onChange={handleNewFileChange}
                isInvalid={!!errors.newFile}
              />
              <Form.Control.Feedback type="invalid">
                {errors.newFile}
              </Form.Control.Feedback>
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

export default RepairService;
