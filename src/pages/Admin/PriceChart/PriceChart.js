import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  Form,
  Spinner,
} from 'react-bootstrap';
import BasicTable from '../../../components/BasicTable';
import { BsSearch, BsX } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { FaChevronDown, FaChevronUp, FaEdit, FaPlus } from 'react-icons/fa';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { getRole } from '../../../Constants/Global';
import NoAccess from '../../../components/NoAccess';
import FetchLoader from '../../../components/FetchLoader';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import {
  useAddPriceChartMutation,
  useDeletePriceChartMutation,
  useEditPriceChartMutation,
  useGetPriceChartRolesQuery,
  useGetPriceChartsAdminQuery,
} from '../../../redux/api/PriceChartApi';
import Select from 'react-select/creatable';
import ServerError from '../../../components/ServerError';

const PriceCharts = () => {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { id } = useParams();
  const [editId, setEditId] = useState(null);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [addShow, setAddShow] = useState(false);
  const [priceTitle, setPriceTitle] = useState(null);
  const [description, setDescription] = useState('');
  const [labourCharge, setLabourCharge] = useState('');
  const [serviceCharge, setServiceCharge] = useState('');
  const [newFile, setNewFile] = useState(null);
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const role = getRole();
  const [section, setSection] = useState(null);
  const [hasServerError, setHasServerError] = useState(false);
  const [visibleSubtitle, setVisibleSubtitle] = useState(null);
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  const {
    data: PriceChartData,
    refetch,
    isLoading,
    isError, 
    error,
  } = useGetPriceChartsAdminQuery({
    search: searchTerm,
    id: id,
    role: role,
  });

  const [editPriceChartData] = useEditPriceChartMutation();
  const [deletePriceChart] = useDeletePriceChartMutation();
  const [addPriceChart] = useAddPriceChartMutation();

  const { data: priceTitleData } = useGetPriceChartRolesQuery({ role });

  const priceTitleOptions =
    (priceTitleData?.data || []).map((title) => ({
      label: title,
      value: title,
    })) || [];

  useEffect(() => {
    if (PriceChartData && PriceChartData.data) {
      setData(PriceChartData.data);
      setSection(Object.keys(PriceChartData.data));
      setFullAccess(PriceChartData.moduleAccess.fullAccess);
      setWrite(PriceChartData.moduleAccess.write);
      setRead(PriceChartData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [PriceChartData, role,error,isError]);

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
    for (const subtitle in data) {
      const PriceChart = data[subtitle].find((d) => d._id === id);

      if (PriceChart) {
        setEditId(id);
        setPriceTitle({
          label: PriceChart.component,
          value: PriceChart.component,
        });
        setDescription(PriceChart.description);
        setLabourCharge(PriceChart.labourCharge);
        setServiceCharge(PriceChart.serviceCharge);
        setEditShow(true);
        return;
      }
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setPriceTitle('');
    setLabourCharge('');
    setServiceCharge('');
    setDescription('');
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleDeletePriceChart = async () => {
    try {
      const response = await deletePriceChart({ id: idToDelete, role: role });
      setDeleteShow(false);
      setIdToDelete('');
      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditData = async () => {
    if (!priceTitle || !description || !serviceCharge || !labourCharge) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);
    try {
      const response = await editPriceChartData({
        id: editId,
        role: role,
        data: {
          component: priceTitle.value,
          description: description,
          serviceCharge: serviceCharge,
          labourCharge: labourCharge,
        },
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setEditShow(false);
        refetch();
        setPriceTitle('');
        setLabourCharge('');
        setServiceCharge('');
        setDescription('');
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setPriceTitle('');
        setLabourCharge('');
        setServiceCharge('');
        setDescription('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddShow = () => {
    setAddShow(true);
  };

  const handleAddClose = () => {
    setAddShow(false);
    setPriceTitle('');
    setLabourCharge('');
    setServiceCharge('');
    setDescription('');
  };

  const handleAddData = async () => {
    if (!priceTitle || !description || !serviceCharge || !labourCharge) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);
    try {
      const response = await addPriceChart({
        role: role,
        data: {
          component: priceTitle.value,
          description: description,
          serviceCharge: serviceCharge,
          labourCharge: labourCharge,
        },
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setAddShow(false);
        refetch();
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
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
      Header: 'Labour Charge(₹)',
      accessor: 'labourCharge',
    },
    {
      Header: 'Service Charge(₹)',
      accessor: 'serviceCharge',
    },
  ];

  if (fullAccess) {
    COLUMNS.push({
      Header: 'ACTIONS',
      accessor: 'action',
      Cell: (props) => {
        const rowIdx = props.row.original._id;
        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <Button variant="warning" onClick={() => handleEditShow(rowIdx)}>
              <FaEdit />
            </Button>
            <Button
              variant="danger"
              className="ms-2"
              onClick={() => deleteHandleShow(rowIdx)}
            >
              <MdDelete />
            </Button>
          </div>
        );
      },
    });
  }

  const toggleTableVisibility = (section) => {
    setVisibleSubtitle(visibleSubtitle === section ? null : section);
  };

  // Filter data based on selected section
  const getFilteredData = (section) => {
    return data[section] || [];
  };

  return (
    <>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <div>
       {hasServerError ? (
         <ServerError/>
        ) : read ? (
            <Container fluid className="mt-3 ">
              <Row className="boxShadow p-4 mb-4 mt-4">
                <Col className="d-flex flex-row justify-content-between mt-1">
                  <h4 className="fw-bold">Price Chart</h4>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddShow}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline">
                          {' '}
                          Add Price Chart
                        </span>
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
              <Row className="boxShadow p-3 mb-4 d-flex flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row">
                <Col className="my-4 mx-2" xxl={3} xl={3} lg={3} sm={6} md={6}>
                  <div className="input-group">
                    <span className="input-group-text">
                      <BsSearch />
                    </span>
                    <input
                      type="text"
                      placeholder="Search Price Chart..."
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
                  className="d-flex flex-column text-center my-4"
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
                <Col>
                  {section.map((section) => (
                    <div key={section}>
                      <div
                        className="subtitle my-2 mx-3 d-flex justify-content-between align-items-center"
                        onClick={() => toggleTableVisibility(section)}
                        style={{ cursor: 'pointer' }}
                      >
                        <h5>{section}</h5>
                        {visibleSubtitle === section ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                      {visibleSubtitle === section && (
                        <BasicTable
                          COLUMNS={COLUMNS}
                          MOCK_DATA={getFilteredData(section)}
                          isPagination={false}
                          isHeading={false}
                        />
                      )}
                      <hr/>
                    </div>
                  ))}
                </Col>
              </Row>{' '}
              <DeleteModel
                YES={handleDeletePriceChart}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this PriceChart"
                DELETETITLE="PriceChart"
              />
            </Container>
          ) : (
            <NoAccess />
          )}

          <Modal show={editShow} onHide={handleEditClose} centered dialogClassName="all-modal">
            <Modal.Header closeButton>
              <Modal.Title>Edit PriceChart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="deviceNameInput">
                  <Form.Label>
                    {' '}
                    Price Title <span className="text-danger">*</span>
                  </Form.Label>
                  <Select
                    options={priceTitleOptions}
                    value={priceTitle}
                    onChange={setPriceTitle}
                    placeholder="Select or type Price Title"
                  />
                </Form.Group>
                <Form.Group controlId="deviceNameInput">
                  <Form.Label>
                    Description <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the Description here"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="deviceNameInput">
                  <Form.Label>
                    Labour Price <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the Labour Price here"
                    value={labourCharge}
                    onChange={(e) => {
                      setLabourCharge(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="deviceNameInput">
                  <Form.Label>
                    Service Price <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the Service Price here"
                    value={serviceCharge}
                    onChange={(e) => {
                      setServiceCharge(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditClose}>
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: color, border: 'none' }}
                onClick={handleEditData}
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
                    Updating...
                  </>
                ) : (
                  'Update'
                )}
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={addShow} onHide={handleAddClose} centered dialogClassName="all-modal">
            <Modal.Header closeButton>
              <Modal.Title>Add PriceChart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="priceTitle">
                  <Form.Label>
                    Price Title <span className="text-danger">*</span>
                  </Form.Label>
                  <Select
                    options={priceTitleOptions}
                    value={priceTitle}
                    onChange={setPriceTitle}
                    placeholder="Select or type Price Title"
                  />
                </Form.Group>
                <Form.Group controlId="priceDescription">
                  <Form.Label>
                    Description <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the Price Title here"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="labourcharge">
                  <Form.Label>
                    Labour Charge <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the Labour Charge here"
                    onChange={(e) => {
                      setLabourCharge(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="servicecharge">
                  <Form.Label>
                    Service Charge <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the Service Charge here"
                    onChange={(e) => {
                      setServiceCharge(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleAddClose}>
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: color, border: 'none' }}
                onClick={handleAddData}
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
                    Add...
                  </>
                ) : (
                  'Add'
                )}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};

export default PriceCharts;
