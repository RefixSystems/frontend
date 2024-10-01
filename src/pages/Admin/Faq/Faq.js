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
import BasicTable from '../../../components/BasicTable';
import { BsSearch, BsX } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { FaChevronDown, FaChevronUp, FaEdit, FaPlus } from 'react-icons/fa';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { getRole } from '../../../Constants/Global';
import NoAccess from '../../../components/NoAccess';
import FetchLoader from '../../../components/FetchLoader';
import { useTheme } from '../../../Contexts/ThemeContext';
import Select from 'react-select/creatable';
import {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useEditFaqMutation,
  useGetFaqAdminQuery,
  useGetFaqSectionsQuery,
} from '../../../redux/api/FaqApi';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ServerError from '../../../components/ServerError';

const Faq = () => {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { id } = useParams();
  const [editId, setEditId] = useState(null);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [addShow, setAddShow] = useState(false);
  const [section, setSection] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const [,] = useState(false);
  const role = getRole();
  const [visibleSubtitle, setVisibleSubtitle] = useState(null);

  const {
    data: FaqData,
    refetch,
    isLoading,
    isError, 
    error,
  } = useGetFaqAdminQuery({
    search: searchTerm,
    id: id,
    role: role,
  });

  const [editFaqData, { isLoading: editLoader }] = useEditFaqMutation();
  const [deleteFaq, { isLoading: deleteLoader }] = useDeleteFaqMutation();
  const [addFaq, { isLoading: addLoader }] = useAddFaqMutation();
  const { data: sectionData } = useGetFaqSectionsQuery({ role });

  const faqOptions =
    (sectionData?.data || []).map((title) => ({
      label: title,
      value: title,
    })) || [];
  useEffect(() => {
    if (FaqData && FaqData.data) {
      setData(FaqData.data);
      setSection(Object.keys(FaqData.data));
      setFullAccess(FaqData.moduleAccess.fullAccess);
      setWrite(FaqData.moduleAccess.write);
      setRead(FaqData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [FaqData, role,error,isError]);

  const handleClear = () => {
    setSearchInput('');
    setSearchTerm('');
  };

  const handleSearch = () => {
    setIsSearching(true);
    setSearchTerm(searchInput);
    refetch({ search: searchInput }).then(() => {
      setIsSearching(false);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleEditShow = (id) => {
    for (const subtitle in data) {
      const faqItem = data[subtitle].find((d) => d._id === id);
      if (faqItem) {
        setEditId(id);
        setQuestion(faqItem.question);
        setAnswer(faqItem.answer);
        setEditShow(true);
        return;
      }
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setAnswer('');
    setQuestion('');
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleDeleteFaq = async () => {
    try {
      const response = await deleteFaq({ id: idToDelete, role: role });
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

  const handleEditData = async (values, { setSubmitting }) => {
    if (!values.question || !values.answer) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }
    try {
      const response = await editFaqData({
        id: editId,
        role: role,
        data: {
          question: values.question,
          answer: values.answer,
        },
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setEditShow(false);
        refetch();
        setAnswer('');
        setQuestion('');
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setAnswer('');
        setQuestion('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      setEditShow(false);
    }
  };

  const handleAddShow = () => {
    setAddShow(true);
  };

  const handleAddClose = () => {
    setAddShow(false);
    setAnswer('');
    setQuestion('');
  };

  const handleAddData = async (values, { setSubmitting }) => {
    try {
      const response = await addFaq({
        role: role,
        data: {
          subtitle: values.section,
          question: values.question,
          answer: values.answer,
        },
      });
      console.log(response);

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
      setSubmitting(false);
      setEditShow(false);
    }
  };

  const validationSchema = Yup.object().shape({
    section: Yup.string().required('Section is required'),
    question: Yup.string().required('Question is required'),
    answer: Yup.string().required('Answer is required'),
  });

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: (d, i) => i + 1,
    },
    {
      Header: 'Question',
      accessor: 'question',
    },
    {
      Header: 'Answer',
      accessor: 'answer',
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

  const toggleTableVisibility = (section) => {
    setVisibleSubtitle(visibleSubtitle === section ? null : section);
  };

  // Filter data based on selected section
  const getFilteredData = (section) => {
    return data[section] || [];
  };

  return (
    <>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <div>
      {hasServerError ? (
         <ServerError/>
        ) : read ? (
            <Container fluid className="mt-3 ">
              <Row className="boxShadow p-4 mb-4 mt-4">
                <Col className="d-flex flex-row justify-content-between mt-1">
                  <h4 className="fw-bold">FAQ</h4>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddShow}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline"> Add Faq</span>
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
                      placeholder="Search Faq Questions..."
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
                <Col>
                {section.map((section) => (
                    <div key={section}>
                      <div
                        className="subtitle my-2 mx-3 d-flex justify-content-between align-items-center"
                        onClick={() => toggleTableVisibility(section)}
                        style={{ cursor: 'pointer' }}
                      >
                        <h5>{section}</h5>
                        {visibleSubtitle === section ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                      {visibleSubtitle === section && (
                        <BasicTable
                          COLUMNS={COLUMNS}
                          MOCK_DATA={getFilteredData(section)}
                          isPagination={false}
                          isHeading={false}
                        />
                      )}
                      <hr/>
                    </div>
                  ))}
               </Col>
              </Row>{' '}
              <DeleteModel
                YES={handleDeleteFaq}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this Faq"
                DELETETITLE="Faq"
              />
            </Container>
          ) : (
            <NoAccess />
          )}

          {/* Add Faq Modal */}
          <Modal show={addShow} onHide={handleAddClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add Faq</Modal.Title>
            </Modal.Header>
            <Formik
              initialValues={{ section: '', question: '', answer: '' }}
              // validationSchema={validationSchema}
              onSubmit={handleAddData}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Modal.Body>
                    <Form.Group controlId="formCategory">
                      <Form.Label>
                        Section <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        as={Select}
                        options={faqOptions}
                        name="section"
                        value={faqOptions.find(
                          (option) => option.value === values.section
                        )}
                        onChange={(selectedOption) =>
                          handleChange({
                            target: {
                              name: 'section',
                              value: selectedOption.value,
                            },
                          })
                        }
                        className={`${
                          touched.section && errors.section ? 'is-invalid' : ''
                        }`}
                      />
                      <ErrorMessage
                        name="section"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <Form.Group controlId="formCategory">
                      <Form.Label>
                        Question <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        type="text"
                        name="question"
                        className="form-control"
                        placeholder="Enter the question here"
                      />
                      <ErrorMessage
                        name="question"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <Form.Group controlId="formCategory">
                      <Form.Label>
                        Answer <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        as="textarea"
                        name="answer"
                        className="form-control"
                        placeholder="Enter the answer here"
                      />
                      <ErrorMessage
                        name="answer"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handleAddClose}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{ backgroundColor: color, border: 'none' }}
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Adding...
                        </>
                      ) : (
                        'Add'
                      )}
                    </Button>
                  </Modal.Footer>
                </Form>
              )}
            </Formik>
          </Modal>

          {/* Edit Faq Modal */}
          <Modal show={editShow} onHide={handleEditClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Faq</Modal.Title>
            </Modal.Header>
            <Formik
              initialValues={{ question, answer }}
              // validationSchema={Yup.object().shape({
              //   question: Yup.string().required('Question is required'),
              //   answer: Yup.string().required('Answer is required'),
              // })}
              onSubmit={handleEditData}
            >
              {({ isSubmitting, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Modal.Body>
                    {/* <Form.Group controlId="formCategory">
                      <Form.Label>
                        Section <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        type="text"
                        name="section"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="section"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group> */}
                    <Form.Group controlId="formCategory">
                      <Form.Label>
                        Question <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        type="text"
                        name="question"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="question"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <Form.Group controlId="formCategory">
                      <Form.Label>
                        Answer <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        as="textarea"
                        name="answer"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="answer"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handleEditClose}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{ backgroundColor: color, border: 'none' }}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
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
                </Form>
              )}
            </Formik>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Faq;
