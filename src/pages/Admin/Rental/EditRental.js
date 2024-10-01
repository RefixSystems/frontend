import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { RentalSchema } from '../../../pages/Admin/Rental/RentalValidation';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import BasicButton from '../../../components/BasicButton';
import TextArea from '../../../components/TextArea';
import TextInput from '../../../components/TextInput';
('');
import {
  useEditRentalMutation,
  useGetRentalByIdQuery,
} from '../../../redux/api/RentalApi';
import { toast } from 'react-toastify';
import { getRole } from '../../../Constants/Global';
import InputImage from '../../../components/InputImage';
import DragAndDropImageUpload from '../../../components/DragAndDropImageUpload';

const EditRental = () => {
  const [amountFor6Months, setAmountFor6Months] = useState('');
  const [brand, setbrand] = useState('');
  const [model, setmodel] = useState('');
  const [processor, setprocessor] = useState('');
  const [ram, setram] = useState('');
  const [screenSize, setscreenSize] = useState('');
  const [storage, setstorage] = useState('');
  const [color, setcolor] = useState('');
  const [operatingSystem, setoperatingSystem] = useState('');
  const [description, setdescription] = useState('');
  const [addInCarousel, setAddInCarousel] = useState('');
  const [status, setStatus] = useState('');
  const [image1, setimage1] = useState('');
  const [image2, setimage2] = useState('');
  const [image3, setimage3] = useState('');
  const [image4, setimage4] = useState('');
  const [image5, setimage5] = useState('');
  const role = getRole();
  const { id } = useParams();
  const Id = id.startsWith(':') ? id.slice(1) : id;
  const [EditRentalData, { isLoading }] = useEditRentalMutation();
  const { data: EditRental } = useGetRentalByIdQuery({ id: Id, role: role });

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/admin/rental');
  };

  useEffect(() => {
    if (EditRental && EditRental.data) {
      setAmountFor6Months(EditRental.data.amountFor6Months);
      setbrand(EditRental.data.brand);
      setmodel(EditRental.data.model);
      setprocessor(EditRental.data.processor);
      setram(EditRental.data.ram);
      setscreenSize(EditRental.data.screenSize);
      setstorage(EditRental.data.storage);
      setcolor(EditRental.data.color);
      setoperatingSystem(EditRental.data.operatingSystem);
      setAddInCarousel(EditRental.data.addInCarousel);
      setdescription(EditRental.data.description);
      setStatus(EditRental.data.status);
      setimage1(EditRental.data.image);
      if (Array.isArray(EditRental.data.images)) {
        setimage2(EditRental.data.images[0]);
        setimage3(EditRental.data.images[1]);
        setimage4(EditRental.data.images[2]);
        setimage5(EditRental.data.images[3]);
      }
    }
  }, [EditRental]);

  const initialValues = {
    amountFor6Months: '',
    brand: '',
    model: '',
    processor: '',
    ram: '',
    screenSize: '',
    storage: '',
    color: '',
    operatingSystem: '',
    description: '',
    status: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    addInCarousel: '',
  };

  const handleEditData = async () => {
    try {
      const formData = new FormData();
      formData.append('amountFor6Months', amountFor6Months);
      formData.append('brand', brand);
      formData.append('model', model);
      formData.append('processor', processor);
      formData.append('ram', ram);
      formData.append('screenSize', screenSize);
      formData.append('storage', storage);
      formData.append('color', color);
      formData.append('operatingSystem', operatingSystem);
      formData.append('description', description);
      formData.append('status', status);
      formData.append('image1', image1);
      formData.append('image2', image2);
      formData.append('image3', image3);
      formData.append('image4', image4);
      formData.append('image5', image5);
      formData.append('addInCarousel', String(addInCarousel));

      const response = await EditRentalData({
        id: Id,
        role: role,
        data: formData,
      });

      if (response?.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        navigate('/admin/rental');
      } else {
        toast.error(response.error?.data?.error, { autoClose: 1000 });
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
          validationSchema={RentalSchema}
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
                    <h4>Edit Rental</h4>
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
                            await RentalSchema.validateAt(field, {
                              amountFor6Months,
                              brand,
                              model,
                              processor,
                              ram,
                              screenSize,
                              storage,
                              color,
                              operatingSystem,
                              addInCarousel,
                              description,
                              status,
                              image1,
                              image2,
                              image3,
                              image4,
                              image5,
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
                        label="Amount For 6 Months"
                        type=""
                        name="amountFor6Months"
                        placeholder="Enter the amount here"
                        value={amountFor6Months}
                        className={`form-control ${
                          touched.amountFor6Months && errors.amountFor6Months
                            ? 'is-invalid'
                            : ''
                        }`}
                        onChange={(e) => {
                          setAmountFor6Months(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.amountFor6Months &&
                          errors.amountFor6Months ? (
                            <p className="text-danger">
                              {errors.amountFor6Months}
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
                      <TextInput
                        label="Brand"
                        type=""
                        name="brand"
                        placeholder="Enter the brand here"
                        value={brand}
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
                        value={model}
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

                    <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <label htmlFor="addInCarousel" className="mb-2">
                        Add In Carousel
                      </label>
                      <Form.Select
                        name="addInCarousel"
                        id="addInCarousel"
                        value={addInCarousel}
                        className={`form-control ${
                          touched.addInCarousel && errors.addInCarousel
                            ? 'is-invalid'
                            : ''
                        } mt-2`}
                        onChange={(e) => {
                          setAddInCarousel(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                      >
                        <option value="">Select an option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                      {touched.addInCarousel && errors.addInCarousel && (
                        <p className="text-danger">{errors.addInCarousel}</p>
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
                      <TextInput
                        label="storage"
                        type=""
                        name="storage"
                        placeholder="Enter the storage here"
                        value={storage}
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
                        value={color}
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
                        value={processor}
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
                        value={ram}
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
                        value={screenSize}
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
                        value={operatingSystem}
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
                          <option value="Active">Active</option>
                          <option value="Inactive">InActive</option>
                        </Form.Select>
                        {touched.status && errors.status ? (
                          <Form.Control.Feedback type="invalid">
                            {errors.status}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
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
                        value={description}
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
                            await RentalSchema.validateAt(field, {
                              amountFor6Months,
                              brand,
                              model,
                              processor,
                              ram,
                              screenSize,
                              storage,
                              color,
                              operatingSystem,
                              addInCarousel,
                              description,
                              status,
                              image1,
                              image2,
                              image3,
                              image4,
                              image5,
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

export default EditRental;
