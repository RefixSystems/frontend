import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  Spinner,
  Tabs,
  Tab,
} from 'react-bootstrap';
import BasicTable from '../../../components/TablePaginationComponent';
import { BsSearch, BsX } from 'react-icons/bs';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import {
  useDeleteEmailMutation,
  useGetEmailQuery,
  useGetTemplateDataQuery,
  useGetTemplateDetailsQuery,
  useSendMailMutation,
} from '../../../redux/api/EmailApi';
import { toast } from 'react-toastify';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

const Email = () => {
  const { color } = useTheme();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [template, setTemplate] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [templateAll, setTemplateAll] = useState('');
  const [subjectAll, setSubjectAll] = useState('');
  const [bodyAll, setBodyAll] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const role = getRole();

  const {
    data: EmailData,
    isLoading,
    refetch,
  } = useGetEmailQuery({
    page: currentPage,
    search: searchTerm,
    role: role,
  });

  const { data: TemplateData } = useGetTemplateDataQuery({
    role: role,
  });

  const { data: TemplateDetails } = useGetTemplateDetailsQuery({
    role: role,
    template: template,
  });


  const { data: TemplateDetailsAll } = useGetTemplateDetailsQuery({
    role: role,
    template: templateAll,
  });

  const [sendMail] = useSendMailMutation();
  const [deleteEmailApi] = useDeleteEmailMutation();

  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');

  useEffect(() => {
    if (EmailData && EmailData.data) {
      setData(EmailData.data);
      setStartIndex(EmailData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(EmailData.pagination.totalItems);
      setEndIndex(EmailData.pagination.endIndex);
      setTotalPages(EmailData.pagination.totalPages);
    }
  }, [EmailData, currentPage, role]);

  useEffect(() => {
    if (TemplateDetails && TemplateDetails.data) {
      setSubject(TemplateDetails.data.subject);
      setBody(TemplateDetails.data.body);    
    }
  }, [TemplateDetails]);

  useEffect(() => {
    if (TemplateDetailsAll && TemplateDetailsAll.data) {
      setSubjectAll(TemplateDetailsAll.data.subject);
      setBodyAll(TemplateDetailsAll.data.body);
    }
  }, [TemplateDetailsAll]);
  

  useEffect(() => {
    if (location.state && location.state.phoneNumber && location.state.email) {
      setPhoneNumber(location.state.phoneNumber);
      setEmail(location.state.email);
    }
  }, [location.state]);

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

  const handleSendEmail = async () => {
    if (!phoneNumber || !email || !template) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    if (phoneNumber.length !== 10) {
      toast.error('Phone number must be exactly 10 digits', {
        autoClose: 1000,
      });
      return;
    }

    setLoading(true);
    try {
      const data = {
        phoneNumber: phoneNumber,
        email: email,
        templateName: template,
      };

      const response = await sendMail({ data: data, role: role });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setPhoneNumber('');
        setEmail('');
        setTemplate('');
        setSubject('');
        setBody('');
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
        setPhoneNumber('');
        setEmail('');
        setTemplate('');
        setSubject('');
        setBody('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailAll = async () => {
    if (!templateAll) {
      toast.error('Please fill  the fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);
    try {
      const data = {
        email: 'all',
        templateName: templateAll,
      };

      const response = await sendMail({ data: data, role: role });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setTemplateAll('');
        setSubjectAll('');
        setBodyAll('');
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
        setTemplateAll('');
        setSubjectAll('');
        setBodyAll('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandleClose = () => setDeleteShow(false);

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteEmail = async () => {
    try {
      const response = await deleteEmailApi({ id: idToDelete, role: role });
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

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: 's_no',
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
      Header: 'Template Name',
      accessor: 'templateName',
    },
    {
      Header: 'Type',
      accessor: 'type',
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

    {
      Header: 'ACTIONS',
      accessor: 'action',
      Cell: (props) => {
        const rowIdx = props.row.original._id;
        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <Button
              variant="danger"
              className="m-1"
              onClick={() => deleteHandleShow(rowIdx)}
            >
              <MdDelete />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <div>
          <Container fluid className="mt-3">
            <Tabs
              defaultActiveKey="email"
              id="email-tabs"
              className="mb-3 mt-3"
            >
              <Tab eventKey="email" title="Individual">
                <Row className="boxShadow p-4 mb-4 mt-4">
                  <Col
                    xs={12}
                    className="d-flex justify-content-start mb-3 mb-md-0"
                  >
                    <h4 className="fw-bold">Email</h4>
                  </Col>

                  <Row className="boxShadow p-3 mb-4 mx-1">
                    <Col md={6}>
                      <Form.Group controlId="phoneNumber" className="mb-3">
                        <Form.Label>
                          Phone Number <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the phone number here"
                          value={phoneNumber}
                          onChange={(e) => {
                            const input = e.target.value;
                            const numericInput = input
                              .replace(/[^0-9]/g, '')
                              .slice(0, 10);
                            setPhoneNumber(numericInput);
                          }}
                        />
                      </Form.Group>
                      <Form.Group controlId="email" className="mb-3">
                        <Form.Label>
                          Email: <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter the email here"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="template" className="mb-3">
                        <Form.Label>Template :</Form.Label>
                        <Form.Select
                          value={template}
                          onChange={(e) => setTemplate(e.target.value)}
                        >
                          <option value="">Select</option>
                          {TemplateData?.data?.map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="subject" className="mb-3">
                        <Form.Label>Subject :</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the subject here"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="body" className="mb-3">
                        <Form.Label>Message :</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Enter the body here"
                          rows={5}
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                        />
                      </Form.Group>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        onClick={handleSendEmail}
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
                            Send Email...
                          </>
                        ) : (
                          'Send Email'
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Row>
              </Tab>
              <Tab eventKey="allUsers" title="All Users">
                <Row className="boxShadow p-4 mb-4 mt-4">
                  <Col
                    xs={12}
                    className="d-flex justify-content-start mb-3 mb-md-0"
                  >
                    <h4 className="fw-bold">All Users</h4>
                  </Col>
                  <Row className="boxShadow p-4 mb-4">
                    <Col md={6}>
                      <Form.Group controlId="template" className="mb-3">
                        <Form.Label>Template:</Form.Label>
                        <Form.Select
                          value={templateAll}
                          onChange={(e) => setTemplateAll(e.target.value)}
                        >
                          <option value="">Select</option>
                          {TemplateData?.data?.map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="subject" className="mb-3">
                        <Form.Label>Subject:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the subject here"
                          value={subjectAll}
                          onChange={(e) => setSubjectAll(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group controlId="body" className="mb-3">
                        <Form.Label>Message:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Enter the body here"
                          value={bodyAll}
                          onChange={(e) => setBodyAll(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12} className="text-end">
                      <Button
                        className="me-2 mt-2"
                        style={{
                          backgroundColor: color,
                          borderColor: color,
                          color: 'white',
                        }}
                        onClick={handleSendEmailAll}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            Sending <Spinner animation="border" size="sm" />
                          </>
                        ) : (
                          'Send Email'
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Row>
              </Tab>
            </Tabs>
            <Row className="boxShadow p-3 mb-4 d-flex flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row">
              <Col className="my-4 mx-2" xxl={3} xl={3} lg={3} sm={6} md={6}>
                <div className="input-group">
                  <span className="input-group-text">
                    <BsSearch />
                  </span>
                  <input
                    type="text"
                    placeholder="Search emails..."
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

          <DeleteModel
            YES={deleteEmail}
            DELETESTATE={deleteShow}
            ONCLICK={deleteHandleClose}
            DESCRIPTION="Are you sure you want to delete this Email"
            DELETETITLE="Email"
          />
        </div>
      )}
    </>
  );
};

export default Email;
