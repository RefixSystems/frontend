import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import {
  useDeleteNotificationMutation,
  useGetNotificationQuery,
} from '../../../redux/api/NotificationApi';
import { MdDelete, MdEmail } from 'react-icons/md';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import DeleteModel from '../../../components/DeleteModel';
import { toast } from 'react-toastify';
import NoAccess from '../../../components/NoAccess';
import NoDataFound from '../../../components/NoDataFound';
import { format } from 'date-fns';
import { useTheme } from '../../../Contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { getPhoneNumber } from '../../../Constants/PhoneNumberGlobal';
const NotificationPage = () => {
  const { color } = useTheme();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [viewedNotifications, setViewedNotifications] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sendemail, setSendEmail] = useState('');

  const role = getRole();
  const phoneNumberGlobal = getPhoneNumber();

  const [deleteAllNotification] = useDeleteNotificationMutation();
  const navigate = useNavigate();
  const { data, refetch, isLoading, error } = useGetNotificationQuery({
    role: role,
    phoneNumber: phoneNumberGlobal,
  });
  const formatTime = (date) => format(new Date(date), ' h:mm a');
  useEffect(() => {
    // Retrieve viewed notifications from local storage on mount
    const viewed =
      JSON.parse(localStorage.getItem('viewedNotifications')) || [];
    setViewedNotifications(viewed);
  }, []);

  const handleShowModal = (notification) => {
    if (notification && notification.orderDetails) {
      const details = notification.orderDetails[0] ?? {};
      setPhoneNumber(details.phoneNumber);
      setSendEmail(details.email);
    }
    setSelectedNotification(notification);
    setShowModal(true);

    if (!viewedNotifications.includes(notification._id)) {
      const updatedViewedNotifications = [
        ...viewedNotifications,
        notification._id,
      ];
      setViewedNotifications(updatedViewedNotifications);
      // Save to local storage
      localStorage.setItem(
        'viewedNotifications',
        JSON.stringify(updatedViewedNotifications)
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const deleteHandleShow = () => {
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleDeleteNotification = async () => {
    try {
      const response = await deleteAllNotification({
        role: role,
        phoneNumber: phoneNumberGlobal,
      });
      setDeleteShow(false);
      if (response?.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        refetch();
      } else {
        toast.error(response?.error?.data?.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // const formatTime = (datetime) => {
  //   const date = new Date(datetime);
  //   return date.toLocaleTimeString(undefined, {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   });
  // };

  return (
    <div>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <Container fluid className="mt-3 ">
          <Row className="boxShadow p-4 mb-4 mt-4">
            <Col className="d-flex flex-row justify-content-between mt-1">
              <h4 className="fw-bold">Notifications</h4>
              {data && data.data && data.data.length === 0 ? (
                <></>
              ) : (
                <div>
                  <Button
                    variant="danger"
                    className="p-2 m-1"
                    onClick={deleteHandleShow}
                  >
                    <MdDelete size={20} />
                    <span className="d-none d-md-inline"> Clear All</span>
                  </Button>
                </div>
              )}
            </Col>
          </Row>
          {data && data.data && data.data.length === 0 ? (
            <Row className="justify-content-center ">
              <Col
                xs="auto"
                className="justify-content-center align-item-center"
              >
                <div>
                  <NoDataFound />
                </div>
              </Col>
            </Row>
          ) : (
            data?.data?.map((notification) => (
              <Row
                key={notification._id}
                className="boxShadow p-3 mb-4"
                style={{ cursor: 'pointer' }}
                onClick={() => handleShowModal(notification)}
              >
                <Col xs={12}>
                  <div
                    className={`notification-item ${!viewedNotifications.includes(notification._id) ? 'unviewed' : ''}`}
                  >
                    <h4>{notification.title}</h4>
                    <p>{notification.subtitle}</p>
                  </div>
                  <div className="d-flex justify-content-between m-1">
                    <span>{formatDate(notification.createdAt)}</span>
                    <span>{formatTime(notification.createdAt)}</span>
                  </div>
                </Col>
              </Row>
            ))
          )}
        </Container>
      )}

      <Modal show={showModal} onHide={handleCloseModal} centered    dialogClassName="review-modal">
        <Modal.Header closeButton>
          <Modal.Title>Notification Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNotification &&
          selectedNotification.orderDetails.length > 0 ? (
            selectedNotification.orderDetails.map((detail, index) => (
              <div key={index}>
                {Object.entries(detail).map(
                  ([key, value]) =>
                    key !== '_id' &&
                    key !== 'products' && (
                      <Form.Group key={key} className="mb-3">
                        <Form.Label>
                          <strong>{key}</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          disabled
                          value={value}
                        />
                      </Form.Group>
                    )
                )}
                <hr />
              </div>
            ))
          ) : (
            <NoDataFound />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor:color}} onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <DeleteModel
        YES={handleDeleteNotification}
        DELETESTATE={deleteShow}
        ONCLICK={deleteHandleClose}
        DESCRIPTION="Are you sure you want to delete all notifications"
        DELETETITLE="Notification"
      />
    </div>
  );
};

export default NotificationPage;
