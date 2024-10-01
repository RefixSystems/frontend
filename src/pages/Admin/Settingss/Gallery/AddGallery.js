import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { GallerySchema } from '../../../Admin/Settingss/Gallery/GalleryValidation';
import BasicButton from '../../../../components/BasicButton';
import TextInput from '../../../../components/TextInput';
import { toast } from 'react-toastify';
import { useAddGalleryMutation } from '../../../../redux/api/GalleryApi';
import { getRole } from '../../../../Constants/Global';
import InputImage from '../../../../components/InputImage';

const AddGallery = () => {
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [landline, setLandline] = useState('');
  const [mobile, setMobile] = useState('');
  const [image1, setimage1] = useState(null);
  const [image2, setimage2] = useState(null);
  const [image3, setimage3] = useState(null);
  const [image4, setimage4] = useState(null);
  const [image5, setimage5] = useState(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const fileInputRef5 = useRef(null);
  const role = getRole();
  const [GalleryAddData, { isLoading }] = useAddGalleryMutation();

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/admin/gallery-setting');
  };

  const initialValues = {
    location: '',
    address: '',
    landline: '',
    mobile: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
  };

  const handleAddData = async () => {
    try {
      const formData = new FormData();
      formData.append('location', location);
      formData.append('address', address);
      formData.append('landline', landline);
      formData.append('mobile', mobile);
      formData.append('images', image1);
      formData.append('images', image2);
      formData.append('images', image3);
      formData.append('images', image4);
      formData.append('images', image5);

      const response = await GalleryAddData({
        role: role,
        data: formData,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setTimeout(() => navigate('/admin/gallery-setting'), 3000);

        setLocation('');
        setAddress('');
        setLandline('');
        setMobile('');
        setimage1([]);
        setimage2([]);
        setimage3([]);
        setimage4([]);
        setimage5([]);
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleimage1 = (event) => {
    const file = event.target.files[0];
    setimage1(file);
  };

  const handleimage2 = (event) => {
    const file = event.target.files[0];
    setimage2(file);
  };

  const handleimage3 = (event) => {
    const file = event.target.files[0];
    setimage3(file);
  };
  const handleimage4 = (event) => {
    const file = event.target.files[0];
    setimage4(file);
  };
  const handleimage5 = (event) => {
    const file = event.target.files[0];
    setimage5(file);
  };

  return (
    <div>
      <Container fluid>
        <Formik
          initialValues={initialValues}
          validationSchema={GallerySchema}
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
                    <h4>Add Gallery</h4>
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
                      type="button"
                      isLoading={isLoading}
                      loaderVariant="info"
                      disabled={isSubmitting}
                      onClick={
                        location === '' ||
                        address === '' ||
                        landline === '' ||
                        mobile === '' ||
                        image1 === '' ||
                        image2 === '' ||
                        image3 === '' ||
                        image4 === '' ||
                        image5 === '' ||
                        (touched.location && errors.location) ||
                        (touched.address && errors.address) ||
                        (touched.image1 && errors.image1) ||
                        (touched.image2 && errors.image2) ||
                        (touched.image3 && errors.image3) ||
                        (touched.image4 && errors.image4) ||
                        (touched.image5 && errors.image5)
                          ? handleSubmit
                          : handleAddData
                      }
                    />
                  </Col>
                </Row>
                <Row className="d-flex flex-wrap flex-lg-row flex-xxl-row flex-xl-row flex-column flex-md-column flex-sm-column  mt-4">
                  <Col className="m-1 p-4 d-flex flex-wrap flex-column shadow rounded">
                    <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <TextInput
                        label="Location"
                        type=""
                        name="location"
                        className={`form-control ${
                          touched.location && errors.location
                            ? 'is-invalid'
                            : ''
                        }`}
                        onChange={(e) => {
                          setLocation(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.location && errors.location ? (
                            <p className="text-danger">{errors.location}</p>
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
                        label="Address"
                        type=""
                        name="address"
                        className={`form-control ${
                          touched.address && errors.address ? 'is-invalid' : ''
                        }`}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.address && errors.address ? (
                            <p className="text-danger">{errors.address}</p>
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
                        label="Landline"
                        type=""
                        name="landline"
                        className={`form-control ${
                          touched.landline && errors.landline ? 'is-invalid' : ''
                        }`}
                        onChange={(e) => {
                          setLandline(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.landline && errors.landline ? (
                            <p className="text-danger">{errors.landline}</p>
                          ) : (
                            ''
                          )
                        }
                      />
                    </Col> <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <TextInput
                        label="Mobile"
                        type=""
                        name="mobile"
                        className={`form-control ${
                          touched.mobile && errors.mobile ? 'is-invalid' : ''
                        }`}
                        onChange={(e) => {
                          setMobile(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.mobile && errors.mobile ? (
                            <p className="text-danger">{errors.mobile}</p>
                          ) : (
                            ''
                          )
                        }
                      />
                    </Col>

                  
                  </Col>

                  <Col className="m-1 p-4 d-flex flex-wrap flex-column shadow rounded">

                  <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <TextInput
                        label="Image1"
                        type="file"
                        accept=".jpg,.jpeg,.png,.svg,.webp"
                        name="image1"
                        multiple
                        className={`form-control ${
                          touched.image1 && errors.image1 ? 'is-invalid' : ''
                        }`}
                        ref={fileInputRef1}
                        onChange={(e) => {
                          handleimage1(e);
                          setFieldValue('image1', e.target.files[0]);
                        }}
                        validation={
                          touched.image1 && errors.image1 ? (
                            <p className="text-danger">{errors.image1}</p>
                          ) : (
                            ''
                          )
                        }
                      />
                      <InputImage image={image1} valueImage={values.image1} />
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
                        label="Image2"
                        type="file"
                        accept=".jpg,.jpeg,.png,.svg,.webp"
                        name="image2"
                        multiple
                        className={`form-control ${
                          touched.image2 && errors.image2 ? 'is-invalid' : ''
                        }`}
                        ref={fileInputRef2}
                        onChange={(e) => {
                          handleimage2(e);
                          setFieldValue('image2', e.target.files[0]);
                        }}
                        validation={
                          touched.image2 && errors.image2 ? (
                            <p className="text-danger">{errors.image2}</p>
                          ) : (
                            ''
                          )
                        }
                      />
                      <InputImage image={image2} valueImage={values.image2} />
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
                        label="Image3"
                        type="file"
                        accept=".jpg,.jpeg,.png,.svg,.webp"
                        name="image3"
                        multiple
                        className={`form-control ${
                          touched.image3 && errors.image3 ? 'is-invalid' : ''
                        }`}
                        ref={fileInputRef3}
                        onChange={(e) => {
                          handleimage3(e);
                          setFieldValue('image3', e.target.files[0]);
                        }}
                        validation={
                          touched.image3 && errors.image3 ? (
                            <p className="text-danger">{errors.image3}</p>
                          ) : (
                            ''
                          )
                        }
                      />
                      <InputImage image={image3} valueImage={values.image3} />
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
                        label="Image4"
                        type="file"
                        name="image4"
                        accept=".jpg,.jpeg,.png,.svg,.webp"
                        multiple
                        className={`form-control ${
                          touched.image4 && errors.image4 ? 'is-invalid' : ''
                        }`}
                        ref={fileInputRef4}
                        onChange={(e) => {
                          handleimage4(e);
                          setFieldValue('image4', e.target.files[0]);
                        }}
                        validation={
                          touched.image4 && errors.image4 ? (
                            <p className="text-danger">{errors.image4}</p>
                          ) : (
                            ''
                          )
                        }
                      />
                      <InputImage image={image4} valueImage={values.image4} />
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
                        label="Image5"
                        type="file"
                        name="image5"
                        accept=".jpg,.jpeg,.png,.svg,.webp"
                        multiple
                        className={`form-control ${
                          touched.image5 && errors.image5 ? 'is-invalid' : ''
                        }`}
                        ref={fileInputRef5}
                        onChange={(e) => {
                          handleimage5(e);
                          setFieldValue('image5', e.target.files[0]);
                        }}
                        validation={
                          touched.image5 && errors.image5 ? (
                            <p className="text-danger">{errors.image5}</p>
                          ) : (
                            ''
                          )
                        }
                      />
                      <InputImage image={image5} valueImage={values.image5} />
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
                      type="button"
                      isLoading={isLoading}
                      loaderVariant="info"
                      disabled={isSubmitting}
                      onClick={
                        location === '' ||
                        address === '' ||
                        landline === '' ||
                        mobile === '' ||
                        image1 === '' ||
                        image2 === '' ||
                        image3 === '' ||
                        image4 === '' ||
                        image5 === '' ||
                        (touched.location && errors.location) ||
                        (touched.address && errors.address) ||
                        (touched.image1 && errors.image1) ||
                        (touched.image2 && errors.image2) ||
                        (touched.image3 && errors.image3) ||
                        (touched.image4 && errors.image4) ||
                        (touched.image5 && errors.image5)
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
export default AddGallery;
