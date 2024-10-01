import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { CouponSchema } from './CuponValidation';
import BasicButton from '../../../components/BasicButton';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import { toast } from 'react-toastify';
import {
  useAddCouponMutation,
  useGetCategoryQuery,
} from '../../../redux/api/CouponApi';
import { getRole } from '../../../Constants/Global';
import Select from 'react-select';
import InputImage from '../../../components/InputImage';
import DragAndDropImageUpload from '../../../components/DragAndDropImageUpload';

const AddCoupon = () => {
  const [title, setTitle] = useState('');
  const [limit, setLimit] = useState('');
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState('');
  const fileInputRef = useRef(null);
  const [applicableTo, setApplicableTo] = useState([]);
  const role = getRole();
  const [CouponAddData, { isLoading }] = useAddCouponMutation();
  const { data: CategoryData } = useGetCategoryQuery();

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/admin/coupon');
  };

  const initialValues = {
    image: '',
    title: '',
    limit: '',
    code: '',
    value: '',
    description: '',
    startDate: '',
    endDate: '',
    applicableTo: '',
  };

  const applicableToOptions =
    CategoryData?.data?.map((category) => ({
      value: category,
      label: category,
    })) || [];

  const formatDate = (date) => {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleAddData = async () => {
    try {
      const formattedEndDate = endDate ? formatDate(endDate) : null;
      const formattedStartDate = startDate ? formatDate(startDate) : null;

      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('limit', limit);
      formData.append('code', code);
      formData.append('value', value);
      formData.append('description', description);
      formData.append('endDate', formattedEndDate);
      formData.append('startDate', formattedStartDate);
      formData.append('role', role);
      formData.append(
        'applicable',
        applicableTo.map((option) => option.value).join(',')
      );

      const response = await CouponAddData({ data: formData, role: role });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setTimeout(() => navigate('/admin/coupon'), 3000);
        setImage('');
        setTitle('');
        setLimit('');
        setCode('');
        setValue('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setApplicableTo([]);
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          onSubmit={handleAddData}
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
                <Row className="d-flex flex-row justify-content-between align-items-center">
                  <Col className="d-flex justify-content-start mb-3 mt-3">
                    <h4 onClick={handleCancel} className="mx-2">
                      <AiOutlineArrowLeft />
                    </h4>
                    <h4>Add Coupon</h4>
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
                      label="Save"
                      type="submit"
                      isLoading={isLoading}
                      loaderVariant="info"
                      disabled={isSubmitting}
                      onClick={
                        image === '' ||
                        title === '' ||
                        limit === '' ||
                        code === '' ||
                        value === '' ||
                        description === '' ||
                        applicableTo === '' ||
                        startDate === '' ||
                        description === '' ||
                        endDate === '' ||
                        (touched.image && errors.image) ||
                        (touched.title && errors.title) ||
                        (touched.limit && errors.limit) ||
                        (touched.applicableTo && errors.applicableTo) ||
                        (touched.code && errors.code) ||
                        (touched.value && errors.value) ||
                        (touched.description && errors.description) ||
                        (touched.startDate && errors.startDate) ||
                        (touched.endDate && errors.endDate)
                          ? handleSubmit
                          : handleAddData
                      }
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
                      <TextInput
                        label="Code"
                        type=""
                        name="code"
                        placeholder="Enter the code here"
                        className={`form-control ${
                          touched.code && errors.code ? 'is-invalid' : ''
                        }`}
                        onChange={(e) => {
                          const upperCaseValue = e.target.value.toUpperCase();
                          setCode(upperCaseValue);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        value={code}
                        validation={
                          touched.code && errors.code ? (
                            <p className="text-danger">{errors.code}</p>
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
                        label="Value (₹)"
                        type=""
                        name="value"
                        placeholder="Enter the value here"
                        className={`form-control ${
                          touched.value && errors.value ? 'is-invalid' : ''
                        }`}
                        onChange={(e) => {
                          setValue(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.value && errors.value ? (
                            <p className="text-danger">{errors.value}</p>
                          ) : (
                            ''
                          )
                        }
                      />
                    </Col>
                    <Col className="m-2" lg="12">
                      <label
                        htmlFor="applicableToSelect1"
                        className="form-label"
                      >
                        Applicable To<span className="text-danger">*</span>
                      </label>
                      <Select
                        id="applicableToSelect1"
                        isMulti
                        options={applicableToOptions}
                        value={values.applicableTo}
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

                <Row className="d-sm-flex d-flex d-md-flex d-lg-none d-xxl-none d-xl-none flex-row justify-content-between align-items-center">
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
                      label="Save"
                      type="submit"
                      isLoading={isLoading}
                      loaderVariant="info"
                      disabled={isSubmitting}
                      onClick={
                        image === '' ||
                        title === '' ||
                        limit === '' ||
                        code === '' ||
                        value === '' ||
                        description === '' ||
                        applicableTo === '' ||
                        startDate === '' ||
                        description === '' ||
                        endDate === '' ||
                        (touched.image && errors.image) ||
                        (touched.title && errors.title) ||
                        (touched.limit && errors.limit) ||
                        (touched.applicableTo && errors.applicableTo) ||
                        (touched.code && errors.code) ||
                        (touched.value && errors.value) ||
                        (touched.description && errors.description) ||
                        (touched.startDate && errors.startDate) ||
                        (touched.endDate && errors.endDate)
                          ? handleSubmit
                          : handleAddData
                      }
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
export default AddCoupon;
