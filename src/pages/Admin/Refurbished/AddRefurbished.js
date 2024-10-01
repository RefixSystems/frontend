import { Formik } from 'formik';
import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { RefurbishedSchema } from '../../../pages/Admin/Refurbished/RefurbishedValidation';
import BasicButton from '../../../components/BasicButton';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import { toast } from 'react-toastify';
import { useAddRefurbishedMutation } from '../../../redux/api/RefurbishedApi';
import { getRole } from '../../../Constants/Global';
import InputImage from '../../../components/InputImage';
import DragAndDropImageUpload from '../../../components/DragAndDropImageUpload';

const AddRefurbished = () => {
  const [amount, setamount] = useState('');
  const [brand, setbrand] = useState('');
  const [model, setmodel] = useState('');
  const [processor, setprocessor] = useState('');
  const [ram, setram] = useState('');
  const [image1, setimage1] = useState('');
  const [image2, setimage2] = useState('');
  const [image3, setimage3] = useState('');
  const [image4, setimage4] = useState('');
  const [image5, setimage5] = useState('');
  const [storage, setstorage] = useState('');
  const [description, setdescription] = useState('');
  const [color, setcolor] = useState('');
  const [operatingSystem, setoperatingSystem] = useState('');
  const [screenSize, setscreenSize] = useState('');
  const role = getRole();
  const [RefurbishedAddData, { isLoading }] = useAddRefurbishedMutation({
    role: role,
  });

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/admin/refurbished-laptop');
  };

  const initialValues = {
    brand: '',
    model: '',
    processor: '',
    ram: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    screenSize: '',
    storage: '',
    color: '',
    operatingSystem: '',
    description: '',
  };

  const handleAddData = async () => {
    try {
      const formData = new FormData();
      formData.append('amount', amount);
      formData.append('brand', brand);
      formData.append('model', model);
      formData.append('processor', processor);
      formData.append('image1', image1);
      formData.append('image2', image2);
      formData.append('image3', image3);
      formData.append('image4', image4);
      formData.append('image5', image5);
      formData.append('screenSize', screenSize);
      formData.append('description', description);
      formData.append('storage', storage);
      formData.append('color', color);
      formData.append('ram', ram);
      formData.append('operatingSystem', operatingSystem);

      const response = await RefurbishedAddData({
        data: formData,
        role: role,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setTimeout(() => navigate('/admin/refurbished-laptop'), 3000);

        setamount('');
        setbrand('');
        setmodel('');
        setprocessor('');
        setram('');
        setimage1('');
        setimage2('');
        setimage3('');
        setimage4('');
        setimage5('');
        setscreenSize('');
        setstorage('');
        setcolor('');
        setoperatingSystem('');
        setdescription('');
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleimage1 = (file) => {
    setimage1(file);
  };

  const handleimage2 = (file) => {
    setimage2(file);
  };

  const handleimage3 = (file) => {
    setimage3(file);
  };
  const handleimage4 = (file) => {
    setimage4(file);
  };
  const handleimage5 = (file) => {
    setimage5(file);
  };
  return (
    <div>
      <Container fluid className="">
        <Formik
          initialValues={initialValues}
          validationSchema={RefurbishedSchema}
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
                    <h4>Add Refurbished</h4>
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
                        brand === '' ||
                        model === '' ||
                        processor === '' ||
                        ram === '' ||
                        storage === '' ||
                        color === '' ||
                        operatingSystem === '' ||
                        description === '' ||
                        image1 === '' ||
                        image2 === '' ||
                        image3 === '' ||
                        image4 === '' ||
                        image5 === '' ||
                        (touched.brand && errors.brand) ||
                        (touched.model && errors.model) ||
                        (touched.processor && errors.processor) ||
                        (touched.ram && errors.ram) ||
                        (touched.storage && errors.storage) ||
                        (touched.color && errors.color) ||
                        (touched.operatingSystem && errors.operatingSystem) ||
                        (touched.description && errors.description) ||
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
                        label="Amount"
                        type=""
                        name="amount"
                        placeholder="Enter the amount here"
                        star="none"
                        className={`form-control ${
                          touched.amount && errors.amount ? 'is-invalid' : ''
                        }`}
                        onChange={(e) => {
                          setamount(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.amount && errors.amount ? (
                            <p className="text-danger">{errors.amount}</p>
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
                        label="Brand"
                        type=""
                        name="brand"
                        placeholder="Enter the brand here"
                        className={`form-control ${
                          touched.brand && errors.brand ? 'is-invalid' : ''
                        }`}
                        onChange={(e) => {
                          setbrand(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.brand && errors.brand ? (
                            <p className="text-danger">{errors.brand}</p>
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
                        label="Model"
                        type=""
                        name="model"
                        placeholder="Enter the model here"
                        className={`form-control ${
                          touched.model && errors.model ? 'is-invalid' : ''
                        }`}
                        onChange={(e) => {
                          setmodel(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.model && errors.model ? (
                            <p className="text-danger">{errors.model}</p>
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
                      <DragAndDropImageUpload
                        labelText="Image1"
                        nameText="image1"
                        accepts={{
                          'image/*': [
                            '.png',
                            '.jpeg',
                            '.jpg',
                            '.svg',
                            '.webp',
                            '.gif',
                          ],
                        }}
                        touched={touched}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        handleFileChange={(file) => {
                          handleimage1(file);
                        }}
                      />
                      <div>
                        <small className="text-muted">
                          Accepted file types: .jpg, .jpeg, .png, .svg, .webp,
                          .gif
                        </small>
                      </div>
                      <div>
                        <small className="">Dimensions should be 1:1 </small>
                      </div>
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
                      <DragAndDropImageUpload
                        labelText="Image2"
                        nameText="image2"
                        accepts={{
                          'image/*': [
                            '.png',
                            '.jpeg',
                            '.jpg',
                            '.svg',
                            '.webp',
                            '.gif',
                          ],
                        }}
                        touched={touched}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        handleFileChange={(file) => {
                          handleimage2(file);
                        }}
                      />
                      <div>
                        <small className="text-muted">
                          Accepted file types: .jpg, .jpeg, .png, .svg, .webp,
                          .gif
                        </small>
                      </div>
                      <div>
                        <small className="">Dimensions should be 1:1 </small>
                      </div>
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
                      <DragAndDropImageUpload
                        labelText="Image3"
                        nameText="image3"
                        accepts={{
                          'image/*': [
                            '.png',
                            '.jpeg',
                            '.jpg',
                            '.svg',
                            '.webp',
                            '.gif',
                          ],
                        }}
                        touched={touched}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        handleFileChange={(file) => {
                          handleimage3(file);
                        }}
                      />
                      <div>
                        <small className="text-muted">
                          Accepted file types: .jpg, .jpeg, .png, .svg, .webp,
                          .gif
                        </small>
                      </div>
                      <div>
                        <small className="">Dimensions should be 1:1 </small>
                      </div>
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
                      <DragAndDropImageUpload
                        labelText="Image4"
                        nameText="image4"
                        accepts={{
                          'image/*': [
                            '.png',
                            '.jpeg',
                            '.jpg',
                            '.svg',
                            '.webp',
                            '.gif',
                          ],
                        }}
                        touched={touched}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        handleFileChange={(file) => {
                          handleimage4(file);
                        }}
                      />
                      <div>
                        <small className="text-muted">
                          Accepted file types: .jpg, .jpeg, .png, .svg, .webp,
                          .gif
                        </small>
                      </div>
                      <div>
                        <small className="">Dimensions should be 1:1 </small>
                      </div>
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
                      <DragAndDropImageUpload
                        labelText="Image5"
                        nameText="image5"
                        accepts={{
                          'image/*': [
                            '.png',
                            '.jpeg',
                            '.jpg',
                            '.svg',
                            '.webp',
                            '.gif',
                          ],
                        }}
                        touched={touched}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        handleFileChange={(file) => {
                          handleimage5(file);
                        }}
                      />
                      <div>
                        <small className="text-muted">
                          Accepted file types: .jpg, .jpeg, .png, .svg, .webp,
                          .gif
                        </small>
                      </div>
                      <div>
                        <small className="">Dimensions should be 1:1 </small>
                      </div>
                      <InputImage image={image5} valueImage={values.image5} />
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
                        label="storage"
                        type=""
                        name="storage"
                        placeholder="Enter the storage here"
                        className={`form-control ${
                          touched.storage && errors.storage ? 'is-invalid' : ''
                        }`}
                        onChange={(e) => {
                          setstorage(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.storage && errors.storage ? (
                            <p className="text-danger">{errors.storage}</p>
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
                        label="Color"
                        type=""
                        name="color"
                        placeholder="Enter the color here"
                        className={`form-control ${
                          touched.color && errors.color ? 'is-invalid' : ''
                        }`}
                        onChange={(e) => {
                          setcolor(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.color && errors.color ? (
                            <p className="text-danger">{errors.color}</p>
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
                        label="processor"
                        type=""
                        name="processor"
                        placeholder="Enter the processor here"
                        className={`form-control ${
                          touched.processor && errors.processor
                            ? 'is-invalid'
                            : ''
                        }`}
                        onChange={(e) => {
                          setprocessor(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.processor && errors.processor ? (
                            <p className="text-danger">{errors.processor}</p>
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
                        label="Ram"
                        type=""
                        name="ram"
                        placeholder="Enter the ram here"
                        className={`form-control ${
                          touched.ram && errors.ram ? 'is-invalid' : ''
                        }`}
                        onChange={(e) => {
                          setram(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.ram && errors.ram ? (
                            <p className="text-danger">{errors.ram}</p>
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
                        label="Screen Size"
                        type=""
                        name="screenSize"
                        placeholder="Enter the screen size here"
                        className={`form-control ${
                          touched.screenSize && errors.screenSize
                            ? 'is-invalid'
                            : ''
                        }`}
                        onChange={(e) => {
                          setscreenSize(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.screenSize && errors.screenSize ? (
                            <p className="text-danger">{errors.screenSize}</p>
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
                        label="operatingSystem"
                        type=""
                        name="operatingSystem"
                        placeholder="Enter the operating system here"
                        className={`form-control ${
                          touched.operatingSystem && errors.operatingSystem
                            ? 'is-invalid'
                            : ''
                        }`}
                        onChange={(e) => {
                          setoperatingSystem(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.operatingSystem && errors.operatingSystem ? (
                            <p className="text-danger">
                              {errors.operatingSystem}
                            </p>
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
                          setdescription(e.target.value);
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
                        brand === '' ||
                        model === '' ||
                        processor === '' ||
                        ram === '' ||
                        storage === '' ||
                        color === '' ||
                        operatingSystem === '' ||
                        description === '' ||
                        image1 === '' ||
                        image2 === '' ||
                        image3 === '' ||
                        image4 === '' ||
                        image5 === '' ||
                        (touched.brand && errors.brand) ||
                        (touched.model && errors.model) ||
                        (touched.processor && errors.processor) ||
                        (touched.ram && errors.ram) ||
                        (touched.storage && errors.storage) ||
                        (touched.color && errors.color) ||
                        (touched.operatingSystem && errors.operatingSystem) ||
                        (touched.description && errors.description) ||
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
export default AddRefurbished;
