import React, { useEffect, useState } from 'react';
import { useGetLogoQuery } from '../../../redux/api/LogoApi';
import './Nav.css';
import {
  Badge,
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Offcanvas,
  Row,
} from 'react-bootstrap';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaBell } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md'; // Add this line
import { useNavigate } from 'react-router-dom';
import { sidebarItems } from './SideMenu_Data';
import ReactSidebar from './ReactSidebar';
import DeleteModel from '../../../components/DeleteModel';
import { useGetNotificationQuery } from '../../../redux/api/NotificationApi';
import { getRole } from '../../../Constants/Global';
import { truncateText } from '../../../Constants/constant';
import { useTheme } from '../../../Contexts/ThemeContext';
import { getEmail } from '../../../Constants/EmailGlobal';
import NoAccess from '../../../components/NoAccess';

const MainNav = () => {
  const { color } = useTheme();
  const [show, setShow] = useState(false);
  const [logoutShow, setLogoutShow] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [newNotifications, setNewNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewedNotifications, setViewedNotifications] = useState([]);
  const email = getEmail();
  const role = getRole();
  const { data: notificationData } = useGetNotificationQuery({
    role: role,
    email: email,
  });
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const { data: logoData } = useGetLogoQuery();

  useEffect(() => {
    if (logoData && logoData.data) {
      setData(logoData.data);
    }
  }, [logoData]);

  useEffect(() => {
    if (notificationData && notificationData.data) {
      setNewNotifications(notificationData.data.slice(0, 3));
    }
  }, [notificationData]);

  const handleClose = () => setShow(false);
  const handleNavigateAddForm = () => setShow(true);
  const handleModelClose = () => setLogoutShow(false);

  const handleLogin = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
    setSelectedNotification(null);
    setNewNotifications([]);
  };

  const handleShowAllNotifications = () => {
    navigate('/admin/notification');
    handleCloseNotifications();
  };

  const handleNotificationClick = (notification) => {
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

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Container
        fluid
        className="d-flex flex-row flex-wrap-wrap justify-content-between align-items-center overflowX-hidden d-print-none"
        style={{
          position: 'sticky',
          top: '0',
          zIndex: 1000,
          backgroundColor: color,
        }}
      >
        <Row className="d-flex flex-row flex-wrap-wrap justify-content-around align-items-center p-2">
          <Col className="d-lg-none d-xl-none d-sm-flex">
            <AiOutlineMenu
              size={25}
              onClick={handleNavigateAddForm}
              className="pointer"
              color="white"
            />
          </Col>
          <Col
            className="d-lg-flex d-none d-sm-none flex-row flex-wrap-wrap justify-content-between align-items-center"
            style={{ marginRight: '100px' }}
          >
            <img
              src={data.image ?? ''}
              width={45}
              className="pointer"
              alt="MainLogoImage1"
              title="MainLogoImage1"
            />
          </Col>
        </Row>
        {/* mobile view */}

        <Row>
          <Col className='d-lg-none d-sm-flex flex-row flex-wrap-wrap justify-content-between" align-items-center'>
            <img
              src={data.image ?? ''}
              width={50}
              className="p-2 pointer rounded-circle"
              alt="MainLogoImage2"
              title="MainLogoImage2"
            />
          </Col>
        </Row>

        <Row className="d-flex mt-1">
          <Col className="d-lg-none d-sm-flex">
            <div className="d-flex align-items-center position-relative">
              {newNotifications.length > 0 ? (
                <Dropdown>
                  <Dropdown.Toggle
                    className="mobile-view-dropdown"
                    id="dropdown-basic"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'white',
                    }}
                  >
                    <div className="notification-bell">
                      <FaBell
                        size={20}
                        style={{
                          cursor: 'pointer',
                          color: 'white',
                          marginRight: '0px',
                        }}
                      />
                      {newNotifications.length > 0 && (
                        <Badge
                          pill
                          bg="danger"
                          style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            fontSize: '10px',
                          }}
                        >
                          {newNotifications.length}
                        </Badge>
                      )}
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Header>
                      <h5 style={{ fontWeight: 'bold', color: color }}>
                        Notifications
                      </h5>
                    </Dropdown.Header>
                    {notificationData && notificationData.data && (
                      <>
                        {notificationData.data.length > 0 ? (
                          notificationData.data
                            .slice(0, 3)
                            .map((notification) => (
                              <Dropdown.Item
                                className="boxShadow"
                                key={notification._id}
                                onClick={() =>
                                  handleNotificationClick(notification)
                                }
                              >
                                <div className="notification-item mx-3  m-1">
                                  <h6>
                                    {truncateText(notification.title, 20)}
                                  </h6>
                                  <p className="text-wrap">
                                    {truncateText(notification.subtitle, 20)}
                                  </p>
                                </div>
                              </Dropdown.Item>
                            ))
                        ) : (
                          <Dropdown.Item>No notifications</Dropdown.Item>
                        )}
                        <Dropdown.Divider />
                        <Dropdown.Item
                          onClick={handleShowAllNotifications}
                          className="text-center"
                          style={{ color: color }}
                        >
                          See All Notifications
                        </Dropdown.Item>
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <FaBell
                  size={20}
                  style={{
                    cursor: 'pointer',
                    color: 'white',
                    marginRight: '0px',
                  }}
                  onClick={handleShowAllNotifications}
                />
              )}

              {role === 'Admin' && (
              <MdEmail
                size={20}
                style={{
                  cursor: 'pointer',
                  color: 'white',
                  marginLeft: '10px',
                  marginRight: '10px',
                }}
                onClick={() => navigate('/admin/email')}
              />
              )}
              <Dropdown>
                <Dropdown.Toggle
                  className="mobile-view-dropdown"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'white',
                  }}
                >
                  <BsThreeDotsVertical
                    size={25}
                    style={{ cursor: 'pointer', color: 'white' }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item onClick={() => setLogoutShow(true)}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>

          {/* lap view */}
          <Col className="d-lg-flex d-none d-sm-none flex-row flex-wrap-wrap justify-content-center align-items-center position-relative">
            <div className="d-flex align-items-center position-relative">
              {newNotifications.length > 0 ? (
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-notifications"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'white',
                    }}
                  >
                    <div className="notification-bell">
                      <FaBell
                        size={20}
                        style={{
                          cursor: 'pointer',
                          color: 'white',
                          marginRight: '0px',
                        }}
                      />
                      {newNotifications.length > 0 && (
                        <Badge
                          pill
                          bg="danger"
                          style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            fontSize: '10px',
                          }}
                        >
                          {newNotifications.length}
                        </Badge>
                      )}
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Header>
                      <h5 style={{ fontWeight: 'bold', color: color }}>
                        Notifications
                      </h5>
                    </Dropdown.Header>
                    {notificationData && notificationData.data && (
                      <>
                        {notificationData.data.length > 0 ? (
                          notificationData.data
                            .slice(0, 3)
                            .map((notification) => (
                              <Dropdown.Item
                                key={notification._id}
                                onClick={() =>
                                  handleNotificationClick(notification)
                                }
                              >
                                <div className="m-3">
                                  <h6>{notification.title}</h6>
                                  <p className="text-wrap">
                                    {truncateText(notification.subtitle, 50)}
                                  </p>
                                </div>
                              </Dropdown.Item>
                            ))
                        ) : (
                          <Dropdown.Item>No notifications</Dropdown.Item>
                        )}
                        <Dropdown.Divider />
                        <Dropdown.Item
                          onClick={handleShowAllNotifications}
                          className="text-center "
                          style={{ color: color }}
                        >
                          See All Notifications
                        </Dropdown.Item>
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <FaBell
                  size={20}
                  style={{
                    cursor: 'pointer',
                    color: 'white',
                    marginRight: '0px',
                  }}
                  onClick={handleShowAllNotifications}
                />
              )}
              {role === 'Admin' && (
              <MdEmail
                size={20}
                style={{
                  cursor: 'pointer',
                  color: 'white',
                  marginLeft: '10px',
                  marginRight: '10px',
                }}
                onClick={() => navigate('/admin/email')}
              />
              )}
              <Dropdown>
                <Dropdown.Toggle
                  color="white"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'white',
                  }}
                >
                  <img
                    src="https://p7.hiclipart.com/preview/636/702/321/computer-icons-user-profile-avatar-black-man.jpg"
                    className="rounded-circle"
                    style={{ width: '30px' }}
                    alt="Avatar"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setLogoutShow(true)}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Conditionally render Offcanvas for large screens */}
      <Row className="d-none d-lg-flex d-xl-flex d-xxl-flex">
        <Offcanvas scroll={false} show={show} onHide={handleClose}>
          <Offcanvas.Header style={{ backgroundColor: color }} closeButton>
            <Offcanvas.Title
              className="custom-title"
              style={{
                fontSize: '16px',
                color: 'white',
              }}
            >
              <img
                src={data.image ?? ''}
                width={50}
                className="rounded-circle p-2"
                alt="image"
              />
              Refix Systems
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ backgroundColor: ' #FFFFFF' }}>
            <ReactSidebar onClick={handleClose} sidebarItems={sidebarItems} />
          </Offcanvas.Body>
        </Offcanvas>
      </Row>

      <DeleteModel
        DELETESTATE={logoutShow}
        ONCLICK={handleModelClose}
        YES={handleLogin}
        DESCRIPTION="Do You Want To Logout"
        DELETETITLE="Logout"
      />

      {/* notification modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
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
            <h5 className="text-center mt-3 mb-3">
              Notification Details is empty..
            </h5>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MainNav;
