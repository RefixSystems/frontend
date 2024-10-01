import React, { useState, useEffect, useRef } from 'react';
import { Formik } from 'formik';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { CouponSchema } from './CuponValidation';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import BasicButton from '../../../components/BasicButton';
import TextArea from '../../../components/TextArea';
import TextInput from '../../../components/TextInput';
import {
  useEditCouponMutation,
  useGetCategoryQuery,
  useGetCouponByIdQuery,
} from '../../../redux/api/CouponApi';
import { toast } from 'react-toastify';
import { getRole } from '../../../Constants/Global';
import Select from 'react-select';
import InputImage from '../../../components/InputImage';
import DragAndDropImageUpload from '../../../components/DragAndDropImageUpload';

const EditCoupon = () => {
  const [title, setTitle] = useState('');
  const [limit, setLimit] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [applicableTo, setApplicableTo] = useState([]);
  const fileInputRef = useRef(null);
  const role = getRole();
  const { id } = useParams();
  const Id = id.startsWith(':') ? id.slice(1) : id;
  const [EditCouponData, { isLoading }] = useEditCouponMutation();
  const { data: EditCoupon } = useGetCouponByIdQuery({ id: Id, role: role });
  const navigate = useNavigate();
  const { data: CategoryData } = useGetCategoryQuery();

  const handleCancel = () => {
    navigate('/admin/coupon');
  };

  const formatDateForInput = (date) => {
    if (!date) return '';
    const [day, month, year] = date.split('/');
    if (!day || !month || !year) return '';
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (EditCoupon && EditCoupon.data) {
      setImage(EditCoupon.data.image);
      setTitle(EditCoupon.data.title);
      setLimit(EditCoupon.data.limit);
      if (
        EditCoupon.data.applicable &&
        typeof EditCoupon.data.applicable === 'string'
      ) {
        const applicableArray = EditCoupon.data.applicable
          .split(',')
          .map((item) => ({
            value: item,
            label: item,
          }));
        setApplicableTo(applicableArray);
      }
      setStatus(EditCoupon.data.status);
      setDescription(EditCoupon.data.description);
      setStartDate(formatDateForInput(EditCoupon.data.startDate));
      setEndDate(formatDateForInput(EditCoupon.data.endDate));
    }
  }, [EditCoupon]);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleEditData = async () => {
    try {
      const formattedStartDate = startDate ? formatDate(startDate) : '';
      const formattedEndDate = endDate ? formatDate(endDate) : '';
      const applicableValues = Array.isArray(applicableTo)
        ? applicableTo.map((option) => option.value).join(',')
        : '';

      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('limit', limit);
      formData.append('status', status);
      formData.append('description', description);
      formData.append('startDate', formattedStartDate);
      formData.append('endDate', formattedEndDate);
      formData.append('applicable', applicableValues);

      const response = await EditCouponData({
        id: Id,
        role: role,
        data: formData,
      });

      if (response?.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        navigate('/admin/coupon');
      } else {
        toast.error(response.error?.data?.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const initialValues = {
    image: '',
    title: '',
    limit: '',
    code: '',
    description: '',
    startDate: '',
    endDate: '',
    applicableTo: [],
  };

  const applicableToOptions =
    CategoryData?.data?.map((category) => ({
      value: category,
      label: category,
    })) || [];

  const handleimage = (file) => {
   setImage(file);
  };

  const handleApplicableToChange = (selectedOptions) => {
    setApplicableTo(selectedOptions);
  };

  return (
    <div>
      <Container fluid className="">
        <Formik
          initialValues={initialValues}
          validationSchema={CouponSchema}
          onSubmit={handleEditData}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <>
              <Form>
                <Row className="d-flex flex-row justify-content-between align-items-center mt-3">
                  <Col className="d-flex justify-content-start mb-3">
                    <h4 onClick={handleCancel} className="mx-2">
                      <AiOutlineArrowLeft />
                    </h4>
                    <h4>Edit Coupon</h4>
                  </Col>
                  <Col className="d-sm-none d-none d-md-none d-lg-flex d-xxl-flex d-xl-flex flex-row justify-content-end align-items-center">
                    <BasicButton
                      className="m-1"
                      variant="secondary"
                      onClick={handleCancel}
                      label="Cancel"
                    />
                    <BasicButton
                      className="m-1"
                      label="Update"
                      type="button"
                      isLoading={isLoading}
                      loaderVariant="info"
                      disabled={isSubmitting}
                      onClick={async () => {
                        try {
                          const touchedFields = Object.keys(touched);
                          for (const field of touchedFields) {
                            await CouponSchema.validateAt(field, {
                              image,
                              title,
                              limit,
                              status,
                              applicableTo,
                              description,
                              startDate,
                              endDate,
                            });
                          }
                          handleEditData();
                        } catch (error) {
                          toast.error(error.message, { autoClose: 1000 });
                        }
                      }}
                    />
                  </Col>
                </Row>
                <Row className="d-flex flex-wrap flex-lg-row flex-xxl-row flex-xl-row flex-column flex-md-column flex-sm-column  mt-4">
                  <Col className="m-1 p-4 d-flex flex-wrap flex-column shadow rounded bg-white">
                    <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <TextInput
                        label="Title"
                        type=""
                        name="title"
                        placeholder="Enter the title here"
                        value={title}
                        className={`form-control ${
                          touched.title && errors.title ? 'is-invalid' : ''
                        }`}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.title && errors.title ? (
                            <p className="text-danger">{errors.title}</p>
                          ) : (
                            ''
                          )
                        }
                      />
                    </Col>

                    <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <TextInput
                        label="Limit"
                        type=""
                        name="limit"
                        value={limit}
                        placeholder="Enter the limit here"
                        className={`form-control ${
                          touched.limit && errors.limit ? 'is-invalid' : ''
                        }`}
                        onChange={(e) => {
                          setLimit(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.limit && errors.limit ? (
                            <p className="text-danger">{errors.limit}</p>
                          ) : (
                            ''
                          )
                        }
                      />
                    </Col>

                    <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          name="status"
                          value={status}
                          placeholder="Enter the status here"
                          className={
                            touched.status && errors.status ? 'is-invalid' : ''
                          }
                          onChange={(e) => {
                            setStatus(e.target.value);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        >
                          <option value="">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Active">Active</option>
                          <option value="InActive">InActive</option>
                        </Form.Select>
                        {touched.status && errors.status ? (
                          <Form.Control.Feedback type="invalid">
                            {errors.status}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </Col>

                    <Col className="m-2" lg="12">
                      <label
                        htmlFor="applicableToSelect1"
                        className="form-label"
                      >
                        Applicable To
                      </label>
                      <Select
                        id="applicableToSelect1"
                        isMulti
                        options={applicableToOptions}
                        value={applicableTo}
                        onChange={(selectedOptions) => {
                          handleApplicableToChange(selectedOptions);
                          setFieldValue('applicableTo', selectedOptions);
                        }}
                        className={`basic-multi-select ${touched.applicableTo && errors.applicableTo ? 'is-invalid' : ''}`}
                        classNamePrefix="select"
                        placeholder="Select Applicable To"
                      />
                      {touched.applicableTo && errors.applicableTo && (
                        <p className="text-danger">{errors.applicableTo}</p>
                      )}
                    </Col>

                    <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <DragAndDropImageUpload
                        labelText="Image"
                        nameText="image"
                        accepts={{
                          'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
                        }}
                        touched={touched}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        handleFileChange={(file) => {
                          handleimage(file);
                        }}
                      />

                      <div>
                        <small className="text-muted">
                          Accepted file types: .jpg , .jpeg, .png, .svg, .webp{' '}
                        </small>
                        
                      </div>
                      <div>
                        <small className="">
                       Dimensions should be 1:1{' '}
                        </small>
                      </div>

                      <InputImage image={image} valueImage={values.image} />
                    </Col>
                  </Col>

                  <Col className="m-1 p-4 d-flex flex-wrap flex-column shadow rounded bg-white">
                    <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <TextInput
                        label="Start Date"
                        type="date"
                        name="startDate"
                        value={startDate}
                        className={`form-control ${
                          touched.startDate && errors.startDate
                            ? 'is-invalid'
                            : ''
                        }`}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.startDate && errors.startDate ? (
                            <p className="text-danger">{errors.startDate}</p>
                          ) : (
                            ''
                          )
                        }
                      />
                    </Col>

                    <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <TextInput
                        label="End Date"
                        type="date"
                        name="endDate"
                        value={endDate}
                        className={`form-control ${
                          touched.endDate && errors.endDate ? 'is-invalid' : ''
                        }`}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.endDate && errors.endDate ? (
                            <p className="text-danger">{errors.endDate}</p>
                          ) : (
                            ''
                          )
                        }
                      />
                    </Col>

                    <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <TextArea
                        label="Description"
                        type="textarea"
                        name="description"
                        value={description}
                        placeholder="Enter the description here"
                        className={`form-control ${
                          touched.description && errors.description
                            ? 'is-invalid'
                            : ''
                        }`}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.description && errors.description ? (
                            <p className="text-danger">{errors.description}</p>
                          ) : (
                            ''
                          )
                        }
                      />
                    </Col>
                  </Col>
                </Row>
                <Row className=" mt-3  d-sm-flex d-flex d-md-flex d-lg-none d-xxl-none d-xl-none flex-row justify-content-between align-items-center mt-3">
                  <Col className="d-flex justify-content-start align-items-center">
                    <BasicButton
                      className="m-1"
                      variant="secondary"
                      onClick={handleCancel}
                      label="Cancel"
                    />
                  </Col>

                  <Col className="d-flex justify-content-end align-items-center">
                    <BasicButton
                      className="m-1"
                      label="Update"
                      type="button"
                      isLoading={isLoading}
                      loaderVariant="info"
                      disabled={isSubmitting}
                      onClick={async () => {
                        try {
                          const touchedFields = Object.keys(touched);
                          for (const field of touchedFields) {
                            await CouponSchema.validateAt(field, {
                              image,
                              title,
                              limit,
                              status,
                              applicableTo,
                              description,
                              startDate,
                              endDate,
                            });
                          }
                          handleEditData();
                        } catch (error) {
                          toast.error(error.message, { autoClose: 1000 });
                        }
                      }}
                    />
                  </Col>
                </Row>
              </Form>
            </>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default EditCoupon;
