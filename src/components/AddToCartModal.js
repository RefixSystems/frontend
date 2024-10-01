import React, { useState, useEffect } from 'react';
import { Col, Row, Offcanvas } from 'react-bootstrap';
import BasicButton from './BasicButton';
import { useNavigate } from 'react-router-dom';
import Laptop from '../../src/assests/images/laptop.webp';
import { getAllItemsInCart } from '../../src/utils/CartStorage';
import { useGetHomeDetailsQuery } from '../redux/api/HomeApi';
import { IoCart } from 'react-icons/io5';
import { FaRupeeSign, FaUserShield, FaAward } from 'react-icons/fa6';
import { FaCalendarAlt,FaShieldAlt,FaTools,FaTimesCircle } from "react-icons/fa";

const SideModal = ({ showCartModal, handleCloseCartModal, cartItems }) => {
  const [cartLength, setCartLength] = useState(0);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [token, setToken] = useState(null);

  const { data: HomeData, refetch } = useGetHomeDetailsQuery({
    phoneNumber: userPhoneNumber,
  });

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const parsedToken = JSON.parse(storedToken);
        setToken(parsedToken);
        setUserPhoneNumber(parsedToken.phoneNumber);
      }
    } catch (error) {
      console.error('Error parsing token from localStorage', error);
    }
  }, []);

  useEffect(() => {
    if (HomeData && HomeData.data && HomeData.data.cartLength) {
      setCartLength(HomeData.data.cartLength);
    }
  }, [HomeData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userPhoneNumber) {
        refetch();
      } else {
        const { length } = getAllItemsInCart();
        setCartLength(length);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [userPhoneNumber, refetch]);

  const navigateToProfile = (path) => {
    navigate('/my-profile', { state: { path } });
  };

  return (
    <div>
      <Offcanvas show={showCartModal} onHide={handleCloseCartModal} placement="end">
        <Offcanvas.Header closeButton className="d-flex justify-content-center">
          <Offcanvas.Title className="text-center w-100">
            Cart {cartLength === 1 ? 'Item' : 'Items'}
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <h6 className="m-1">
            <IoCart size={30} color="black" className="me-2" onClick={() => navigateToProfile('cart')} />
            Total Cart: {cartLength} {cartLength === 1 ? 'item' : 'items'}
          </h6>

          <div style={{ marginBottom: '2px' }}>
            {cartItems.slice(0, 3).map((item, index) => (
              <div key={index} className="cart-item mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image ?? Laptop}
                      width={100}
                      height={100}
                      style={{ objectFit: 'cover', borderRadius: '6px' }}
                      alt="Laptop"
                      className="me-3"
                    />
                    <div>
                      <h6>{item.type}</h6>
                      {item.issue && <span style={{ fontSize: '14px' }}><strong>Issues:</strong>{' '}{item.issue}</span>}
                      {item.model && <p style={{ fontSize: '14px' }}><strong>Model:</strong>{' '}{item.model}</p>}
                    </div>
                  </div>
                  <span className="text-success ms-auto">
                    <h6>Added</h6>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center">
            <BasicButton
              className="bg-main w-50 px-3 py-1"
              label="View Cart"
              onClick={() => navigateToProfile('cart')}
            />
          </div>

          <div className="mt-3">
            <Row>
              <Col lg={12} className="border border-secondary p-3">
                <h6 className="text-center">
                  <FaAward size={25} /> RS Promise
                </h6>
                <div>
                  <FaUserShield size={20} className="me-2" /> Verified Professionals Refix Systems
                  <br />
                  <FaRupeeSign size={18} className="me-2" /> Transparent Pricing
                  <br />
                  <FaCalendarAlt size={20} className="me-1" /> Hassle-Free Booking
                </div>
              </Col>

              <Col lg={12} className="border border-secondary p-3 mt-3">
                <h6 className="text-center mt-3">
                  <FaShieldAlt size={20} /> Warranty Period
                </h6>
                <FaTools size={15} className="me-1" /> 180 days warranty on all repairs
                <br />
                <FaCalendarAlt size={15} className="me-1" /> Warranty on servicing for 5 days
                <br />
                <FaTimesCircle size={15} className="me-1" /> Minor repairs not requiring any spare part
              </Col>
            </Row>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default SideModal;
