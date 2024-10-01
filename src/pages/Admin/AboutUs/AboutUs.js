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

import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import { MdInsertPhoto } from 'react-icons/md';
import { getRole } from '../../../Constants/Global';
import NoAccess from '../../../components/NoAccess';
import FetchLoader from '../../../components/FetchLoader';
import { useTheme } from '../../../Contexts/ThemeContext';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BasicTable from '../../../components/BasicTable';
import {
  useEditAboutUsMutation,
  useGetAboutUsAdminQuery,
} from '../../../redux/api/AboutUs';
import InputImage from '../../../components/InputImage';
import DragAndDropImageUpload from '../../../components/DragAndDropImageUpload';
import ImageVideoDragUpload from '../../../components/ImageVideoDragUpload';
import InputImageAndVideo from '../../../components/InputImageAndVideo';
import InputVideo from '../../../components/InputVideo';
import ServerError from '../../../components/ServerError';

const AboutUs = () => {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [section1, setSection1] = useState([]);
  const [section2, setSection2] = useState([]);
  const [section3, setSection3] = useState([]);
  const [editId, setEditId] = useState(null);
  const [section1Show, setSection1Show] = useState(false);
  const [section2Show, setSection2Show] = useState(false);
  const [section3Show, setSection3Show] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [text, setText] = useState('');
  const [position, setPosition] = useState('');
  const [images, setImages] = useState(null);
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const [,] = useState(false);
  const role = getRole();
  const [image1Id, setImage1Id] = useState('');
  const [image2Id, setImage2Id] = useState('');
  const [image3Id, setImage3Id] = useState('');
  const [isImage, setIsImage] = useState(true);

  const {
    data: AboutUsData,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetAboutUsAdminQuery({
    role: role,
  });

  const [editAboutUsData] = useEditAboutUsMutation();
  console.log(AboutUsData);
  useEffect(() => {
    if (AboutUsData && AboutUsData.data) {
      setData(AboutUsData.data);
      setSection1([AboutUsData?.data[0]]);
      setSection2(AboutUsData?.data[1].section2);
      setSection3([AboutUsData?.data[2]]);
      setFullAccess(AboutUsData.moduleAccess.fullAccess);
      setWrite(AboutUsData.moduleAccess.write);
      setRead(AboutUsData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [AboutUsData, role, error, isError]);

  const handleEditShow = (item) => {
    setType(item.type);
    setEditId(item._id);
    setText(item.text);
    setTitle(item.title);
    setImages(item.image);
    if (
      Array.isArray(item.images) &&
      item.images.length > 0 &&
      item.type === 'section3'
    ) {
      setImage1Id(item.images[0]?._id || '');
      setImage2Id(item.images[1]?._id || '');
      setImage3Id(item.images[2]?._id || '');
      setImage(item.images[0]?.image || '');
      setImage1(item.images[1]?.image || '');
      setImage2(item.images[2]?.image || '');
    }
    setPosition(item.position);
    switch (item.type) {
      case 'section1':
        setSection1Show(true);
        break;
      case 'section2':
        setSection2Show(true);
        break;
      case 'section3':
        setSection3Show(true);
        break;
      default:
        break;
    }
  };
  const handleEditClose = () => {
    setSection1Show(false);
    setSection2Show(false);
    setSection3Show(false);
    setType('');
    setEditId('');
    setText('');
    setTitle('');
    setImage('');
    setPosition('');
  };
  const handleEditData = async (values, { setSubmitting }) => {
    if (!values.title || !values.text) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    const getData = () => {
      const formData = new FormData();

      switch (type) {
        case 'section1':
          formData.append('type', type);
          formData.append('title', values.title);
          formData.append('text', values.text);
          if (values.image) {
            formData.append('image', values.image);
          }
          break;
        case 'section2':
          formData.append(`id`, editId);
          formData.append('type', type);
          formData.append('title', values.title);
          formData.append('text', values.text);
          break;
        case 'section3':
          formData.append('type', type);
          formData.append('title', values.title);
          formData.append('text', values.text);
          formData.append('image1', values.image ?? image);
          formData.append('image2', values.image1 ?? image1);
          formData.append('image3', values.image2 ?? image2);

          break;
        default:
          break;
      }

      return formData;
    };

    const data = getData();

    try {
      const response = await editAboutUsData({
        role: role,
        data: data,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        refetch();
        setTitle('');
        setText('');
        setImage('');
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setTitle('');
        setText('');
        setImage('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      setSection1Show(false);
      setSection2Show(false);
      setSection3Show(false);
    }
  };

  const handleTable1 = (file) => {
    setImages(file);
  };

  const handleTableImage1 = (file) => {
    setImage(file);
  };

  const handleTableImage2 = (file) => {
    setImage1(file);
  };

  const handleTableImage3 = (file) => {
    setImage2(file);
  };
  const COLUMNS = [
    {
      Header: 'ID',
      accessor: (d, i) => i + 1,
    },
    {
      Header: 'Media',
      accessor: 'image',
      Cell: (props) => {
        const mediaUrl = props.value;

        if (mediaUrl) {
          const isVideo =
            mediaUrl.endsWith('.mp4') ||
            mediaUrl.endsWith('.mov') ||
            mediaUrl.endsWith('.avi');

          return isVideo ? (
            <video
              src={mediaUrl}
              alt="video"
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'cover',
              }}
              controls
            />
          ) : (
            <img
              src={mediaUrl}
              alt="image"
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'cover',
              }}
            />
          );
        } else {
          return <MdInsertPhoto size={50} />;
        }
      },
    },

    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Text',
      accessor: 'text',
    },
  ];
  const COLUMNS2 = [
    {
      Header: 'ID',
      accessor: (d, i) => i + 1,
    },

    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Text',
      accessor: 'text',
    },
  ];
  const COLUMNS3 = [
    {
      Header: 'ID',
      accessor: (d, i) => i + 1,
    },
    {
      Header: 'Images',
      accessor: 'images',
      Cell: (props) => {
        const imageArray = props.value;

        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              overflowX: 'scroll',
            }}
          >
            {Array.isArray(imageArray) && imageArray.length > 0 ? (
              imageArray.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl.image}
                  alt={`Image ${index}`}
                  style={{
                    width: '50px',
                    height: '50px',
                    marginRight: '5px',
                  }}
                />
              ))
            ) : (
              <MdInsertPhoto size={50} />
            )}
          </div>
        );
      },
    },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Text',
      accessor: 'text',
    },
  ];

  if (fullAccess) {
    COLUMNS.push({
      Header: 'ACTIONS',
      accessor: 'action',
      Cell: (props) => {
        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <Button
              variant="warning"
              onClick={() => {
                handleEditShow(props.row.original);
              }}
            >
              <FaEdit />
            </Button>
          </div>
        );
      },
    });
  }
  if (fullAccess) {
    COLUMNS2.push({
      Header: 'ACTIONS',
      accessor: 'action',
      Cell: (props) => {
        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <Button
              variant="warning"
              onClick={() => handleEditShow(props.row.original)}
            >
              <FaEdit />
            </Button>
          </div>
        );
      },
    });
  }
  if (fullAccess) {
    COLUMNS3.push({
      Header: 'ACTIONS',
      accessor: 'action',
      Cell: (props) => {
        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <Button
              variant="warning"
              onClick={() => handleEditShow(props.row.original)}
            >
              <FaEdit />
            </Button>
          </div>
        );
      },
    });
  }

  return (
    <>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <div>
          {hasServerError ? (
            <ServerError />
          ) : read ? (
            <Container fluid className="mt-3 ">
              <Row className="boxShadow p-4 mb-4 mt-4">
                <Col className="d-flex flex-row justify-content-between mt-1">
                  <h4 className="fw-bold">About us</h4>
                </Col>
              </Row>

              <Row className="boxShadow p-4 mb-4">
                <BasicTable
                  COLUMNS={COLUMNS}
                  MOCK_DATA={section1}
                  isPagination={false}
                  isHeading={false}
                />
              </Row>
              <Row className="boxShadow p-4 mb-4">
                <BasicTable
                  COLUMNS={COLUMNS2}
                  MOCK_DATA={section2}
                  isPagination={false}
                  isHeading={false}
                />
              </Row>
              <Row className="boxShadow p-4 mb-4">
                <BasicTable
                  COLUMNS={COLUMNS3}
                  MOCK_DATA={section3}
                  isPagination={false}
                  isHeading={false}
                />
              </Row>
            </Container>
          ) : (
            <NoAccess />
          )}
          <Modal show={section1Show} onHide={() => handleEditClose()} centered dialogClassName="all-modal"> 
            <Modal.Header closeButton>
              <Modal.Title>Edit About us</Modal.Title>
            </Modal.Header>
            <Formik
              initialValues={{ title: title, text: text, image: '' }}
              validationSchema={Yup.object().shape({
                title: Yup.string().required('Title is required'),
                text: Yup.string().required('Text is required'),
              })}
              onSubmit={handleEditData}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors,
                setFieldValue,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Modal.Body>
                    <Form.Group controlId="formTitle">
                      <Form.Label>
                        Title <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        type="text"
                        name="title"
                        value={values.title}
                        className="form-control"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <Form.Group controlId="formText">
                      <Form.Label>
                        Text <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        as="textarea"
                        type="text"
                        value={values.text}
                        name="text"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="text"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <DragAndDropImageUpload
                  labelText="Upload Image"
                  accepts={{
                    'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
                  }}
                      touched={touched}
                      errors={errors}
                      setFieldValue={setFieldValue}
                      handleFileChange={(file) => {
                        handleTable1(file);
                      }}
                    />
                    <div>
                  <small className="text-muted">
                    Accepted file types: .jpg , .jpeg, .png, .svg, .webp{' '}
                  </small>
                </div>
                <InputImage image={images} valueImage={images} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setSection1Show(false)}
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
          <Modal show={section2Show} onHide={() => handleEditClose()} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit About us</Modal.Title>
            </Modal.Header>
            <Formik
              initialValues={{ title: title, text: text }}
              validationSchema={Yup.object().shape({
                title: Yup.string().required('Title is required'),
                text: Yup.string().required('Text is required'),
              })}
              onSubmit={handleEditData}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors,
                setFieldValue,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Modal.Body>
                    <Form.Group controlId="formTitle">
                      <Form.Label>
                        Title <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        type="text"
                        name="title"
                        value={values.title}
                        className="form-control"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <Form.Group controlId="formText">
                      <Form.Label>
                        Text <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        as="textarea"
                        type="text"
                        value={values.text}
                        name="text"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="text"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setSection2Show(false)}
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
          <Modal
            show={section3Show}
            onHide={() => handleEditClose()}
            centered
            dialogClassName="review-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit About us</Modal.Title>
            </Modal.Header>
            <Formik
              initialValues={{
                title: title,
                text: text,
                image: '',
                image1: '',
                image2: '',
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string().required('Title is required'),
                text: Yup.string().required('Text is required'),
              })}
              onSubmit={handleEditData}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors,
                setFieldValue,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Modal.Body>
                    <Form.Group controlId="formTitle" className="mb-3">
                      <Form.Label>
                        Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        type="text"
                        name="title"
                        value={values.title}
                        className="form-control"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>

                    <Form.Group controlId="formText" className="mb-3">
                      <Form.Label>
                        Text <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        as="textarea"
                        type="text"
                        value={values.text}
                        name="text"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="text"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <DragAndDropImageUpload
                      labelText="Image1"
                      nameText="image"
                      accepts={{
                        'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
                      }}
                      touched={touched}
                      errors={errors}
                      setFieldValue={setFieldValue}
                      handleFileChange={(file) => {
                        handleTableImage1(file);
                      }}
                    />
                    <div>
                      <small className="text-muted">
                        Accepted file types: .jpg , .jpeg, .png, .svg, .webp
                      </small>
                    </div>
                    <InputImage image={image} valueImage={values.image} />
                    <DragAndDropImageUpload
                      labelText="Image2"
                      nameText="image1"
                      accepts={{
                        'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
                      }}
                      touched={touched}
                      errors={errors}
                      setFieldValue={setFieldValue}
                      handleFileChange={(file) => {
                        handleTableImage2(file);
                      }}
                    />
                    <div>
                      <small className="text-muted">
                        Accepted file types: .jpg , .jpeg, .png, .svg, .webp
                      </small>
                    </div>
                    <InputImage image={image1} valueImage={values.image1} />
                    <DragAndDropImageUpload
                      labelText="Image3"
                      nameText="image2"
                      accepts={{
                        'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
                      }}
                      touched={touched}
                      errors={errors}
                      setFieldValue={setFieldValue}
                      handleFileChange={(file) => {
                        handleTableImage3(file);
                      }}
                    />
                    <div>
                      <small className="text-muted">
                        Accepted file types: .jpg , .jpeg, .png, .svg, .webp
                      </small>
                    </div>
                    <InputImage image={image2} valueImage={values.image2} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setSection3Show(false)}
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

export default AboutUs;
