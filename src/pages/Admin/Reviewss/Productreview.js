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
import BasicTable from '../../../components/TablePaginationComponent';
import {
  useDeleteProductreviewMutation,
  useEditProductreviewMutation,
  useGetProductreviewQuery,
} from '../../../redux/api/ProductreviewApi';
import { BsSearch, BsX } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete, MdInsertPhoto } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { HiMiniUserCircle } from 'react-icons/hi2';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import ServerError from '../../../components/ServerError';
import { getPhoneNumber } from '../../../Constants/PhoneNumberGlobal';
const Productreview = () => {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItem] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { id } = useParams();
  const [editId, setEditId] = useState(null);
  const [editShow, setEditShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [fullAccess, setFullAccess] = useState(false);
  const [read, setRead] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [hasServerError, setHasServerError] = useState(false);
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  const role = getRole();
  
  const phoneNumber= getPhoneNumber();

  const {
    data: ProductreviewData,
    refetch,
    isLoading,
    isError, 
    error,
  } = useGetProductreviewQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    role: role,
    phoneNumber:phoneNumber,
  });
  const [editProductreviewData] = useEditProductreviewMutation();
  const [deleteProductreview] = useDeleteProductreviewMutation();

  useEffect(() => {
    if (ProductreviewData && ProductreviewData.data) {
      setData(ProductreviewData.data);
      setStartIndex(ProductreviewData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItem(ProductreviewData.pagination.totalItems);
      setEndIndex(ProductreviewData.pagination.endIndex);
      setTotalPages(ProductreviewData.pagination.totalPages);
      setFullAccess(ProductreviewData.moduleAccess.fullAccess);
      setRead(ProductreviewData.moduleAccess.read);
      setCount(ProductreviewData.productReviewCount);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [ProductreviewData, currentPage, role,error,isError]);

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
    const ReviewsData = data.find((d) => d._id === id);

    if (ReviewsData) {
      setEditId(id);
      setSelectedOption(ReviewsData.status);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setSelectedOption('');
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDeleteProductreview = async () => {
    try {
      const response = await deleteProductreview({
        id: idToDelete,
        role: role,
      });
      setDeleteShow(false);
      setIdToDelete('');
      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        refetch();
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditData = async () => {
    if (!selectedOption) {
      toast.error('Please fill the fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);
    try {
      const response = await editProductreviewData({
        id: editId,
        role: role,
        data: {
          status: selectedOption,
        },
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        handleEditClose();
        refetch();
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
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
      Header: 'Profile Image',
      accessor: 'profileImage',
      Cell: (props) => {
        const imageUrl = props.value;
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '100%',
            }}
          />
        ) : (
          <HiMiniUserCircle size={50} />
        );
      },
    },
    {
      Header: 'Media',
      accessor: 'images',
      Cell: (props) => {
        const mediaArray = props.value;
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              overflowX: 'auto',
            }}
          >
            {Array.isArray(mediaArray) && mediaArray.length > 0 ? (
              mediaArray.map((mediaUrl, index) => {
                const isVideo = mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.avi') || mediaUrl.endsWith('.mov') || mediaUrl.endsWith('.mkv');
                return isVideo ? (
                  <video
                    key={index}
                    width={50}
                    height={50}
                    controls
                    style={{
                      marginRight: '5px',
                      objectFit: 'cover',
                    }}
                  >
                    <source src={mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    key={index}
                    src={mediaUrl}
                    alt={`Media ${index}`}
                    style={{
                      width: '50px',
                      height: '50px',
                      marginRight: '5px',
                      objectFit: 'cover',
                    }}
                  />
                );
              })
            ) : (
              <MdInsertPhoto size={50} />
            )}
          </div>
        );
      },
    },
    
    {
      Header: 'User Name',
      accessor: 'userName',
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber',
    },
    {
      Header: 'Product Id',
      accessor: 'productId',
    },

    {
      Header: 'Product Type',
      accessor: 'productType',
    },
    {
      Header: 'Review',
      accessor: 'review',
    },
    {
      Header: 'Rating',
      accessor: 'rating',
    },
    {
      Header: 'Status',
      accessor: 'status',
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
        {hasServerError ? (
         <ServerError/>
        ) : read ? (
            <Container fluid className="mt-3 ">
              <Row className="boxShadow p-4 mb-4 mt-4">
                <Col className="d-flex flex-row justify-content-between mt-1">
                  <h4 className="fw-bold">Product Review</h4>
                </Col>
              </Row>
              <Row className="boxShadow p-3 mb-4  d-flex  flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row">
                <Col className="my-4 mx-2" xxl={3} xl={3} lg={3} sm={6} md={6}>
                  <div className="input-group">
                    <span className="input-group-text">
                      <BsSearch />
                    </span>
                    <input
                      type="text"
                      placeholder="Search Productreview..."
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
                  count={count}
                />
              </Row>

              <DeleteModel
                YES={handleDeleteProductreview}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure you want to delete this Review"
                DELETETITLE="Review"
              />
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}

      <Modal show={editShow} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={selectedOption}
                onChange={handleDropdownChange}
                placeholder="Enter the status here"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
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
    </div>
  );
};

export default Productreview;
