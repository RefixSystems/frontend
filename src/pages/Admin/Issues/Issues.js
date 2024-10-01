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
import { HiUserCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { FaEdit, FaPlus } from 'react-icons/fa';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAddIssueMutation,
  useDeleteIssueMutation,
  useEditIssueMutation,
  useGetIssueQuery,
} from '../../../redux/api/IssueApi';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useTheme } from '../../../Contexts/ThemeContext';
import InputImage from '../../../components/InputImage';
import DragAndDropImageUpload from '../../../components/DragAndDropImageUpload';
import ServerError from '../../../components/ServerError';

const Issues = () => {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const { deviceName } = useParams();
  const [editId, setEditId] = useState(null);
  const [editShow, setEditShow] = useState(false);
  const [editIssue, setEditIssue] = useState('');
  const [file, setFile] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [addShow, setAddShow] = useState(false);
  const [issueName, setIssueName] = useState('');
  const [newFile, setNewFile] = useState(null);
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);


  const role = getRole();

  const {
    data: IssuesData,
    refetch,
    isLoading,
    isError, 
    error,
  } = useGetIssueQuery({
    page: currentPage,
    device: deviceName,
    role: role,
  });

  const [editIssuesData, { isLoading: editLoader }] = useEditIssueMutation();
  const [deleteIssues, { isLoading: deleteLoader }] = useDeleteIssueMutation();
  const [addIssues, { isLoading: addLoader }] = useAddIssueMutation();
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/admin/devices');
  };

  useEffect(() => {
    if (IssuesData && IssuesData.data) {
      setData(IssuesData.data);
      setStartIndex(IssuesData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(IssuesData.pagination.totalItems);
      setEndIndex(IssuesData.pagination.endIndex);
      setTotalPages(IssuesData.pagination.totalPages);
      setFullAccess(IssuesData.moduleAccess.fullAccess);
      setWrite(IssuesData.moduleAccess.write);
      setRead(IssuesData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [IssuesData, currentPage, role,error,isError]);

  const handleEditShow = (id) => {
    const issue = data.find((d) => d._id === id);

    if (issue) {
      setEditId(id);
      setEditIssue(issue.issueName);
      setFile(issue.issueImage);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setEditIssue('');
    setFile(null);
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleEditIssueChange = (e) => {
    setEditIssue(e.target.value);
  };

  const handleEditFileChange = (file) => {
    setFile(file);
  };

  const handleAddissueChange = (e) => {
    setIssueName(e.target.value);
  };

  const handleNewFileChange = (file) => {
    setNewFile(file);
  };

  const handleDeleteIssues = async () => {
    try {
      const response = await deleteIssues({
        role: role,
        data: {
          device: deviceName,
          issueId: idToDelete,
        },
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
    if (!editIssue || !file) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('issue', editIssue);
      formData.append('image', file);
      formData.append('device', deviceName);
      formData.append('issueId', editId);

      const response = await editIssuesData({
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
    }
  };

  const handleAddShow = () => {
    setAddShow(true);
  };

  const handleAddClose = () => {
    setAddShow(false);
    setIssueName('');
    setNewFile(null);
  };

  const handleAddData = async () => {
    if (!newFile || !issueName) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('issue', issueName);
      formData.append('image', newFile);
      formData.append('device', deviceName);

      const response = await addIssues({
        role: role,
        data: formData,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setAddShow(false);
        refetch();
        setIssueName('');
        setNewFile('');
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setIssueName('');
        setNewFile('');
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: 's_no',
    },

    {
      Header: 'Issue Name',
      accessor: 'issueName',
    },
    {
      Header: 'Issue Image',
      accessor: 'issueImage',
      Cell: (props) => {
        const imageUrl = props.value;
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            style={{ maxWidth: '50px', maxHeight: '50px' }}
          />
        ) : (
          <HiUserCircle size={30} />
        );
      },
    },

    {
      Header: 'Created At',
      accessor: 'createdAt',
    },
    {
      Header: 'Updated At',
      accessor: 'updatedAt',
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
                  <Col className="d-flex justify-content-start mb-3 mt-3">
                    <h4 onClick={handleCancel} className="mx-3">
                      <AiOutlineArrowLeft />
                    </h4>
                    <h4>Issues</h4>
                  </Col>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddShow}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline"> Add Issues</span>
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
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
                YES={handleDeleteIssues}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this Issues"
                DELETETITLE="Issues"
              />
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}

      <Modal show={editShow} onHide={handleEditClose} centered dialogClassName="all-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="deviceNameInput">
            <Form.Label>
            Issue Name: <span className="text-danger">*</span>
                    </Form.Label>
              <Form.Control
                type="text"
                value={editIssue}
                onChange={handleEditIssueChange}
                placeholder="Enter the issue name here"
              />
            </Form.Group>
            <Form.Group controlId="fileUpload" className="mt-3">
              <DragAndDropImageUpload
                labelText="Upload Image"
                accepts={{
                  'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
                }}
                handleFileChange={(file) => {
                  handleEditFileChange(file);
                }}
              />
              <InputImage image={file} valueImage={file} />
              <div>
                <small className="text-muted">
                  Accepted file types: .jpg , .jpeg, .png, .svg, .webp
                </small>
              </div>
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
            disabled={editLoader}
          >
            {editLoader ? (
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

      <Modal show={addShow} onHide={handleAddClose} centered dialogClassName="all-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="issueInput">
            <Form.Label>
            Issue Name: <span className="text-danger">*</span>
                    </Form.Label>
              <Form.Control
                type="text"
                value={issueName}
                onChange={handleAddissueChange}
                placeholder="Enter the issue name here"
              />
            </Form.Group>
            <Form.Group controlId="newFileUpload" className="mt-3">
              <DragAndDropImageUpload
                labelText="Upload Image"
                accepts={{
                  'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
                }}
                handleFileChange={(file) => {
                  handleNewFileChange(file);
                }}
              />
              <InputImage image={newFile} valueImage={newFile} />
              <div className="mt-2">
                <small className="text-muted">
                  Accepted file types: .jpg , .jpeg, .png, .svg, .webp
                </small>
              </div>
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
            disabled={addLoader}
          >
            {addLoader ? (
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

export default Issues;
