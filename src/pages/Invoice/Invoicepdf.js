import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Paragraph from '../../components/paragraph';
import Table from 'react-bootstrap/Table';
import { format } from 'date-fns';
import Loader from '../../components/Loader';

const InvoicePage = () => {
  const location = useLocation();
  const data = location.state?.data;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      window.print();
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Loader/>
      </div>
    );
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="invoice-pdf">
      <InvoiceContent data={data} />
    </div>
  );
};

const InvoiceContent = ({ data }) => {
  const {
    phoneNumber,
    userName,
    email,
    address,
    totalChargesBeforeGST,
    GST,
    toBePaid,
    serviceCharges,
    orderCreatedOn,
    createdAt,
    typeOfService,
    logoTest,
    labourCharges,
    totalCharges,
    requestId,
    details,
    finalAmountPaid
  } = data;

  const formatDateTime = (date) => format(new Date(date), 'dd-MM-yyyy h:mm a');
  const formatAmount = (amount) => {
    return amount != null ? `Rs.${Number(amount).toFixed(2)}` : 'Rs. 0.00';
  };

  return (
    <Container>
      <Col>
        {logoTest && <img src={logoTest} alt="Logo" width={100} height={100} style={{ objectFit: 'contain' }} />}
      </Col>
      <Col className="d-flex justify-content-center mt-0">
        <h6 className="text-nowrap">Refix Systems Invoice</h6>
      </Col>

      <Row className="mt-0 ">
        <h6>Billed To:</h6>
        <Col>
          <Paragraph><strong>Name: </strong>{userName}</Paragraph>
          <Paragraph><strong>Address: </strong>{address}</Paragraph>
          <Paragraph><strong>Phone Number: </strong>{phoneNumber}</Paragraph>
          <Paragraph ><strong>Email: </strong>{email}</Paragraph>
        </Col>
        <Col >
          <Paragraph><strong>Type:</strong>{typeOfService}</Paragraph>
          <Paragraph><strong>Order Id:</strong>{requestId}</Paragraph>
          <Paragraph><strong>Order Created On:</strong>{orderCreatedOn}</Paragraph>
          <Paragraph><strong>Bill Generated On:</strong>{formatDateTime(createdAt)}</Paragraph>
        </Col>
      </Row>

      <Table striped bordered hover responsive className="mt-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Component</th>
            <th>Labour Charge</th>
            <th>Service Charge</th>
          </tr>
        </thead>
        <tbody>
          {details?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.description}</td>
              <td>{item.component}</td>
              <td>{formatAmount(item.labourCharge)}</td>
              <td>{formatAmount(item.serviceCharge)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="d-flex justify-content-end mt-0">
        <Col lg={8} md={6} sm={6}>
          <div className="d-flex justify-content-between">
            <Paragraph>Total Labour Charges</Paragraph>
            <Paragraph>{formatAmount(labourCharges)}</Paragraph>
          </div>
          <div className="d-flex justify-content-between">
            <Paragraph>Total Service Charges</Paragraph>
            <Paragraph>{formatAmount(serviceCharges)}</Paragraph>
          </div>
          <div className="d-flex justify-content-between">
            <Paragraph>Total Charges Before GST</Paragraph>
            <Paragraph>{formatAmount(totalChargesBeforeGST)}</Paragraph>
          </div>
          <div className="d-flex justify-content-between">
            <Paragraph>GST</Paragraph>
            <Paragraph>{formatAmount(GST)}</Paragraph>
          </div>
          <div className="d-flex justify-content-between">
            <Paragraph><strong>Total To Be Paid</strong></Paragraph>
            <span className='text-end'><strong>{formatAmount(toBePaid)}</strong></span>
          </div>
          <div className="d-flex justify-content-between">
            <Paragraph><strong>Total Amount Paid</strong></Paragraph>
            <Paragraph><strong>{formatAmount(finalAmountPaid)}</strong></Paragraph>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default InvoicePage;
