import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useTheme } from '../../../Contexts/ThemeContext';
import { FaArrowLeft, FaEdit, FaFileDownload } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { getRole } from '../../../Constants/Global';
import { useGetPreviewQuery } from '../../../redux/api/PreviewApi';
import { format } from 'date-fns';
import FetchLoader from '../../../components/FetchLoader';
import { useGetLogoQuery } from '../../../redux/api/LogoApi';

const Invoice = () => {
  const { color } = useTheme();
  const [data, setData] = useState({});
  const [imageData, setImageData] = useState({});
  const { requestId } = useParams();
  const [orderId, setOrderId] = useState(null);
  const role = getRole();
  const { data: InvoiceData, isLoading } = useGetPreviewQuery({
    requestId: requestId,
    role: role,
  });
  const { data: logoData } = useGetLogoQuery();
  const navigate = useNavigate();
  const invoiceRef = useRef(null);

  // useEffect(() => {
  //   if (logoData && logoData.data) {
  //     setImageData(logoData.data);
  //   }
  // }, [logoData]);

  const handleCancel = () => {
    navigate(`/admin/bill-information/${orderId}`);
  };

  const handleBackCancel = () => {
    navigate('/admin/orders');
  };

  useEffect(() => {
    if (InvoiceData && InvoiceData.data) {
      setData(InvoiceData.data);
      setOrderId(InvoiceData.orderId);
    }
  }, [InvoiceData, role]);

  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');

  // Handle PDF download by triggering the print dialog
  const handleDownloadPDF = () => {
    window.print(); // Opens the print dialog
  };

  if (isLoading) {
    return <FetchLoader />;
  }

  return (
    <Container className="invoice-container my-5" ref={invoiceRef}>
      {/* Invoice Header */}
      <Row>
        <Col>
          <img
            src={InvoiceData.data.logo}
            width={50}
            className="pointer mx-3"
            alt="MainLogoImage1"
            title="MainLogoImage1"
          />
        </Col>
        <h2 className="text-center mt-2 mb-2">Refix Systems</h2>
      </Row>
      <Row className="invoice-header align-items-center">
        <Col xs={12} md={6}>
          <h5 className="invoice-title d-print-none ">
            {<FaArrowLeft size={20} onClick={handleBackCancel} />} Invoice
          </h5>
          <span
            className="d-print-none"
            style={{ fontWeight: 'bold', marginLeft: '35px' }}
          ></span>{' '}
          {data.typeOfService || 'N/A'}
          <br />
        </Col>
        <Col
          xs={12}
          md={6}
          className="text-md-end text-center mt-3 mt-md-0 d-print-none"
        >
          {InvoiceData?.orderStatus !== 'Completed' ? (
            <Button
              className="download-btn mx-2"
              style={{ backgroundColor: color }}
              onClick={handleCancel}
            >
              <FaEdit size={20} /> Edit
            </Button>
          ) : (
            <></>
          )}
          <Button
            className="download-btn mx-2"
            style={{ backgroundColor: color }}
            onClick={handleDownloadPDF}
          >
            <FaFileDownload size={20} /> Download PDF
          </Button>
        </Col>
      </Row>
      <hr className="invoice-divider" />

      {/* Invoice Details */}
      <Row className="invoice-details mb-4">
        <Col xs={12} md={6}>
          <h5 className="invoice-subtitle">Billed To:</h5>
          <p className="invoice-text">
            <span style={{ fontWeight: 'bold' }}>Name:</span>{' '}
            {data.userName || 'N/A'}
            <br />
            <span style={{ fontWeight: 'bold' }}>Address:</span>{' '}
            {data.address || 'N/A'}
            <br />
            <span style={{ fontWeight: 'bold' }}>Phone Number:</span>{' '}
            {data.phoneNumber || 'N/A'}
            <br />
            <span style={{ fontWeight: 'bold' }}>Email:</span>{' '}
            {data.email || 'N/A'}
          </p>
        </Col>
        <Col xs={12} md={6}>
          <p className="invoice-text">
            <span style={{ fontWeight: 'bold' }}>Order Id:</span>{' '}
            {data.requestId || 'N/A'}
            <br />
            <span style={{ fontWeight: 'bold' }}>Order Created On:</span>{' '}
            {data.orderCreatedOn ? formatDateTime(data.orderCreatedOn) : 'N/A'}
            <br />
            <span style={{ fontWeight: 'bold' }}>Bill Generated On:</span>{' '}
            {data.createdAt ? formatDateTime(data.createdAt) : 'N/A'}
            <br />
          </p>
        </Col>
      </Row>

      {/* Item Table */}
      <Table className="invoice-table" striped bordered hover responsive>
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
          {data.details?.map((detail, index) => (
            <tr key={detail._id}>
              <td>{index + 1}</td>
              <td>{detail.description}</td>
              <td>{detail.component}</td>
              <td>₹ {detail.labourCharge}</td>
              <td>₹ {detail.serviceCharge}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Invoice Summary */}
      <Row className="invoice-summary-row">
        <Col xs={12} md={{ span: 6, offset: 6 }}>
          <Table className="invoice-summary-table" borderless>
            <tbody>
              <tr>
                <td className="summary-label">Total Labour Charges:</td>
                <td className="summary-value text-end">
                  ₹ {data.labourCharges}
                </td>
              </tr>
              <tr>
                <td className="summary-label">Total Service Charges:</td>
                <td className="summary-value text-end">
                  ₹ {data.serviceCharges}
                </td>
              </tr>
              <tr>
                <td className="summary-label">Total Charges Before GST:</td>
                <td className="summary-value text-end">
                  ₹ {data.totalChargesBeforeGST}
                </td>
              </tr>
              <tr>
                <td className="summary-label">GST:</td>
                <td className="summary-value text-end">₹ {data.GST}</td>
              </tr>
              <tr>
                <td className="summary-label font-weight-bold">To Be Paid:</td>
                <td
                  className="summary-value text-end font-weight-bold"
                  style={{ color: color }}
                >
                  ₹ {data.toBePaid}
                </td>
              </tr>
              <tr>
                <td className="summary-label">Total Amount Paid:</td>
                <td className="summary-value text-end">
                  ₹ {InvoiceData?.totalAmountPaid}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Invoice;
