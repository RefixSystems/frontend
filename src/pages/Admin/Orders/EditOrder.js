import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import BasicButton from '../../../components/BasicButton';
import TextInput from '../../../components/TextInput';
import { toast } from 'react-toastify';
import { OrderSchema } from './OrderValidation';
import {
  useEditOrdersMutation,
  useGetEmployeeRoleQuery,
  useGetOrderByIdQuery,
} from '../../../redux/api/OrdersApi';
import { getRole } from '../../../Constants/Global';

const EditOrder = () => {
  const [status, setStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [assignedOn, setAssignedOn] = useState('');
  const [technicianComments, setTechnicianComments] = useState('');
  const [closedOn, setClosedOn] = useState('');
  const [paidThrough, setPaidThrough] = useState('');
  const [finalTransaction, setFinalTransaction] = useState('');
  const [finalAmountPaid, setFinalAmountPaid] = useState('');
  const [notes, setNotes] = useState('');
  const { id } = useParams();
  const Id = id.startsWith(':') ? id.slice(1) : id;
  const role = getRole();
  const [editOrdersData, { isLoading }] = useEditOrdersMutation();
  const { data: EditOrderData } = useGetOrderByIdQuery({ id: Id, role: role });
  const { data: assignedEmployeesData } = useGetEmployeeRoleQuery({
    role: role,
  });
  const [assignedEmployees, setAssignedEmployees] = useState([]);

  useEffect(() => {
    if (assignedEmployeesData && assignedEmployeesData.data) {
      setAssignedEmployees(assignedEmployeesData.data);
    }
  }, [assignedEmployeesData]);

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/admin/orders');
  };

  useEffect(() => {
    if (EditOrderData && EditOrderData.data) {
      setStatus(EditOrderData.data.status);
      setAssignedTo(EditOrderData.data.assignedTo);
      setAssignedOn(EditOrderData.data.assignedOn);
      setTechnicianComments(EditOrderData.data.technicianComments);
      setNotes(EditOrderData.data.notes);
      setClosedOn(EditOrderData.data.closedOn);
      setPaidThrough(EditOrderData.data.paidThrough);
      setFinalTransaction(EditOrderData.data.finalTransaction);
      setFinalAmountPaid(EditOrderData.data.finalAmountPaid);

    }
  }, [EditOrderData]);

  const initialValues = {
    status: '',
    assignedTo: '',
    assignedOn: '',
    technicianComments: '',
    notes: '',
    closedOn: '',
    paidThrough: '',
    finalTransaction: '',
    finalAmountPaid:'',
  };

  const handleEditData = async () => {
    try {
      const response = await editOrdersData({
        id: Id,
        data: {
          status:status,
          assignedTo:assignedTo,
          assignedOn:assignedOn,
          technicianComments:technicianComments,
          notes:notes,
          closedOn:closedOn,
          paidThrough:paidThrough,
          finalTransactionId: finalTransaction,
          finalAmountPaid:finalAmountPaid
        },
        role: role,
      });
      if (response.data) {
        toast.success(response.data.message, { autoClose: 3000 });
        navigate('/admin/orders');
      } else {
        toast.error(response.error.data.error, { autoClose: 3000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isAdmin = role !== 'Admin' && role !== 'Order Assigner' ;

  return (
    <div>
      <Container fluid className="">
        <Formik
          initialValues={initialValues}
          validationSchema={OrderSchema}
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
          }) => (
            <>
              <Form>
                <Row className="d-flex flex-row justify-content-between align-items-center">
                  <Col className="d-flex justify-content-start mb-3 mt-3">
                    <h4 onClick={handleCancel} className="mx-2">
                      <AiOutlineArrowLeft />
                    </h4>
                    <h4>Edit Order</h4>
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
                            await OrderSchema.validateAt(field, {
                              status,
                              assignedTo,
                              assignedOn,
                              notes,
                              technicianComments,
                              closedOn,
                              finalTransaction,
                              paidThrough,
                              finalAmountPaid,
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
                      <Form.Group controlId="status">
                        <Form.Label>
                          Edit Status<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          value={status}
                          className={`form-control ${touched.status && errors.status ? 'is-invalid' : ''}`}
                          onChange={(e) => {
                            setStatus(e.target.value);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Process">In Process</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </Form.Select>
                        {touched.status && errors.status ? (
                          <p className="text-danger">{errors.status}</p>
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
  <Form.Group controlId="assignedTo">
    <Form.Label>
      Assigned To<span className="text-danger">*</span>
    </Form.Label>
    <Form.Select
      value={assignedTo}
      className={`form-control ${touched.assignedTo && errors.assignedTo ? 'is-invalid' : ''}`}
      onChange={(e) => {
        setAssignedTo(e.target.value);
        handleChange(e);
      }}
      onBlur={handleBlur}
      disabled={isAdmin}
    >
      <option value="">
        Select an employee
      </option>
      {assignedEmployees.length === 0 ? (
        <option value="" disabled>
          No employees found
        </option>
      ) : (
        assignedEmployees.map((employee, index) => (
          <option key={index} value={employee}>
            {employee}
          </option>
        ))
      )}
    </Form.Select>
    {touched.assignedTo && errors.assignedTo ? (
      <p className="text-danger">{errors.assignedTo}</p>
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
                      <TextInput
                        label="Assigned On"
                        type="date"
                        name="assignedOn"
                        value={assignedOn}
                        className={`form-control ${touched.assignedOn && errors.assignedOn ? 'is-invalid' : ''}`}
                        onChange={(e) => {
                          setAssignedOn(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        disabled={isAdmin}
                        validation={
                          touched.assignedOn && errors.assignedOn ? (
                            <p className="text-danger">{errors.assignedOn}</p>
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
                        label="Technician Comments"
                        type="text"
                        name="technicianComments"
                        value={technicianComments}
                        className={`form-control ${touched.technicianComments && errors.technicianComments ? 'is-invalid' : ''}`}
                        onChange={(e) => {
                          setTechnicianComments(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.technicianComments &&
                          errors.technicianComments ? (
                            <p className="text-danger">
                              {errors.technicianComments}
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
                        label="Notes"
                        type=""
                        name="notes"
                        value={notes}
                        className={`form-control ${touched.notes && errors.notes ? 'is-invalid' : ''}`}
                        onChange={(e) => {
                          setNotes(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.notes && errors.notes ? (
                            <p className="text-danger">{errors.notes}</p>
                          ) : (
                            ''
                          )
                        }
                      />
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
                        label="Final Amount Paid"
                        type="number"
                        name="finalAmountPaid"
                        value={finalAmountPaid}
                        className={`form-control ${touched.finalAmountPaid && errors.finalAmountPaid ? 'is-invalid' : ''}`}
                        onChange={(e) => {
                          setFinalAmountPaid(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.finalAmountPaid && errors.finalAmountPaid ? (
                            <p className="text-danger">{errors.finalAmountPaid}</p>
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
                        label="Closed On"
                        type="date"
                        name="closedOn"
                        value={closedOn}
                        className={`form-control ${touched.closedOn && errors.closedOn ? 'is-invalid' : ''}`}
                        onChange={(e) => {
                          setClosedOn(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.closedOn && errors.closedOn ? (
                            <p className="text-danger">{errors.closedOn}</p>
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
                        label="Paid Through"
                        type="text"
                        name="paidThrough"
                        value={paidThrough}
                        className={`form-control ${touched.paidThrough && errors.paidThrough ? 'is-invalid' : ''}`}
                        onChange={(e) => {
                          setPaidThrough(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.paidThrough && errors.paidThrough ? (
                            <p className="text-danger">{errors.paidThrough}</p>
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
                        label="Final Transaction ID"
                        type="text"
                        name="finalTransaction"
                        value={finalTransaction}
                        className={`form-control ${touched.finalTransaction && errors.finalTransaction ? 'is-invalid' : ''}`}
                        onChange={(e) => {
                          setFinalTransaction(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.finalTransaction &&
                          errors.finalTransaction ? (
                            <p className="text-danger">
                              {errors.finalTransaction}
                            </p>
                          ) : (
                            ''
                          )
                        }
                      />
                    </Col>
                  </Col>
                </Row>

                <Row className="d-lg-none d-xl-none d-xxl-none flex-row justify-content-around align-items-center">
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
                            await OrderSchema.validateAt(field, {
                              status,
                              assignedTo,
                              assignedOn,
                              notes,
                              technicianComments,
                              closedOn,
                              finalTransaction,
                              paidThrough,
                              finalAmountPaid,
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

export default EditOrder;
