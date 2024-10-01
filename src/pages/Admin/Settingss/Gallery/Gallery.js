import React, { useEffect, useState } from 'react';
import { Col, Modal, Button, Row, Card, Form, Spinner } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash, FaFileUpload, FaPhone, FaMobileAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import DeleteModel from '../../../../components/DeleteModel';
import { useNavigate } from 'react-router';
import { getRole } from '../../../../Constants/Global';
import NoAccess from '../../../../components/NoAccess';
import {
  useAddImageMutation,
  useDeleteGalleryMutation,
  useDeleteImageMutation,
  useEditImageMutation,
  useGetGalleryQuery,
  useEditGalleryMutation,
} from '../../../../redux/api/GalleryApi';
import { useTheme } from '../../../../Contexts/ThemeContext';
import FetchLoader from '../../../../components/FetchLoader';
import InputImage from '../../../../components/InputImage';
import NoDataFound from '../../../../components/NoDataFound';

const General = () => {
  const { color } = useTheme();
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteGalleryShow, setDeleteGalleryShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showGalleryEditModal, setShowGalleryEditModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState('');
  const [editingGalleryId, setEditingGalleryId] = useState('');
  const [deleteGalleryId, setDeleteGalleryId] = useState('');
  const [deleteImageId, setDeleteImageId] = useState('');
  const [galleryId, setGalleryId] = useState('');
  const [addGalleryId, setAddGalleryId] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editLandline, setEditLandline] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [read, setRead] = useState(false);
  const [loading, setLoading] = useState(false);
  const [write, setWrite] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const role = getRole();
  const { data: GalleryData, isError, isLoading } = useGetGalleryQuery(role);
  const [AddImageData] = useAddImageMutation();
  const [EditImageData] = useEditImageMutation();
  const [deleteImage] = useDeleteImageMutation();
  const [deleteGallery] = useDeleteGalleryMutation();
  const [EditGalleryData] = useEditGalleryMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (GalleryData && GalleryData.moduleAccess) {
      setRead(GalleryData.moduleAccess.read);
      setWrite(GalleryData.moduleAccess.write);
      setFullAccess(GalleryData.moduleAccess.fullAccess);
    }
  }, [GalleryData]);

  // if (isLoading) return <FetchLoader />;

  if (isError) return <p>Error fetching data</p>;
  if (!GalleryData || !GalleryData.data || GalleryData.data.length === 0) {
    return (
      <div
        style={{ height: '100vh' }}
        className="d-flex justify-content-center align-items-center"
      >
        <p style={{ fontSize: '25px', fontWeight: 'bold' }}>
          {' '}
          <NoDataFound />
        </p>
      </div>
    );
  }


  const handleEditClick = (galleryId, imageId) => {
    setEditingId(imageId);
    setEditingGalleryId(galleryId);
    setShowEditModal(true);
  };

  // Added: Handle edit gallery click
  const handleEditGalleryClick = (id, location, address,landline,mobile) => {
    setEditingGalleryId(id);
    setEditLocation(location);
    setEditAddress(address);
    setEditLandline(landline);
    setEditMobile(mobile);
    setShowGalleryEditModal(true);
  };

  const deleteHandleShow = (galleryId, imageId) => {
    setDeleteGalleryId(galleryId);
    setDeleteImageId(imageId);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const deleteGalleryHandleShow = (id) => {
    setGalleryId(id);
    setDeleteGalleryShow(true);
  };

  const deleteGalleryHandleClose = () => {
    setDeleteGalleryShow(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleAddImageData = async () => {
    
    if (!imageFile) {
      toast.error('Please fill  the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const response = await AddImageData({
        role: role,
        id: addGalleryId,
        data: formData,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setImageFile(null);
        setShowModal(false);
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await deleteImage({
        role: role,
        galleryid: deleteGalleryId,
        id: deleteImageId,
      });
      setDeleteShow(false);
      if (response?.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setDeleteGalleryId('');
        setDeleteImageId('');
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
        setDeleteGalleryId('');
        setDeleteImageId('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGallery = async () => {
    try {
      const response = await deleteGallery({
        role: role,
        galleryid: galleryId,
      });
      setDeleteGalleryShow(false);
      if (response?.data) {
        toast.success(response.data.message, { autoClose: 1000 });
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditImageData = async () => {
    if (!imageFile) {
      toast.error('Please fill  the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const response = await EditImageData({
        id: editingId,
        galleryid: editingGalleryId,
        role: role,
        data: formData,
      });

      if (response?.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setShowEditModal(false);
      } else {
        toast.error(response.error?.data?.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGallery = () => {
    navigate('/admin/add-gallery');
  };

  const handleAddImage = (galleryid) => {
    setAddGalleryId(galleryid);
    setShowModal(true);
  };

  // Added: Handle gallery data update
  const handleUpdateGallery = async () => {
    if (!editLocation || !editAddress) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);
    try {
      const response = await EditGalleryData({
        galleryid: editingGalleryId,
        role: role,
        data: {
          location: editLocation,
          address: editAddress,
          landline:editLandline,
          mobile:editMobile
        },
      });

      if (response?.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setShowGalleryEditModal(false);
      } else {
        toast.error(response.error?.data?.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {read ? (
        <>
          <Col>
            <Row className="mb-4 mt-4">
              <Col className="d-flex flex-row justify-content-between mt-1">
                <h4 className="fw-bold">Gallery Settings</h4>
                {write ? (
                  <div>
                    <Button
                      style={{ backgroundColor: color, border: 'none' }}
                      className="p-2 m-1"
                      onClick={handleAddGallery}
                    >
                      <FaPlus size={20} />
                      <span className="d-none d-md-inline"> Add Gallery</span>
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </Col>
            </Row>

            {GalleryData.data.map((generalData, index) => (
              <React.Fragment key={index}>
                <Col className="mt-5">
                  <div className="card-container">
                  <Card>
  {fullAccess && (
    <div className="icons-container">
      <Button
        variant="link"
        className="icons-button"
        onClick={() =>
          handleEditGalleryClick(
            generalData._id,
            generalData.location,
            generalData.address,
            generalData.landline,
             generalData.mobile
          )
        }
      >
        <FaEdit className="cards-editicon" />
      </Button>
      <Button
        variant="link"
        className="icons-button"
        onClick={() => deleteGalleryHandleShow(generalData._id)}
      >
        <FaTrash className="cards-deleteicon" />
      </Button>
    </div>
  )}

  <Card.Body>
    <Card.Title className="fw-bold" style={{ color: color }}>
      Location and Address
    </Card.Title>

    <Card className="mb-4 boxShadow" style={{borderRadius:"15px",border:"none" }}>
      <Card.Body>
        <h5 className="mb-3 text-center" style={{ color: color }}>{generalData.location} </h5>
        <p className="mb-1 text-center mb-3">{generalData.address}</p>
        <p className="mb-1 text-center">
          <FaPhone className="me-2 text-center" /> 
          {generalData.landline}
        </p>
        <p className="mb-1 text-center">
          <FaMobileAlt className="me-2" /> 
          {generalData.mobile}
        </p>
      </Card.Body>
    </Card>

    <Card.Title className="fw-bold" style={{ color: color }}>
      Images
    </Card.Title>
    <div className="d-flex flex-row flex-wrap justify-content-start align-items-center">
      {generalData.images &&
        generalData.images.map((imageItem, imgIndex) => (
          <div key={imgIndex} className="image-container">
            <img
              src={imageItem.image}
              alt={`Image ${imgIndex + 1}`}
              style={{
                margin: '15px',
                height: '200px',
                width: '100%',
                maxWidth: '350px',
              }}
            />
            {fullAccess && (
              <div className="icon-container">
                <FaEdit
                  className="edit-icon"
                  onClick={() => {
                    setImageFile(imageItem.image);
                    handleEditClick(generalData._id, imageItem._id);
                  }}
                />
                <FaTrash
                  className="delete-icon deleteicon-container"
                  onClick={() =>
                    deleteHandleShow(generalData._id, imageItem._id)
                  }
                />
              </div>
            )}
          </div>
        ))}

      {write ? (
        <div className="image-container">
          <Button
            style={{
              backgroundColor: color,
              border: 'none',
            }}
            className="p-2 m-1 mx-5"
            onClick={() => handleAddImage(generalData._id)}
          >
            <FaFileUpload size={20} />
            <span className="d-none d-md-inline"> Add Image</span>
          </Button>
        </div>
      ) : null}
    </div>
  </Card.Body>
</Card>

                  </div>
                </Col>
              </React.Fragment>
            ))}
          </Col>
        </>
      ) : (
        <NoAccess />
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <Form.Control
            type="file"
            accept=".jpg,.jpeg,.png,.svg,.webp"
            onChange={handleImageUpload}
          />
          <InputImage image={imageFile} valueImage={imageFile} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleAddImageData}
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
                Add Image...
              </>
            ) : (
              'Add Image'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <Form.Control
            type="file"
            accept=".jpg,.jpeg,.png,.svg,.webp"
            onChange={handleImageUpload}
          />
          <InputImage image={imageFile} valueImage={imageFile} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleEditImageData}
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
                Edit Image...
              </>
            ) : (
              'Edit Image'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <DeleteModel
        YES={() => handleDeleteImage()}
        DELETESTATE={deleteShow}
        ONCLICK={deleteHandleClose}
        DESCRIPTION="Are you sure you want to delete this Image"
        DELETETITLE="Image"
      />

      <DeleteModel
        YES={() => handleDeleteGallery()}
        DELETESTATE={deleteGalleryShow}
        ONCLICK={deleteGalleryHandleClose}
        DESCRIPTION="Are you sure you want to delete this Gallery"
        DELETETITLE="Delete Gallery"
      />

      {/* Added: Gallery Edit Modal */}
      <Modal
        show={showGalleryEditModal}
        onHide={() => setShowGalleryEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                placeholder="Enter the location here"
              />
            </Form.Group>
            <Form.Group controlId="editAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
                placeholder="Enter the address here"
              />
            </Form.Group>
            <Form.Group controlId="editLandline">
              <Form.Label>Landline</Form.Label>
              <Form.Control
                type="text"
                value={editLandline}
                onChange={(e) => setEditLandline(e.target.value)}
                placeholder="Enter the address here"
              />
            </Form.Group>
            <Form.Group controlId="editMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                value={editMobile}
                onChange={(e) => setEditMobile(e.target.value)}
                placeholder="Enter the address here"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowGalleryEditModal(false)}
          >
            Close
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleUpdateGallery}
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
                Updating...
              </>
            ) : (
              'Update'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default General;
