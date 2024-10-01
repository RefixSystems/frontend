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
import BasicTable from '../../../../components/TablePaginationComponent';
import { BsSearch, BsX } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { FaEdit, FaPlus } from 'react-icons/fa';
import DeleteModel from '../../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import {
  useAddPriceComparisonMutation,
  useDeletePriceComparisonMutation,
  useEditPriceComparisonMutation,
  useGetPriceComparisonQuery,
} from '../../../../redux/api/AdminPriceComparisonApi';
import { getRole } from '../../../../Constants/Global';
import FetchLoader from '../../../../components/FetchLoader';
import NoAccess from '../../../../components/NoAccess';
import { useTheme } from '../../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

const PriceComparison = () => {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { id } = useParams();
  const [editId, setEditId] = useState(null);
  const [editShow, setEditShow] = useState(false);
  const [editDevice, setEditDevice] = useState('');
  const [file, setFile] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [addShow, setAddShow] = useState(false);
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const role = getRole();
  const [featureName, setFeatureName] = useState('');
  const [serviceCenter, setServiceCenter] = useState('');
  const [localShop, setLocalShop] = useState('');
  const [ourServices, setOurServices] = useState('');
  const [editFeatureName, setEditFeatureName] = useState('');
  const [editServiceCenter, setEditServiceCenter] = useState('');
  const [editLocalShop, setEditLocalShop] = useState('');
  const [editOurServices, setEditOurServices] = useState('');

  const {
    data: PriceComparisonData,
    refetch,
    isLoading,
  } = useGetPriceComparisonQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    role: role,
  });

  const [editPriceComparisonData] = useEditPriceComparisonMutation();
  const [deletePriceComparison] = useDeletePriceComparisonMutation();
  const [addPriceComparison] = useAddPriceComparisonMutation();
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  useEffect(() => {
    if (PriceComparisonData && PriceComparisonData.data) {
      setData(PriceComparisonData.data);
      setStartIndex(PriceComparisonData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(PriceComparisonData.pagination.totalItems);
      setEndIndex(PriceComparisonData.pagination.endIndex);
      setTotalPages(PriceComparisonData.pagination.totalPages);
      setFullAccess(PriceComparisonData.moduleAccess.fullAccess);
      setWrite(PriceComparisonData.moduleAccess.write);
      setRead(PriceComparisonData.moduleAccess.read);
    }
  }, [PriceComparisonData, currentPage, role]);

  const handleClear = () => {
    setSearchInput('');
    setSearchTerm('');
  };

  const handleSearch = () => {
    setIsSearching(true);
    setSearchTerm(searchInput);
    refetch({ page: currentPage, search: searchInput }).then(() => {
      setIsSearching(false);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleEditShow = (id) => {
    const PriceComparison = data.find((d) => d._id === id);

    if (PriceComparison) {
      setEditId(id);
      setEditFeatureName(PriceComparison.nameOfFeature);
      setEditServiceCenter(PriceComparison.serviceCenter);
      setEditLocalShop(PriceComparison.localShop);
      setEditOurServices(PriceComparison.ourServices);

      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setEditDevice('');
    setFile(null);
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleFeatureChange = (e) => setFeatureName(e.target.value);

  const handleServiceCenterChange = (value) => {
    setServiceCenter(value === '' ? '' : value === 'true');
  };

  const handleLocalShopChange = (value) => {
    setLocalShop(value === '' ? '' : value === 'true');
  };

  const handleOurServicesChange = (value) => {
    setOurServices(value === '' ? '' : value === 'true');
  };

  const handleEditFeatureChange = (e) => setEditFeatureName(e.target.value);

  const handleEditServiceCenterChange = (value) => {
    setEditServiceCenter(value === '' ? '' : value === 'true');
  };

  const handleEditLocalShopChange = (value) => {
    setEditLocalShop(value === '' ? '' : value === 'true');
  };

  const handleEditOurServicesChange = (value) => {
    setEditOurServices(value === '' ? '' : value === 'true');
  };

  const handleDeletePriceComparison = async () => {
    try {
      const response = await deletePriceComparison({
        id: idToDelete,
        role: role,
      });
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

    if (!editFeatureName || editServiceCenter === null || editLocalShop === null || editOurServices === null) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }
    

    setLoading(true);

    try {
      const data = {
        nameOfFeature: editFeatureName,
        serviceCenter: editServiceCenter,
        localShop: editLocalShop,
        ourServices: editOurServices,
      };

      const response = await editPriceComparisonData({
        id: editId,
        role: role,
        data: data,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setEditShow(false);
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

  const handleAddShow = () => {
    setAddShow(true);
  };

  const handleAddClose = () => {
    setAddShow(false);
    setFeatureName('');
    setServiceCenter('');
    setLocalShop('');
    setOurServices('');
  };

  const handleAddData = async () => {
    if (
      !featureName ||
      serviceCenter === undefined ||
      localShop === undefined ||
      ourServices === undefined
    ) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);

    try {
      const data = {
        nameOfFeature: featureName,
        serviceCenter: serviceCenter,
        localShop: localShop,
        ourServices: ourServices,
      };

      const response = await addPriceComparison({
        role: role,
        data: data,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setAddShow(false);
        refetch();
        setFeatureName('');
        setServiceCenter('');
        setLocalShop('');
        setOurServices('');
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setFeatureName('');
        setServiceCenter('');
        setLocalShop('');
        setOurServices('');
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
      accessor: 's_no',
    },
    {
      Header: 'Name Of Feature',
      accessor: 'nameOfFeature',
    },
    {
      Header: 'Service Center',
      accessor: 'serviceCenter',
      Cell: ({ cell }) => {
        const serviceCenterValue = cell.row.original.serviceCenter;
        return serviceCenterValue ? (
          <FaCheck style={{ color: 'green' }} />
        ) : (
          <ImCross style={{ color: 'red' }} />
        );
      },
    },

    {
      Header: 'Local Shop',
      accessor: 'localShop',
      Cell: ({ cell }) => {
        const localShopValue = cell.row.original.localShop;
        return localShopValue === true ? (
          <FaCheck color={'green'} />
        ) : (
          <ImCross color={'red'} />
        );
      },
    },

    {
      Header: 'Our Services',
      accessor: 'ourServices',
      Cell: ({ cell }) => {
        const ourServicesValue = cell.row.original.ourServices;
        return ourServicesValue === true ? (
          <FaCheck style={{ color: 'green' }} />
        ) : (
          <ImCross style={{ color: 'red' }} />
        );
      },
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ value }) => formatDateTime(value),
    },
    {
      Header: 'Updated At',
      accessor: 'updatedAt',
      Cell: ({ value }) => formatDateTime(value),
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

  return (
    <div>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <>
          {read ? (
            <Container fluid className="mt-3 ">
              <Row className="boxShadow p-4 mb-4 mt-4">
                <Col className="d-flex flex-row justify-content-between mt-1">
                  <h4 className="fw-bold">Price Comparison</h4>
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
                          Add Price Comparison
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
                      placeholder="Search Price Comparison..."
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
                <BasicTable
                  COLUMNS={COLUMNS}
                  MOCK_DATA={data}
                  currentPage={currentPage}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  setCurrentPage={setCurrentPage}
                  totalItems={totalItems}
                  totalPages={totalPages}
                />
              </Row>

              <DeleteModel
                YES={handleDeletePriceComparison}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this PriceComparison"
                DELETETITLE="PriceComparison"
              />
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}

      <Modal show={editShow} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Price Comparison</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nameOfFeatureInput">
              <Form.Label>
                Name Of Feature <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={editFeatureName}
                onChange={handleEditFeatureChange}
                placeholder="Enter the feature name here"
              />
            </Form.Group>

            <Form.Group controlId="serviceCenterDropdown">
              <Form.Label>
                Service Center <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={editServiceCenter}
                onChange={(e) => handleEditServiceCenterChange(e.target.value)}
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="localShopDropdown">
              <Form.Label>
                Local Shop <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={editLocalShop}
                onChange={(e) => handleEditLocalShopChange(e.target.value)}
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="ourServicesDropdown">
              <Form.Label>
                Our Services <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={editOurServices}
                onChange={(e) => handleEditOurServicesChange(e.target.value)}
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
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

      <Modal show={addShow} onHide={handleAddClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Price Comparison</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="featureName">
              <Form.Label>
                Name Of Feature <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the feature name here"
                value={featureName}
                onChange={handleFeatureChange}
              />
            </Form.Group>
            <Form.Group controlId="serviceCenter">
              <Form.Label>
                Service Center <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={serviceCenter}
                onChange={(e) => handleServiceCenterChange(e.target.value)}
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="localShop">
              <Form.Label>
                Local Shop <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={localShop}
                onChange={(e) => handleLocalShopChange(e.target.value)}
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="ourServices">
              <Form.Label>
                Our Services <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                value={ourServices}
                onChange={(e) => handleOurServicesChange(e.target.value)}
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
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
  );
};

export default PriceComparison;
