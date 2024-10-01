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
import { FaEdit, FaPlus } from 'react-icons/fa';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import {
  useAddEmailTemplateMutation,
  useDeleteEmailTemplateMutation,
  useEditEmailTemplateMutation,
  useGetEmailTemplateQuery,
} from '../../../redux/api/EmailTemplateApi';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import ServerError from '../../../components/ServerError';


const EmailTemplate = () => {
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
  const [addShow, setAddShow] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [editTemplateName, setEditTemplateName] = useState('');
  const [editSubject, setEditSubject] = useState('');
  const [editBody, setEditBody] = useState('');
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const [loading, setLoading] = useState(false);
  const role = getRole();

  const {
    data: EmailTemplateData,
    refetch,
    isLoading,
    isError, 
    error,
  } = useGetEmailTemplateQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    role: role,
  });
  const [editEmailTemplateData] = useEditEmailTemplateMutation();
  const [deleteEmailTemplate] = useDeleteEmailTemplateMutation();
  const [addEmailTemplate] = useAddEmailTemplateMutation();
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  useEffect(() => {
    if (EmailTemplateData && EmailTemplateData.data) {
      setData(EmailTemplateData.data);
      setStartIndex(EmailTemplateData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(EmailTemplateData.pagination.totalItems);
      setEndIndex(EmailTemplateData.pagination.endIndex);
      setTotalPages(EmailTemplateData.pagination.totalPages);
      setFullAccess(EmailTemplateData.moduleAccess.fullAccess);
      setWrite(EmailTemplateData.moduleAccess.write);
      setRead(EmailTemplateData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [EmailTemplateData, currentPage, role,error,isError]);


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
    const EmailTemplateData = data.find((d) => d._id === id);

    if (EmailTemplateData) {
      setEditId(id);
      setEditTemplateName(EmailTemplateData.templateName);
      setEditSubject(EmailTemplateData.subject);
      setEditBody(EmailTemplateData.body);

      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
   
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleTemplateNameChange = (e) => {
    setTemplateName(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleEditTemplateNameChange = (e) => {
    setEditTemplateName(e.target.value);
  };

  const handleEditSubjectChange = (e) => {
    setEditSubject(e.target.value);
  };

  const handleEditBodyChange = (e) => {
    setEditBody(e.target.value);
  };

  const handleDeleteEmailTemplate = async () => {
    try {
      const response = await deleteEmailTemplate({
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
    if (!editTemplateName || !editSubject | !editBody) {
        toast.error('Please fill all the fields', { autoClose: 1000 });
        return;
      }
  
    setLoading(true);

    try {
      const data = {
        templateName: editTemplateName,
        subject: editSubject,
        body: editBody,
      };

      const response = await editEmailTemplateData({
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

  const handleAddShow = () => {
    setAddShow(true);
  };

  const handleAddClose = () => {
    setAddShow(false);
    setTemplateName('');
    setSubject('');
    setBody('');
  };

  const handleAddData = async () => {
    if (!templateName || !subject || !body) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);

    try {
      const data = {
        templateName: templateName,
        subject: subject,
        body: body,
      };

      const response = await addEmailTemplate({
        role: role,
        data: data,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setAddShow(false);
        refetch();
        setTemplateName('');
        setSubject('');
        setBody('');
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setTemplateName('');
        setSubject('');
        setBody('');
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
      Header: 'Template Name',
      accessor: 'templateName',
    },
    {
      Header: 'Subject',
      accessor: 'subject',
    },
    {
      Header: 'Body',
      accessor: 'body',
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
                  <h4 className="fw-bold">Email Template</h4>
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
                          Add Email Template
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
                      placeholder="Search Email Template..."
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
                YES={handleDeleteEmailTemplate}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this Email Template"
                DELETETITLE="Email Template"
              />
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}
      <Modal show={editShow} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Email Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editTemplateNameInput">
              <Form.Label>
                Template Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={editTemplateName}
                onChange={handleEditTemplateNameChange}
                placeholder="Enter the template name here"
              />
            </Form.Group>

            <Form.Group controlId="editSubjectInput" className="mt-3">
              <Form.Label>
                Subject <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={editSubject}
                onChange={handleEditSubjectChange}
                placeholder="Enter the subject here"
              />
            </Form.Group>

            <Form.Group controlId="editBodyInput" className="mt-3">
              <Form.Label>
                Body <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={editBody}
                onChange={handleEditBodyChange}
                placeholder="Enter the body content here"
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
          <Modal.Title>Add Email Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="templateNameInput">
              <Form.Label>
                Template Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the template name here"
                value={templateName}
                onChange={handleTemplateNameChange}
              />
            </Form.Group>

            <Form.Group controlId="subjectInput" className="mt-3">
              <Form.Label>
                Subject <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the subject here"
                value={subject}
                onChange={handleSubjectChange}
              />
            </Form.Group>

            <Form.Group controlId="bodyInput" className="mt-3">
              <Form.Label>
                Body <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter the body content here"
                value={body}
                onChange={handleBodyChange}
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

export default EmailTemplate;
