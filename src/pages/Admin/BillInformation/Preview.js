import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap';
import BasicTable from '../../../components/TableComponent';
import {
  useCalculateChargesMutation,
} from '../../../redux/api/BillInformationApi';
import { BsSearch, BsX } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import { toast } from 'react-toastify';
import { useTheme } from '../../../Contexts/ThemeContext';
import { FaArrowRight, FaCalculator, FaEdit } from 'react-icons/fa';
import {useParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useGetPreviewQuery } from '../../../redux/api/PreviewApi';


const BillInformation = () => {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [billSummary, setBillSummary] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [billId, setBillId] = useState('');
  const [editId, setEditId] = useState(null);
  const [calculateCharge, setCalculateCharge] = useState('');
  const [chargesCalculated, setChargesCalculated] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editDescription, setEditDescription] = useState('');
  const [editComponent, setEditComponent] = useState('');
  const [editLabourCharge, setEditLabourCharge] = useState('');
  const [editServiceCharge, setEditServiceCharge] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  const { requestId } = useParams();
  const role = getRole();

  const {
    data: PreviewData,
    isLoading,
    refetch,
  } = useGetPreviewQuery({
    search: searchTerm,
    requestId: requestId,
    role: role,
  });

  const [CalculateCharges] = useCalculateChargesMutation();


  useEffect(() => {
    if (PreviewData && PreviewData.data) {
      setData(PreviewData.data.details);
      setBillSummary(PreviewData.data.userDetails);
      setBillId(PreviewData.data.billId);

    }
  }, [PreviewData, role]);

  const handleClear = () => {
    setSearchInput('');
    setSearchTerm('');
  };

  const handleSearch = () => {
    setIsSearching(true);
    setSearchTerm(searchInput);
    refetch({ search: searchInput }).then(() => {
      setIsSearching(false);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  


  const handleEditShow = (id) => {
    const editPreview = PreviewData.data.details.find((d) => d._id === id);

    if (editPreview) {
      setEditId(id);
      setEditDescription(editPreview.description);
      setEditComponent(editPreview.component);
      setEditLabourCharge(editPreview.serviceCharge);
      setEditServiceCharge(editPreview.labourCharge);
      setShowEditModal(true);
    }
  };

  const ShowEditModal = () => {
    setShowEditModal(false);
    setEditId(null);
    setEditDescription('');
    setEditComponent('');
    setEditLabourCharge('');
    setEditServiceCharge('');
  };

  const handleCalculateCharges = async () => {
    setLoading(true);
    try {
      const response = await CalculateCharges({
        id: billId,
        role: role,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setChargesCalculated(true);
        setCalculateCharge(response.data.message);
        refetch();
      } else {
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: (d, i) => i + 1,
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Component',
      accessor: 'component',
    },
    {
      Header: 'Labour Charger',
      accessor: 'labourCharge',
    },
    {
      Header: 'Service Charge',
      accessor: 'serviceCharge',
    },

    {
      Header: 'ACTIONS',
      accessor: 'action',
      Cell: (props) => {
        const rowIdx = props.row.original._id;
        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
 <Button variant="warning" onClick={() => handleEditShow(rowIdx)}>
              <FaEdit />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <>
          <Container fluid className="mt-3 reduced-width-row">
            <Row className="boxShadow p-4 mb-4">
              <Col className="d-flex flex-row justify-content-between mt-1">
                <Col className="d-flex justify-content-start mb-3 mt-3">
                  <h4 className="mx-3">
                    <AiOutlineArrowLeft />
                  </h4>
                  <h4 className="fw-bold">Preview</h4>
                </Col>
              </Col>
            </Row>

            <Row className="boxShadow p-4 mb-3 d-flex flex-row">
              <Col className="my-2 mx-2" xxl={3} xl={3} lg={3} sm={6} md={6}>
                <div className="input-group">
                  <span className="input-group-text">
                    <BsSearch />
                  </span>
                  <input
                    type="text"
                    placeholder="Search Preview..."
                    className="form-control"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  {searchInput && (
                    <span className="input-group-text" onClick={handleClear}>
                      <BsX />
                    </span>
                  )}
                </div>
              </Col>
              <Col
                className="d-flex flex-column text-center my-2"
                xxl={2}
                xl={2}
                lg={2}
                sm={3}
                md={3}
              >
                <Button
                  style={{ backgroundColor: color, border: 'none' }}
                  onClick={handleSearch}
                  disabled={isSearching || searchInput === ''}
                >
                  {isSearching ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Searching...
                    </>
                  ) : (
                    'Search'
                  )}
                </Button>
              </Col>
            </Row>

            <Row className="boxShadow p-4 mb-4">
              <BasicTable COLUMNS={COLUMNS} MOCK_DATA={data} />

              {chargesCalculated && (
                <Col className="text-end mt-3">
                  <Button
                    style={{ backgroundColor: color }}
                    onClick={handlePreview}
                  >
                    Preview <FaArrowRight size={20} />
                  </Button>
                </Col>
              )}
            </Row>

            <Row className="boxShadow p-4 mb-4 mt-3">
              <h4 className="fw-bold text-center mb-3">Bill Summary</h4>

              <Col className='text-center'>
                <p>
                  <strong>Total Labour Charges:</strong>{' '}
                  {calculateCharge.labour}
                </p>
                <p>
                  <strong>Total Service Charges:</strong>{' '}
                  {calculateCharge.service}
                </p>
                <p>
                  <strong>Total Charges:</strong> {calculateCharge.totalCharges}
                </p>
                <p
                  style={{
                    fontSize: '28px',
                    color: '#1758ad',
                    fontWeight: 'bold',
                  }}
                >
                  <strong>To Be Paid:</strong> {calculateCharge.toBePaid}
                </p>

                {!chargesCalculated && (
                  <p className="mt-5">
                    <Button
                      style={{ backgroundColor: color }}
                      onClick={handleCalculateCharges}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Calculate Charge...
                        </>
                      ) : (
                        'Calculate Charge'
                      )}
                      <FaCalculator size={20} style={{ marginLeft: '8px' }} />
                    </Button>
                  </p>
                )}
              </Col>
            </Row>
          </Container>


          <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    type="text"
                    value={editDescription}
                    onChange={(e) =>
                      setEditDescription(e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formComponent"className='mt-2'>
                  <Form.Label>Component:</Form.Label>
                  <Form.Control
                    type="text"
                    value={editComponent}
                    onChange={(e) =>
                      setEditComponent(e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formLabourCharge"className='mt-2'>
                  <Form.Label>Labour Charge:</Form.Label>
                  <Form.Control
                    type="number"
                    value={editLabourCharge}
                    onChange={(e) =>
                      setEditLabourCharge(e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formServiceCharge"className='mt-2'>
                  <Form.Label>Service Charge:</Form.Label>
                  <Form.Control
                    type="number"
                    value={editServiceCharge}
                    onChange={(e) =>
                      setEditServiceCharge(e.target.value)
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={ShowEditModal}>
                Close
              </Button>
              <Button style={{backgroundColor:color}} onClick={""}>
              Update
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

    </div>
  );
};

export default BillInformation;
