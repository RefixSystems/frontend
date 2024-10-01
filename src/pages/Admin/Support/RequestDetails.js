import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { format } from 'date-fns';
import { useGetRequestDetailsQuery } from '../../../redux/api/SupportApi';

const RequestDetails = () => {
    const { supportId } = useParams();
    const [data, setData] = useState([]);
    // const [read, setRead] = useState(false);
    const role = getRole();
    const { data: RequestDetailsData, isLoading } = useGetRequestDetailsQuery({ supportId, role });
    const formatDateTime = (date) => {
        if (!date) return 'Invalid date';
        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) return 'Invalid date';
        return format(parsedDate, 'dd-MMM-yyyy h:mm a');
    };
    
    const navigate = useNavigate();

    useEffect(() => {
        if (RequestDetailsData && RequestDetailsData.data) {
            setData(RequestDetailsData.data);
            // setRead(RequestDetailsData.moduleAccess.read);
        }
    }, [RequestDetailsData, role]);

    const handleCancel = () => navigate('/admin/support');

    return (
        <div>
            {isLoading ? (
                <FetchLoader />
            ) : (
                <>
                 
                        <Container fluid className="mt-3 reduced-width-row">
                            <Row className="boxShadow p-4 mb-4 mt-4">
                                <Col className="d-flex justify-content-start mb-3 mt-3">
                                    <h4 onClick={handleCancel} style={{ cursor: 'pointer' }}>
                                        <AiOutlineArrowLeft />
                                    </h4>
                                    <h4 className="ms-2">Custom Laptop Request details</h4>
                                </Col>
                            </Row>
                            <Row className="boxShadow p-4 mb-4 d-flex justify-content-center">
                                <Col md={10} lg={8} sm={12} className="mb-4 d-flex">
                                    <Card className="h-100 w-100 shadow-sm border-0">
                                        <Card.Body>
                                            {/* <Card.Title className="text-primary">
                                                Request #{data.supportId}
                                            </Card.Title> */}
                                            <Row>
                                                <Col md={6}>
                                                    <Card.Text>
                                                    <Card.Title className="text-primary mb-3">
                                                Customer Details
                                            </Card.Title>
                                                      <strong>User Name:</strong> {data.userName}
                                                    </Card.Text>
                                                    <Card.Text>
                                                       <strong>Phone Number:</strong> {data.phoneNumber}
                                                    </Card.Text>
                                                    <Card.Text>
                                                <strong>Email:</strong> {data.email}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <strong>Status:</strong>
                                                        <span className={`badge ${data.status === 'Accepted' ? 'bg-success' : 'bg-warning'}`}>
                                                            {data.status}
                                                        </span>
                                                    </Card.Text>
                                                   
                                                </Col>
                                                <Col md={6}>
                                                <Card.Title className="text-primary mb-3">
                                                Laptop Details
                                            </Card.Title>
                                                <Card.Text>
                                                        <strong>Processor:</strong> {data.processor}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <strong>Operating System:</strong> {data.operatingSystem}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <strong>RAM:</strong> {data.ram}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <strong>Screen Size:</strong> {data.screenSize}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <strong>Quantity:</strong> {data.quantity}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <strong>Type:</strong> {data.type}
                                                    </Card.Text>
                                                    
                                                </Col>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col md={6}>
                                                    <Card.Text>
                                                        <strong>Message:</strong> {data.message}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <strong>Note:</strong> {data.note || 'N/A'}
                                                    </Card.Text>
                                                </Col>
                                            </Row>
                                            <Card.Text>
                                                <strong>Created At:</strong> {formatDateTime(data.createdAt)}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Updated At:</strong> {formatDateTime(data.updatedAt)}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                  
                </>
            )}
        </div>
    );
};

export default RequestDetails;
