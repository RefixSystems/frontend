import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { useGetQuotesDetailsQuery } from '../../../redux/api/QuotesDetailsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { format } from 'date-fns';

const RentalOrderDetails = () => {
  const { requestId } = useParams();
  const [data, setData] = useState([]);
  const [read, setRead] = useState(false);
  const role = getRole();
  const { data: RentalOrderDetailsData, isLoading } = useGetQuotesDetailsQuery({
    requestId,
    role,
  });
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  const navigate = useNavigate();

  useEffect(() => {
    if (RentalOrderDetailsData && RentalOrderDetailsData.data) {
      setData(RentalOrderDetailsData.data);
      setRead(RentalOrderDetailsData.moduleAccess.read);
    }
  }, [RentalOrderDetailsData, role]);

  const handleCancel = () => navigate('/admin/orders');

  return (
    <div>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <>
          {read ? (
            <Container fluid className="mt-3 reduced-width-row">
              <Row className="boxShadow p-4 mb-4 mt-4">
                <Col className="d-flex justify-content-start mb-3 mt-3">
                  <h4 onClick={handleCancel} style={{ cursor: 'pointer' }}>
                    <AiOutlineArrowLeft />
                  </h4>
                  <h4 className="ms-2">Order Details</h4>
                </Col>
              </Row>
              <Row className="boxShadow p-4 mb-4 d-flex justify-content-center">
                {data.map((item, index) => (
                  <Col
                    md={10}
                    lg={8}
                    sm={12}
                    key={index}
                    className="mb-4 d-flex"
                  >
                    <Card className="h-100 w-100 shadow-sm border-0">
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <Card.Title className="text-primary mb-3">
                              Customer Details
                            </Card.Title>
                            <Card.Text>
                              <strong>User Name:</strong> {item.userName}
                            </Card.Text>
                            <Card.Text>
                              <strong>Phone Number:</strong> {item.phoneNumber}
                            </Card.Text>
                            <Card.Text>
                              <strong>Alternate Phone Number:</strong>{' '}
                              {item.alternatePhoneNumber}
                            </Card.Text>
                            <Card.Text>
                              <strong>Email:</strong> {item.email}
                            </Card.Text>
                            <Card.Text>
                              <strong>Address:</strong> {item.address}
                            </Card.Text>
                            <Card.Text>
                              <strong>Status:</strong>
                              <span
                                className={`badge ${item.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}
                              >
                                {item.status}
                              </span>
                            </Card.Text>
                          </Col>
                          <Col md={6}>
                            <Card.Title className="text-primary mb-3">
                              Laptop Details
                            </Card.Title>

                            <Card.Text>
                              <strong>Request Id:</strong> {item.requestId}
                            </Card.Text>
                            <Card.Text>
                              <strong>Brand:</strong> {item.brand}
                            </Card.Text>
                            <Card.Text>
                              <strong>Model:</strong> {item.model}
                            </Card.Text>
                            <Card.Text>
                              <strong>Amount For One Month:</strong>{' '}
                              {item.amountForOneMonth}
                            </Card.Text>
                            <Card.Text>
                              <strong>Quantity:</strong> {item.quantity}
                            </Card.Text>
                            <Card.Text>
                              <strong>Rental Period:</strong>{' '}
                              {item.rentalPeriod}
                            </Card.Text>
                            <Card.Text>
                              <strong>Description:</strong> {item.description}
                            </Card.Text>
                            <Card.Text>
                              <strong>Type:</strong> {item.type}
                            </Card.Text>
                            <Card.Text>
                              <strong>Laptop Id:</strong> {item.laptopId}
                            </Card.Text>
                          </Col>
                        </Row>
                        <hr />

                        <Card.Text>
                          <strong>Created At:</strong>{' '}
                          {formatDateTime(item.createdAt)}
                        </Card.Text>
                        <Card.Text>
                          <strong>Updated At:</strong>{' '}
                          {formatDateTime(item.updatedAt)}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}
    </div>
  );
};

export default RentalOrderDetails;
