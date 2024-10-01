
import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { useGetRentalOrderDetailsQuery } from '../../../redux/api/RentalOrderDetailsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Paragraph from '../../../components/paragraph';
import Table from 'react-bootstrap/Table';
import { truncateText } from '../../../Constants/constant';

const RentalOrderDetails = () => {
  const { requestId } = useParams();
  const [data, setData] = useState([]);
  const role = getRole();
  const { data: RentalOrderDetailsData, isLoading } =
    useGetRentalOrderDetailsQuery({ requestId, role });
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/admin/orders');
  };

  useEffect(() => {
    if (RentalOrderDetailsData && RentalOrderDetailsData.data) {
      
      const rentalOrders = RentalOrderDetailsData.data.filter(
        (order) => order.type === 'Rental'
      );
      setData(rentalOrders);
    }
  }, [RentalOrderDetailsData]);

  return (
    <div>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <Container fluid className="mt-3 reduced-width-row">
          <Row className="boxShadow p-4 mb-4 mt-4">
            <Col className="d-flex justify-content-start mb-3 mt-3">
              <h4 onClick={handleCancel} style={{ cursor: 'pointer' }}>
                <AiOutlineArrowLeft />
              </h4>
              <h4>Order Details</h4>
            </Col>
          </Row>

          <Row className="boxShadow p-4 mb-4">
            {data.length > 0 ? (
              data.map((order) => (
                <React.Fragment key={order.index}>
                  <Col
                    xxl={12}
                    xl={12}
                    lg={12}
                    sm={12}
                    md={12}
                    className="mt-5 text-start"
                  >
                    <Card>
                      <Card.Body>
                        <Card.Title>Order ID: {order.requestId}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Row>
  <Col xxl={4} xl={4} lg={4} sm={12} md={6} className="mt-2">
    <Card className="">
      <Card.Body className="d-flex flex-column">
        <h4>Customer Details</h4>
        <div className="mt-4 ">
          <p>
            <strong>Name:</strong> {order.userName}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.phoneNumber}
          </p>
        </div>
      </Card.Body>
    </Card>
  </Col>
  <Col xxl={4} xl={4} lg={4} sm={12} md={6} className="mt-2">
    <Card className="">
      <Card.Body className="">
        <h4>Shipping Address</h4>
        <div className="mt-4 ">
          <p>{order.shippingAddress}</p>
        </div>
      </Card.Body>
    </Card>
  </Col>
  <Col xxl={4} xl={4} lg={4} sm={12} md={6} className="mt-2">
    <Card className="">
      <Card.Body className="">
        <h4>Booking Address</h4>
        <div className="mt-4 ">
          <p>{order.bookingAddress}</p>
        </div>
      </Card.Body>
    </Card>
  </Col>
</Row>

                  <Col
                    xxl={12}
                    xl={12}
                    lg={10}
                    sm={12}
                    md={12}
                    className="mt-4 "
                  >
                    <Card className=" text-center p-4">
                      <h4>Laptop Details</h4>

                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>Laptop Brand</th>
                            <th>Laptop Model</th>
                            {order.type === 'Rental' && (
                              <th>AmountForOneMonth</th>
                            )}
                            {order.type === 'Refurbished' && <th>Amount</th>}
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{order.brand}</td>
                            <td>{order.model}</td>

                            {order.type === 'Rental' && (
                              <td>₹ {order.amountForOneMonth}</td>
                            )}
                            {order.type === 'Refurbished' && (
                              <td>₹ {order.amount}</td>
                            )}
                            <td>{order.status}</td>
                          </tr>
                        </tbody>
                      </Table>

                      <Card.Body>
                        <Row className="mt-1">
                          <Col>
                            <Paragraph>
                              <strong>Type:</strong>
                              <span
                                style={{
                                  textTransform: 'uppercase',
                                  fontSize: '18px',
                                }}
                              >
                                {' '}
                                {order.type}
                              </span>
                            </Paragraph>

                            {order.type === 'Rental' ? (
  <Paragraph>
    <strong>Description:</strong> {truncateText(order.description,100)}
  </Paragraph>
) : null}

                            {order.type === 'Repair'
                              ? ((
                                  <Paragraph>
                                    <strong>Issue</strong> {order.issue}
                                  </Paragraph>
                                ),
                                (
                                  <Paragraph>
                                    <strong>IssueDetails:</strong>{' '}
                                    {order.issueDetails}
                                  </Paragraph>
                                ))
                              : null}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </React.Fragment>
              ))
            ) : (
              <Col className="d-flex justify-content-center">
                <h4>No Data Found</h4>
              </Col>
            )}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default RentalOrderDetails;
