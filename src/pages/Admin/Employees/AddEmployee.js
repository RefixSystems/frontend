import React, { useEffect, useRef, useState } from 'react';
import {
  Col,
  Container,
  Form,
  Row,
  InputGroup,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import BasicButton from '../../../components/BasicButton';
import TextInput from '../../../components/TextInput';
import { toast } from 'react-toastify';
import { useAddUserCreationMutation } from '../../../redux/api/UserCreationApi';
import { userCreationSchema } from './EmployeeValidation';
import { useGetRoleQuery } from '../../../redux/api/RoleAccessApi';
import { getRole } from '../../../Constants/Global';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ErrorMessage, Field, Formik } from 'formik';
import InputImage from '../../../components/InputImage';
import DragAndDropImageUpload from '../../../components/DragAndDropImageUpload';

const AddUserCreation = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [nameOfEmployee, setnameOfEmployee] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const [roleOfEmployee, setroleOfEmployee] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [photo, setPhoto] = useState([]);
  const [idProof, setIdProof] = useState([]);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const fileInputRef = useRef(null);
  const role = getRole();
  const [UserAddData, { isLoading }] = useAddUserCreationMutation();
  const { data: roleListData } = useGetRoleQuery({ role: role });
  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (roleListData && roleListData.data) {
      setRoles(roleListData.data);
      if (!roleListData.data.includes(roleOfEmployee)) {
        setroleOfEmployee('');
      }
    }
  }, [roleListData, roleOfEmployee]);

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/admin/employee');
  };

  const initialValues = {
    // employeeId: '',
    nameOfEmployee: '',
    dateOfBirth: '',
    roleOfEmployee: '',
    photo: null,
    idProof: null,
    phoneNumber: '',
    email: '',
    password: '',
  };

  const handleAddData = async () => {
    try {
      const formData = new FormData();
      // formData.append('employeeId', employeeId);
      formData.append('nameOfEmployee', nameOfEmployee);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('roleOfEmployee', roleOfEmployee);
      formData.append('phoneNumber', phoneNumber);
      formData.append('image', photo);
      formData.append('idProof', idProof);
      formData.append('email', email);
      formData.append('password', password);
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      const response = await UserAddData({
        data: formData,
        role: role,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setTimeout(() => navigate('/admin/employee'), 3000);
        setEmployeeId('');
        setnameOfEmployee('');
        setdateOfBirth('');
        setroleOfEmployee('');
        setphoneNumber('');
        setPhoto([]);
        setIdProof([]);
        setemail('');
        setpassword('');
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (file) => {
    setPhoto(file);
  };

  const handleIdProofFileChange = (file) => {
    setIdProof(file);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Container fluid className="">
        <Formik
          initialValues={initialValues}
          validationSchema={userCreationSchema}
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
                    <h4>Add Employee</h4>
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
                        // employeeId === '' ||
                        nameOfEmployee === '' ||
                        dateOfBirth === '' ||
                        roleOfEmployee === '' ||
                        phoneNumber === '' ||
                        password === '' ||
                        photo === '' ||
                        idProof === '' ||
                        // (touched.employeeId && errors.employeeId) ||
                        (touched.nameOfEmployee && errors.nameOfEmployee) ||
                        (touched.dateOfBirth && errors.dateOfBirth) ||
                        (touched.roleOfEmployee && errors.roleOfEmployee) ||
                        (touched.phoneNumber && errors.phoneNumber) ||
                        (touched.password && errors.password) ||
                        (touched.photo && errors.photo) ||
                        (touched.idProof && errors.idProof)
                          ? handleSubmit
                          : handleAddData
                      }
                    />
                  </Col>
                </Row>
                <Row className="d-flex flex-wrap flex-lg-row flex-xxl-row flex-xl-row flex-column flex-md-column flex-sm-column  mt-4">
                  <Col className="m-1 p-4 d-flex flex-wrap flex-column shadow rounded bg-white">
                    {/* <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <Form.Group controlId="employeeId">
                        <Form.Label>
                          Employee Id <span className="text-danger">*</span>
                        </Form.Label>
                        <Field
                          type="text"
                          name="employeeId"
                          placeholder="Enter the employee id here"
                          className={`form-control ${
                            touched.employeeId && errors.employeeId
                              ? 'is-invalid'
                              : ''
                          }`}
                          onChange={(e) => {
                            setEmployeeId(e.target.value);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        />
                        {touched.employeeId && errors.employeeId ? (
                          <p className="text-danger">{errors.employeeId}</p>
                        ) : null}
                      </Form.Group>
                    </Col> */}
                    <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <Form.Group controlId="nameOfEmployee">
                        <Form.Label>
                          Name Of Employee{' '}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Field
                          type="text"
                          name="nameOfEmployee"
                          placeholder="Enter the name of employee here"
                          className={`form-control ${
                            touched.nameOfEmployee && errors.nameOfEmployee
                              ? 'is-invalid'
                              : ''
                          }`}
                          onChange={(e) => {
                            setnameOfEmployee(e.target.value);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        />
                        {touched.nameOfEmployee && errors.nameOfEmployee ? (
                          <p className="text-danger">{errors.nameOfEmployee}</p>
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
                      <FormGroup controlId="formDob">
                        <Form.Label>
                          Date of Birth <span className="text-danger">*</span>
                        </Form.Label>
                        <Field
                          label="Date Of Birth"
                          type="date"
                          name="dateOfBirth"
                          className={`form-control ${
                            touched.dateOfBirth && errors.dateOfBirth
                              ? 'is-invalid'
                              : ''
                          }`}
                          onChange={(e) => {
                            setdateOfBirth(e.target.value);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        />
                        {touched.dateOfBirth && errors.dateOfBirth ? (
                          <p className="text-danger">{errors.dateOfBirth}</p>
                        ) : (
                          ''
                        )}
                      </FormGroup>
                    </Col>

                    <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <Form.Group controlId="roleOfEmployee">
                        <Form.Label>
                          Role Of Employee{' '}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          name="roleOfEmployee"
                          value={roleOfEmployee}
                          placeholder="Enter the roleof employee here"
                          onChange={(e) => {
                            setroleOfEmployee(e.target.value);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          className={`form-control ${
                            touched.roleOfEmployee && errors.roleOfEmployee
                              ? 'is-invalid'
                              : ''
                          }`}
                        >
                          {roles.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </Form.Select>
                        {touched.roleOfEmployee && errors.roleOfEmployee ? (
                          <p className="text-danger">{errors.roleOfEmployee}</p>
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
                      <DragAndDropImageUpload
                        labelText="Photo"
                        nameText="photo"
                        accepts={{
                          'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
                        }}
                        touched={touched}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        handleFileChange={(file) => {
                          handleFileChange(file);
                        }}
                      />
                      <div>
                        <small className="text-muted">
                          Accepted file types: .jpg , .jpeg, .png, .svg, .webp
                        </small>
                      </div>
                      <InputImage image={photo} valueImage={values.photo} />
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
                        labelText="Id Proof"
                        nameText="idProof"
                        accepts={{
                          'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
                        }}
                        touched={touched}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        handleFileChange={(file) => {
                          handleIdProofFileChange(file);
                        }}
                      />
                      <div>
                        <small className="text-muted">
                          Accepted file types: .jpg , .jpeg, .png, .svg, .webp
                        </small>
                      </div>
                      <InputImage image={idProof} valueImage={values.idProof} />
                    </Col>

                    <Form.Group controlId="formPhoneNumber">
                      <Form.Label>
                        Phone Number <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>+91</InputGroup.Text>
                        <Field
                          label="Phone Number"
                          type="text"
                          name="phoneNumber"
                          maxLength={10}
                          value={phoneNumber}
                          placeholder="Enter the phone number here"
                          className={`form-control ${touched.phoneNumber && errors.phoneNumber ? 'is-invalid' : ''}`}
                          onChange={(e) => {
                            const input = e.target.value;
                            const numericInput = input
                              .replace(/[^0-9]/g, '')
                              .slice(0, 10);
                            setphoneNumber(numericInput);
                            handleChange(e);
                            setFieldValue(numericInput);
                          }}
                          onBlur={handleBlur}
                        />
                      </InputGroup>
                      {touched.phoneNumber && errors.phoneNumber ? (
                        <p className="text-danger">{errors.phoneNumber}</p>
                      ) : (
                        ''
                      )}
                    </Form.Group>

                    <Col
                      className="m-2"
                      lg="12"
                      xxl="12"
                      xl="12"
                      md="12"
                      sm="12"
                    >
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Field
                          label="Email"
                          type=""
                          name="email"
                          placeholder="Enter the email here"
                          className={`form-control`}
                          onChange={(e) => {
                            setemail(e.target.value);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        />
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
                      <Form.Group controlId="formPassword">
                        <Form.Label>
                          Password <span className="text-danger">*</span>
                        </Form.Label>
                        <InputGroup>
                          <Field
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter the password here"
                            className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                            onChange={(e) => {
                              setpassword(e.target.value);
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                          />
                          <InputGroup.Text
                            onClick={togglePasswordVisibility}
                            style={{ cursor: 'pointer' }}
                          >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </InputGroup.Text>
                        </InputGroup>
                        {errors.password && touched.password ? (
                          <p className="text-danger">{errors.password}</p>
                        ) : null}
                      </Form.Group>
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
                        // employeeId === '' ||
                        nameOfEmployee === '' ||
                        dateOfBirth === '' ||
                        roleOfEmployee === '' ||
                        phoneNumber === '' ||
                        email === '' ||
                        password === '' ||
                        photo === '' ||
                        idProof === '' ||
                        // (touched.employeeId && errors.employeeId) ||
                        (touched.nameOfEmployee && errors.nameOfEmployee) ||
                        (touched.dateOfBirth && errors.dateOfBirth) ||
                        (touched.roleOfEmployee && errors.roleOfEmployee) ||
                        (touched.phoneNumber && errors.phoneNumber) ||
                        (touched.email && errors.email) ||
                        (touched.password && errors.password) ||
                        (touched.photo && errors.photo) ||
                        (touched.idProof && errors.idProof)
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
export default AddUserCreation;
