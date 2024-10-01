import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useGetTransactionIDDetailsQuery } from '../../../redux/api/TransactionsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useTheme } from '../../../Contexts/ThemeContext';
import NoDataFound from '../../../components/NoDataFound';
import { Heading } from '../../../components/Heading';

const TransactionIdDetails = () => {
  const { color } = useTheme();
  const { requestId } = useParams();
  const role = getRole();
  const navigate = useNavigate();
  const { data, isLoading } = useGetTransactionIDDetailsQuery({
    requestId,
    role,
  });

  const handleCancel = () => navigate(-1);

  if (isLoading) return <FetchLoader />;

  const {
    phoneNumber,
    amount,
    requestId: apiRequestId,
    transactionId,
    couponCode,
    couponValue,
    type,
    createdAt,
  } = data?.data || {};

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const typeString = type ? type.join(', ') : '-';

  return (
    <Container fluid className="mt-3">
      <Row className="boxShadow p-4 mb-4 mt-4">
        <Col className="d-flex justify-content-start mb-3 mt-3">
          <h4 onClick={handleCancel} style={{ cursor: 'pointer' }}>
            <AiOutlineArrowLeft />
          </h4>
          <h4 className="ms-2">Transaction ID Details</h4>
        </Col>
      </Row>
      {data?.data ? (
        <>
          <Row className="boxShadow p-4 mb-4 mt-4">
            <Col xs={12} className="text-center mb-4">
              <Heading>
                Transaction ID -{' '}
                <span style={{ color: color }}>{transactionId} </span>
              </Heading>
            </Col>
            <Col xs={12}>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>
                      <strong>Phone Number</strong>
                    </td>
                    <td>{phoneNumber}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Amount</strong>
                    </td>
                    <td>₹ {amount}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Request ID</strong>
                    </td>
                    <td>{apiRequestId}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Transaction ID</strong>
                    </td>
                    <td>{transactionId}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Coupon Code</strong>
                    </td>
                    <td>{couponCode || '-'}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Coupon Value</strong>
                    </td>
                    <td>₹ {couponValue || '0'}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Type</strong>
                    </td>
                    <td>{typeString}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Created At</strong>
                    </td>
                    <td>{formattedDate}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      ) : (
        <Row className="justify-content-center ">
          <Col xs="auto" className="justify-content-center align-item-center">
            <div>
              <NoDataFound />
              <Heading>No Data in this Transaction ID</Heading>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default TransactionIdDetails;
