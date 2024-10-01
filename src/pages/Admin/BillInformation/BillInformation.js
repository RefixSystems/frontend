import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap';
import BasicTable from '../../../components/TableComponent';
import {
  useAddComponentMutation,
  useCalculateChargesMutation,
  useDeleteBillInformationMutation,
  useGetComponentQuery,
  useUpdateBillMutation,
} from '../../../redux/api/BillInformationApi';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import { toast } from 'react-toastify';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import { useGetBillInformationQuery } from '../../../redux/api/BillInformationApi';
import { FaArrowRight, FaCalculator, FaEdit, FaPlus } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

import Select from 'react-select';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const BillInformation = () => {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [componentData, setComponentData] = useState([]);
  const [billSummary, setBillSummary] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [billId, setBillId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [editId, setEditId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editComponent, setEditComponent] = useState('');
  const [editLabourCharge, setEditLabourCharge] = useState('');
  const [editServiceCharge, setEditServiceCharge] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [addDescription, setAddDescription] = useState('');
  const [addComponent, setAddComponent] = useState('');
  const [addLabourCharge, setAddLabourCharge] = useState('');
  const [addServiceCharge, setAddServiceCharge] = useState('');
  const [showAddComponentModal, setShowAddComponentModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const Id = id.startsWith(':') ? id.slice(1) : id;
  const role = getRole();

  const {
    data: BillInformationData,
    isLoading,
    refetch,
  } = useGetBillInformationQuery({
    id: Id,
    role: role,
  });

  const { data: ComponentData } = useGetComponentQuery({
    role: role,
  });

  const [CalculateCharges] = useCalculateChargesMutation();
  const [UpdateBillApi] = useUpdateBillMutation();
  const [deleteBillInformationApi] = useDeleteBillInformationMutation();
  const [addComponentApi] = useAddComponentMutation();
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');

  const navigate = useNavigate();
  const handleGenerateBill = () => {
    navigate(`/admin/orders`);
  };

  useEffect(() => {
    if (BillInformationData && BillInformationData.data) {
      setData(BillInformationData.data.billDetails);
      setBillSummary(BillInformationData.data.userDetails);
      setBillId(BillInformationData.data.billId);
      setOrderId(BillInformationData.data.orderId);
    }
  }, [BillInformationData, role]);

  useEffect(() => {
    if (ComponentData && ComponentData.data) {
      setComponentData(ComponentData.data);
    }
  }, [ComponentData, role]);

  const deleteHandleClose = () => setDeleteShow(false);

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteBillInformation = async () => {
    try {
      const response = await deleteBillInformationApi({
        billid: billId,
        id: idToDelete,
        role: role,
      });
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

  const handleAddBill = () => {
    setShowAddModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setFormData({});
  };

  const handleFormChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddComponent = async () => {
    if (!formData) {
      toast.error('Please fill the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);

    try {
      const data = {
        descriptionName: formData.descriptionName,
      };
      const response = await addComponentApi({
        id: orderId,
        role: role,
        data: data,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setShowAddModal(false);
        refetch();
        setFormData('');
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setFormData('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditShow = (id) => {
    const editComponent = data.find((d) => d._id === id);

    if (editComponent) {
      setEditId(id);
      setEditDescription(editComponent.description);
      setEditComponent(editComponent.component);
      setEditLabourCharge(editComponent.labourCharge);
      setEditServiceCharge(editComponent.serviceCharge);
      setShowEditModal(true);
    }
  };

  const ShowEditModal = () => {
    setShowEditModal(false);
    setEditId(null);
    setEditDescription('');
    setEditComponent('');
    setEditLabourCharge('');
    setEditServiceCharge('');
  };

  const handleEditComponent = async () => {
    setLoading(true);

    try {
      const data = {
        description: editDescription,
        component: editComponent,
        labourCharge: editLabourCharge,
        serviceCharge: editServiceCharge,
      };
      const response = await UpdateBillApi({
        billid: billId,
        id: editId,
        role: role,
        data: data,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setShowEditModal(false);
        refetch();
        setEditDescription('');
        setEditComponent('');
        setEditLabourCharge('');
        setEditServiceCharge('');
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setShowEditModal(false);
        setEditDescription('');
        setEditComponent('');
        setEditLabourCharge('');
        setEditServiceCharge('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComponentModal = () => {
    setShowAddModal(false);
    setShowAddComponentModal(true);
  };

  const handleAddComponentClose = () => {
    setShowAddComponentModal(false);
    setAddDescription('');
    setAddComponent('');
    setAddLabourCharge('');
    setAddServiceCharge('');
  };

  const handleAddComponentTable = async () => {
    if (
      !addDescription ||
      !addComponent ||
      !addLabourCharge ||
      !addServiceCharge
    ) {
      toast.error('Please fill the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);

    try {
      const data = {
        description: addDescription,
        component: addComponent,
        labourCharge: addLabourCharge,
        serviceCharge: addServiceCharge,
      };
      const response = await addComponentApi({
        id: orderId,
        role: role,
        data: data,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setShowAddComponentModal(false);
        refetch();
        setEditDescription('');
        setEditComponent('');
        setEditLabourCharge('');
        setEditServiceCharge('');
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setShowAddComponentModal(false);
        setEditDescription('');
        setEditComponent('');
        setEditLabourCharge('');
        setEditServiceCharge('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculateCharges = async () => {
    setLoading(true);
    try {
      const response = await CalculateCharges({
        id: billId,
        role: role,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        refetch();
      } else {
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: (d, i) => i + 1,
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Component',
      accessor: 'component',
    },
    {
      Header: 'Labour Charger',
      accessor: 'labourCharge',
    },
    {
      Header: 'Service Charge',
      accessor: 'serviceCharge',
    },

    {
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
              className="m-1 mx-2"
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
    <div>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <>
          <Container fluid className="mt-3 reduced-width-row">
            <Row className="boxShadow p-4 mb-4">
              <Col className="d-flex flex-row justify-content-between mt-1">
                <Col className="d-flex justify-content-start mb-3 mt-3">
                  <h4 className="fw-bold">Bill Information</h4>
                </Col>
                <div>
                  <Button
                    onClick={handleAddBill}
                    style={{ backgroundColor: color, border: 'none' }}
                    className="p-2 m-1"
                  >
                    <FaPlus size={20} />
                    <span className="d-none d-md-inline"> Add Bill</span>
                  </Button>
                </div>
              </Col>
            </Row>

            <Row className="boxShadow p-4 mb-4 mt-3">
              <h4 className="fw-bold text-center mb-3">Bill Summary</h4>

              {billSummary && (
                <Col>
                  <p>
                    <strong>Type:</strong> {billSummary.type}
                  </p>
                  <p>
                    <strong>User Name:</strong> {billSummary.userName}
                  </p>
                  <p>
                    <strong>Address:</strong> {billSummary.address}
                  </p>
                  <p>
                    <strong>Email:</strong> {billSummary.email}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {billSummary.phoneNumber}
                  </p>
                  <p>
                    <strong>Alternate PhoneNumber:</strong>{' '}
                    {billSummary.alternatePhoneNumber}
                  </p>
                  <p>
                    <strong>Request Id:</strong> {billSummary.requestId}
                  </p>
                  <p>
                    <strong>Created At:</strong>{' '}
                    {formatDateTime(billSummary.createdAt)}
                  </p>
                </Col>
              )}

              <Col>
                <p>
                  <strong>Total Labour Charges:</strong>{' '}
                  {BillInformationData.data?.labourCharges}
                </p>
                <p>
                  <strong>Total Service Charges:</strong>{' '}
                  {BillInformationData.data?.serviceCharges}
                </p>
                <p>
                  <strong>Total Charges Before GST:</strong>{' '}
                  {BillInformationData.data?.totalChargesBeforeGST}
                </p>
                <p>
                  <strong>GST:</strong>{' '}
                  {BillInformationData.data?.GST}
                </p>
                <p
                  style={{
                    fontSize: '28px',
                    color: '#1758ad',
                    fontWeight: 'bold',
                  }}
                >
                  <strong>Total:</strong> {BillInformationData.data.toBePaid}
                </p>
                <p style={{marginTop:"75px"}}> 
                  <strong>Total Amount Paid:</strong>{' '}
                  {billSummary?.totalAmountPaid}
                </p>
                {/* <p className="mt-5">
                  <Button
                    style={{ backgroundColor: color }}
                    onClick={handleCalculateCharges}
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
                        Calculate Charge...
                      </>
                    ) : (
                      'Calculate Charge'
                    )}
                    <FaCalculator size={20} style={{ marginLeft: '8px' }} />
                  </Button>
                </p> */}
              </Col>
            </Row>

            <Row className="boxShadow p-4 mb-4">
              <BasicTable COLUMNS={COLUMNS} MOCK_DATA={data} />

              <Col className="text-end mt-3">
                <Button
                  style={{ backgroundColor: color }}
                  onClick={handleGenerateBill}
                >
                  Generate Bill <FaArrowRight size={20} />
                </Button>
              </Col>
            </Row>

            {/* Add Bill Modal */}
            <Modal show={showAddModal} onHide={handleAddModalClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Add Bill</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formComponent">
                    <Form.Label>Component</Form.Label>
                    <Select
                      options={componentData.map((component) => ({
                        value: component,
                        label: component,
                      }))}
                      onChange={(selectedOption) =>
                        handleFormChange(
                          'descriptionName',
                          selectedOption.value
                        )
                      }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  style={{ backgroundColor: color }}
                  onClick={handleAddComponentModal}
                >
                  Add Manually
                </Button>
                <Button
                  style={{ backgroundColor: color, border: 'none' }}
                  onClick={handleAddComponent}
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
                      Add...
                    </>
                  ) : (
                    'Add'
                  )}
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        </>
      )}

      <DeleteModel
        YES={deleteBillInformation}
        DELETESTATE={deleteShow}
        ONCLICK={deleteHandleClose}
        DESCRIPTION="Are you sure you want to delete this BillInformation"
        DELETETITLE="Bill Information"
      />

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Component</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formComponent" className="mt-2">
              <Form.Label>Component:</Form.Label>
              <Form.Control
                type="text"
                value={editComponent}
                onChange={(e) => setEditComponent(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formLabourCharge" className="mt-2">
              <Form.Label>Labour Charge:</Form.Label>
              <Form.Control
                type="number"
                value={editLabourCharge}
                onChange={(e) => setEditLabourCharge(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formServiceCharge" className="mt-2">
              <Form.Label>Service Charge:</Form.Label>
              <Form.Control
                type="number"
                value={editServiceCharge}
                onChange={(e) => setEditServiceCharge(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ShowEditModal}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: color }}
            onClick={handleEditComponent}
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
                Update...
              </>
            ) : (
              'Update'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAddComponentModal}
        onHide={handleAddComponentClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Manually</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                value={addDescription}
                placeholder='Enter the description here'
                onChange={(e) => setAddDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formComponent" className="mt-2">
              <Form.Label>Component:</Form.Label>
              <Form.Control
                type="text"
                value={addComponent}
                placeholder='Enter the component here'
                onChange={(e) => setAddComponent(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formLabourCharge" className="mt-2">
              <Form.Label>Labour Charge:</Form.Label>
              <Form.Control
                type="number"
                value={addLabourCharge}
                placeholder='Enter the labour charge here'
                onChange={(e) => setAddLabourCharge(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formServiceCharge" className="mt-2">
              <Form.Label>price of the component:</Form.Label>
              <Form.Control
                type="number"
                value={addServiceCharge}
                placeholder='Enter the price here'
                onChange={(e) => setAddServiceCharge(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddComponentClose}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: color }}
            onClick={handleAddComponentTable}
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
                Add...
              </>
            ) : (
              'Add'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BillInformation;
