import React, { useState } from 'react';
import { Col, Container, Row, Card, Form, Button } from 'react-bootstrap';
import { IoMdMail } from 'react-icons/io';
import { FaPhoneAlt } from 'react-icons/fa';

import Razorpay from '../assests/images/razorpayimg.webp';
import Logo from '../assests/images/laptop.webp';
import Visa from '../assests/images/visa2.webp';
import { useTheme } from '../Contexts/ThemeContext';

const RazorPay = () => {
  const { color } = useTheme();
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !name || !phone || !email || !address || !city) {
      alert('Please fill in all fields');
      return;
    }

    var options = {
      key: 'rzp_test_uokoGFEesq8XwG',
      key_secret: 'oZsteudI50Jf4Iv5PdVxXZ4W',
      amount: amount * 100,
      currency: 'INR',
      name: 'LAPTOP_DOCTOR',
      description: 'Laptop Services',
      handler: function (response) {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: {
        amount: amount,
        name: name,
        phone: phone,
        email: email,
        address: address,
        city: city,
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div>
      <Container>
        <Row>
          <Col
            xs={12}
            md={6}
            className="mt-5 d-flex flex-column justify-content-center align-items-center"
          >
            <Col style={{ color: '#0D2366' }}>
              <img
                style={{ height: '40px', width: '50px' }}
                className=""
                src={Logo}
                alt="Refix Systems"
              />
              <b>
                {' '}
                <span className=" mx-4">The_Laptop_Doctor</span>
              </b>
              <h5 className="mb-4 mt-4">Laptop Services</h5>
              <h5>Description:</h5>
              <p className="mb-4">
                We offer laptop rentals, expert repairs, and high-quality
                refurbished laptops. Our services are reliable, affordable, and
                tailored to meet your needs. Choose us for flexible rentals,
                swift repairs, and cost-effective refurbished devices.
              </p>
              <h6>Contact Us:</h6>
              <h6>
                <IoMdMail /> balaabimanyugnc@gmail.com
              </h6>
              <h6 className="mb-4">
                <FaPhoneAlt /> 9876543210
              </h6>
              <h6>Terms & Conditions</h6>
              <p className="mb-4">
                You agree to share information entered on this page with Outfits
                (owner of this page) and Razorpay, adhering to applicable laws.
              </p>
              <hr />
              <img
                style={{ height: '50px', width: '100px' }}
                className=""
                src={Razorpay}
                alt="Razorpay"
              />
              <p className="mb-4">
                Want to create a page like this for your Business? Visit
                Razorpay Payment Pages to get started!
              </p>
            </Col>
          </Col>

          <Col xs={12} md={6} className="mt-5 mb-5">
            <Card
              style={{
                border: 'none',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Card.Body>
                <Card.Title className="text-start" style={{ color: '#0D2366' }}>
                  Payment Details
                </Card.Title>
                <Form style={{ color: '#515978' }}>
                  <Form.Group as={Row} className="mb-3" controlId="formAmount">
                    <Form.Label column sm={4} xs={12}>
                      Amount
                    </Form.Label>
                    <Col sm={8} xs={12}>
                      <Form.Control
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={handleAmountChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formFullName"
                  >
                    <Form.Label column sm={4} xs={12}>
                      Full Name
                    </Form.Label>
                    <Col sm={8} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPhone">
                    <Form.Label column sm={4} xs={12}>
                      Phone
                    </Form.Label>
                    <Col sm={8} xs={12}>
                      <Form.Control
                        type="tel"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formEmail">
                    <Form.Label column sm={4} xs={12}>
                      Email
                    </Form.Label>
                    <Col sm={8} xs={12}>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formAddress">
                    <Form.Label column sm={4} xs={12}>
                      Address
                    </Form.Label>
                    <Col sm={8} xs={12}>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formCity">
                    <Form.Label column sm={4} xs={12}>
                      City
                    </Form.Label>
                    <Col sm={8} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  {/* New Row for Visa Image and Submit Button */}
                  <Row className="mt-3">
                    <Col xs={6} className="d-flex justify-content-start">
                      <img
                        className="mt-4"
                        style={{ height: '9px', width: '140px' }}
                        src={Visa}
                        alt="Visa"
                      />
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end">
                      <Button
                        onClick={handleSubmit}
                        style={{ backgroundColor: color, color: 'white' }}
                        type="submit"
                        className="w-100 mt-3"
                      >
                        Pay Now {amount ? `$${amount}` : ''}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RazorPay;
