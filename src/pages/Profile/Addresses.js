import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Modal,
  FormLabel,
} from 'react-bootstrap';
import {
  useDeleteUserAddressMutation,
  useGetUserDetailsQuery,
  useUpdateUserAddressMutation,
  useUpdateUserProfileMutation,
} from '../../redux/api/ProfileOrdersApi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import DeleteModel from '../../components/DeleteModel';
import Lottie from 'react-lottie';
import Addressnotfound from '../../assests/json/location.json';
import { useTheme } from '../../Contexts/ThemeContext';
import { FaLocationDot } from 'react-icons/fa6';

const Addresses = () => {
  const { color } = useTheme();
  const [addresses, setAddresses] = useState({
    address: [],
  });
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentType, setCurrentType] = useState('');
  const [currentAddressId, setCurrentAddressId] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPrimary, setIsPrimary] = useState(true);

  const [updateAddress, { isLoading: updateAddressLoader }] =
    useUpdateUserAddressMutation();
  const [deleteAddress] = useDeleteUserAddressMutation();
  const {
    data: userData,
    isLoading,
    refetch,
  } = useGetUserDetailsQuery({
    phoneNumber: userPhoneNumber,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      const phoneNumber = parsedToken.phoneNumber;
      setUserPhoneNumber(phoneNumber);
    }
  }, []);

  useEffect(() => {
    if (userData && userData.data) {
      setAddresses({
        address: userData.data.address ?? [],
      });
    }
  }, [userData]);

  const handleEdit = (address, type, id) => {
    setCurrentAddress(address);
    setCurrentType(type);
    setCurrentAddressId(id);
    setShowEditForm(true);
  };

  const handleAddAddress = async () => {
    if (!newAddress.trim()) {
      toast.error('Address cannot be empty', { autoClose: 1000 });
      return;
    }
    if (isPrimary === undefined) {
      toast.error('Please select an address type', { autoClose: 1000 });
      return;
    }
    try {
      const response = await updateAddress({
        data: {
          type: currentType,
          addressId: null,
          address: newAddress,
        },
        phoneNumber: userPhoneNumber,
      });

      if (response.data) {
        setShowForm(false);
        toast.success(response?.data?.message, { autoClose: 1000 });
        setNewAddress('');
        refetch();
      } else {
        setShowForm(false);
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleUpdateAddress = async () => {
    if (!currentAddress.trim()) {
      toast.error('Address cannot be empty', { autoClose: 1000 });
      return;
    }
    try {
      const response = await updateAddress({
        data: {
          addressId: currentAddressId,
          address: currentAddress,
          primaryAddress: isPrimary,
        },
        phoneNumber: userPhoneNumber,
      });

      if (response.data) {
        setShowEditForm(false);
        toast.success(response?.data?.message, { autoClose: 1000 });
      } else {
        setShowEditForm(false);
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const deleteHandleShow = (id, type) => {
    setCurrentAddressId(id);
    setCurrentType(type);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteAddress({
        data: {
          type: currentType,
          addressId: currentAddressId,
        },
        phoneNumber: userPhoneNumber,
      });

      if (response.data) {
        setDeleteShow(false);
        toast.success(response?.data?.message, { autoClose: 1000 });
        refetch();
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const options = {
    loop: true,
    autoplay: true,
    animationData: Addressnotfound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Container fluid>
      <Col md={12} lg={12} sm={12}>
        <div className="p-md-5 p-xs-2">
          <Card.Title className=" text-center">Manage Addresses</Card.Title>
          <Row className="align-items-center justify-content-center text-start mt-5">
            <Col md={12} className="shadow rounded border p-3">
              <h5>
                <FaLocationDot className="me-2" />
                Address
              </h5>
              {addresses.address.map((address) =>
                address.primaryAddress ? (
                  <Card
                    className=" mt-4 p-1  position-relative text-wrap"
                    style={{ height: '140px' }}
                    key={address._id}
                  >
                    <p>
                      <span
                        style={{
                          textTransform: 'uppercase',
                          fontSize: '11px',
                          color: '#878787',
                          verticalAlign: 'middle',
                          padding: '4px 7px',
                          borderRadius: '2px',
                          backgroundColor: '#f0f0f0',
                          fontWeight: 500,
                          marginRight: '15px',
                        }}
                      >
                        Preferred Location
                      </span>
                    </p>
                    <div className="d-flex justify-content-end mb-0">
                      <div
                        className="position-absolute rounded-circle mx-3"
                        style={{ top: '10px', right: '40px' }}
                        onClick={() =>
                          handleEdit(address.address, 'Address', address._id)
                        }
                      >
                        <FaEdit style={{ cursor: 'pointer' }} color="black" />
                      </div>
                      <div
                        className="position-absolute rounded-circle mx-3"
                        style={{ top: '10px', right: '10px' }}
                        onClick={() => deleteHandleShow(address._id, 'address')}
                      >
                        <FaTrash style={{ cursor: 'pointer' }} color={color} />
                      </div>
                    </div>
                    <div className="m-2 mt-2 d-flex justify-content-start">
                      {address.address}
                    </div>
                  </Card>
                ) : (
                  <Card
                    className=" mt-4 p-1  position-relative text-wrap"
                    style={{ height: '140px' }}
                    key={address._id}
                  >
                    <p>
                      <span
                        style={{
                          textTransform: 'uppercase',
                          fontSize: '11px',
                          color: '#878787',
                          verticalAlign: 'middle',
                          padding: '4px 7px',
                          borderRadius: '2px',
                          backgroundColor: '#f0f0f0',
                          fontWeight: 500,
                          marginRight: '15px',
                        }}
                      >
                        Alternate Location
                      </span>
                    </p>
                    <div className="d-flex justify-content-end mb-0">
                      <div
                        className="position-absolute rounded-circle mx-3"
                        style={{ top: '10px', right: '40px' }}
                        onClick={() =>
                          handleEdit(address.address, 'Address', address._id)
                        }
                      >
                        <FaEdit style={{ cursor: 'pointer' }} color="black" />
                      </div>
                      <div
                        className="position-absolute rounded-circle mx-3"
                        style={{ top: '10px', right: '10px' }}
                        onClick={() => deleteHandleShow(address._id, 'address')}
                      >
                        <FaTrash style={{ cursor: 'pointer' }} color={color} />
                      </div>
                    </div>
                    <div className="m-2 mt-2 d-flex justify-content-start">
                      {address.address}
                    </div>
                  </Card>
                )
              )}
            </Col>

            {/* <Col md={6}>
              <p
                style={{ fontSize: '20px' }}
                onClick={() => {
                  setCurrentType('address');
                  setShowForm(true);
                }}
                className="my-4 text-primary pointer add-address"
              >
                + Add  Address
              </p>
              {addresses.address.map((address) => (
                <Card
                  className="mb-2 mt-3 p-1 position-relative text-wrap"
                  key={address._id}
                >
                  <div className="d-flex justify-content-end mb-4">
                    <div
                      className="position-absolute rounded-circle mx-3"
                      style={{ top: '10px', right: '40px' }}
                      onClick={() =>
                        handleEdit(
                          address.address,
                          'Address',
                          address._id
                        )
                      }
                    >
                      <FaEdit style={{ cursor: 'pointer' }} color="black" />
                    </div>
                    <div
                      className="position-absolute rounded-circle mx-3"
                      style={{ top: '10px', right: '10px' }}
                      onClick={() =>
                        deleteHandleShow(address._id, 'address')
                      }
                    >
                      <FaTrash style={{ cursor: 'pointer' }} color={color} />
                    </div>
                  </div>
                  <div className="m-2 mt-2 d-flex  justify-content-start">{address.address}</div>
                </Card>
              ))}
            </Col> */}
          </Row>
          {addresses.address.length > 0 ? (
            <div></div>
          ) : (
            <div className="text-center mt-4">
              <Lottie options={options} height="250px" width="250px" />
              <h4 style={{ color: color }}>No Address Found</h4>
            </div>
          )}
        </div>
        {/* edit address modal */}
        <Modal
          show={showEditForm}
          onHide={() => setShowEditForm(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3 mt-2" controlId="formGridAddress">
                {/* Address Type Label */}
                <Form.Label>
                  Address type <span className="text-danger">*</span>
                </Form.Label>

                {/* Radio buttons for Address Type */}
                <div className="d-flex align-items-center mb-3">
                  {/* Primary Location Radio Button */}
                  <div className="me-4">
                    <Form.Check
                      inline
                      type="radio"
                      aria-label="Primary Location" // Change this to reflect the correct label
                      name="addressType"
                      id="primaryLocation"
                      className="me-2"
                      checked={isPrimary} // This is checked if isPrimary is true
                      onChange={() => setIsPrimary(true)}
                    />
                    <Form.Label htmlFor="primaryLocation">
                      Preferred Location
                    </Form.Label>
                  </div>

                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      aria-label="Alternative Location"
                      name="addressType"
                      id="alternativeLocation"
                      className="me-2"
                      checked={!isPrimary}
                      onChange={() => setIsPrimary(false)}
                    />
                    <Form.Label htmlFor="alternativeLocation">
                      Alternative Location
                    </Form.Label>
                  </div>
                </div>

                {/* Address Field */}
                <Form.Label>
                  Address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="address"
                  placeholder="Enter your address"
                  value={currentAddress}
                  onChange={(e) => setCurrentAddress(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: color }}
              onClick={handleUpdateAddress}
              disabled={updateAddressLoader}
            >
              {updateAddressLoader ? (
                <>
                  <Spinner size="sm" color={color} className="mx-1" />
                  Updating
                </>
              ) : (
                'Update'
              )}
            </Button>
            <Button variant="secondary" onClick={() => setShowEditForm(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        {/* add address modal */}
        <Modal show={showForm} onHide={() => setShowForm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add {currentType}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3 mt-2"
                controlId="formGridNewAddress"
                lg={6}
                sm={12}
                md={6}
              >
                <Form.Label>
                  Address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="newAddress"
                  placeholder={`Enter your  ${currentType}`}
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ backgroundColor: color }}
              onClick={handleAddAddress}
              disabled={updateAddressLoader}
            >
              {updateAddressLoader ? (
                <>
                  <Spinner size="sm" color={color} className="mx-1" />
                  Adding
                </>
              ) : (
                'Add'
              )}
            </Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <DeleteModel
          YES={handleDelete}
          DELETESTATE={deleteShow}
          ONCLICK={deleteHandleClose}
          DESCRIPTION={`Are you sure want to delete this ${currentType}`}
          DELETETITLE={`Delete ${currentType}`}
        />
      </Col>
    </Container>
  );
};

export default Addresses;
