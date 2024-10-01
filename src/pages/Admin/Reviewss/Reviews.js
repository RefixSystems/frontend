import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Modal,
  Form,
  Spinner,
  InputGroup,
} from 'react-bootstrap';
import BasicTable from '../../../components/TablePaginationComponent';
import {
  useDeleteReviewsMutation,
  useEditReviewsMutation,
  useGetReviewsQuery,
  useAddReviewMutation,
} from '../../../redux/api/ReviewsApi';
import { BsSearch, BsX } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { FaEdit, FaPlus } from 'react-icons/fa';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete, MdInsertPhoto } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { HiMiniUserCircle } from 'react-icons/hi2';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import ImageVideoDragUpload from '../../../components/ImageVideoDragUpload';
import InputImageAndVideo from '../../../components/InputImageAndVideo';
import ServerError from '../../../components/ServerError';
import { getPhoneNumber } from '../../../Constants/PhoneNumberGlobal';

const Reviews = () => {
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
  const [showInHomePage, setShowInHomePage] = useState('');
  const [deleteShow, setDeleteShow] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  const role = getRole();
  const PhoneNumberGlobal = getPhoneNumber();

  const {
    data: ReviewsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetReviewsQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    role: role,
    phoneNumber: PhoneNumberGlobal,
  });
  const [editReviewsData] = useEditReviewsMutation();
  const [deleteReviews] = useDeleteReviewsMutation();
  const [addReview] = useAddReviewMutation();
  const [addShow, setAddShow] = useState(false);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [errors, setErrors] = useState({});
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (ReviewsData && ReviewsData.data) {
      setData(ReviewsData.data);
      setStartIndex(ReviewsData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItem(ReviewsData.pagination.totalItems);
      setEndIndex(ReviewsData.pagination.endIndex);
      setTotalPages(ReviewsData.pagination.totalPages);
      setFullAccess(ReviewsData.moduleAccess.fullAccess);
      setWrite(ReviewsData.moduleAccess.write);
      setRead(ReviewsData.moduleAccess.read);
      setCount(ReviewsData.generalReviewCount);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [ReviewsData, currentPage, role, error, isError]);

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
      setShowInHomePage(ReviewsData.showInHomePage);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setSelectedOption('');
    setShowInHomePage('');
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
  const handleShowInHomePageDropdownChange = (e) => {
    setShowInHomePage(e.target.value);
  };

  const handleImage1Change = (file) => {
    setImage1(file);
  };
  const handleImage2Change = (file) => {
    setImage2(file);
  };
  const handleImage3Change = (file) => {
    setImage3(file);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleDeleteReviews = async () => {
    try {
      const response = await deleteReviews({ id: idToDelete, role: role });
      if (response?.data) {
        setDeleteShow(false);
        setIdToDelete('');
        refetch();
        toast.success(response?.data?.message, { autoClose: 1000 });
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditData = async () => {
    if (!selectedOption || !showInHomePage) {
      toast.error('Please fill  the fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);
    try {
      const response = await editReviewsData({
        id: editId,
        role: role,
        data: {
          status: selectedOption,
          showInHomePage: showInHomePage,
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

  const handleAddShow = () => {
    setAddShow(true);
  };

  const handleAddClose = () => {
    setAddShow(false);
    setUserName('');
    setPhoneNumber('');
    setRating('');
    setReview('');
  };

  const handleAddReview = async () => {
    if (!userName || !phoneNumber || !rating || !review) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    if (phoneNumber.length !== 10) {
      toast.error('Phone number must be exactly 10 digits', {
        autoClose: 1000,
      });
      return;
    }
    if (review.length < 100) {
      toast.error('Review must be at least 100 characters', {
        autoClose: 1000,
      });
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('userName', userName);
      formData.append('phoneNumber', phoneNumber);
      formData.append('rating', rating);
      formData.append('review', review);
      formData.append('images', image1);
      formData.append('images', image2);
      formData.append('images', image3);

      const response = await addReview({
        role: role,
        data: formData,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        handleAddClose();
        refetch();
        setUserName('');
        setPhoneNumber('');
        setRating('');
        setReview('');
        setImage1('');
        setImage2('');
        setImage3('');
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
        setUserName('');
        setPhoneNumber('');
        setRating('');
        setReview('');
        setImage1('');
        setImage2('');
        setImage3('');
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
                const isVideo =
                  mediaUrl.endsWith('.mp4') ||
                  mediaUrl.endsWith('.avi') ||
                  mediaUrl.endsWith('.mov') ||
                  mediaUrl.endsWith('.mkv');
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
      Header: 'Rating',
      accessor: 'rating',
    },
    {
      Header: 'Review',
      accessor: 'review',
    },
    {
      Header: 'Show In HomePage',
      accessor: 'showInHomePage',
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
            <ServerError />
          ) : read ? (
            <Container fluid className="mt-3 ">
              <Row className="boxShadow p-4 mb-4 mt-4">
                <Col className="d-flex flex-row justify-content-between mt-1">
                  <h4 className="fw-bold">General Reviews</h4>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddShow}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline"> Add Review</span>
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
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
                      placeholder="Search Reviews..."
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
                YES={handleDeleteReviews}
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
              <Form.Label>Status </Form.Label>
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

            <Form.Group controlId="exampleForm.ControlSelect1" className="mt-3">
              <Form.Label> ShowIn Home Page </Form.Label>
              <Form.Select
                value={showInHomePage}
                onChange={handleShowInHomePageDropdownChange}
                placeholder="Enter the showInHomePage here"
              >
                <option value="">Select a option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
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

      <Modal
        show={addShow}
        onHide={handleAddClose}
        centered
        dialogClassName="review-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                User Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the user name here"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                isInvalid={!!errors.userName}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Phone Number <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>+91</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter the phone number here"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => {
                    const input = e.target.value;
                    const numericInput = input
                      .replace(/[^0-9]/g, '')
                      .slice(0, 10);
                    setPhoneNumber(numericInput);
                  }}
                  isInvalid={!!errors.phoneNumber}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Rating
                ratingValue={rating}
                onClick={handleRating}
                size={30}
                stars={5}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Review <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="review"
                placeholder="Enter the review here"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                isInvalid={!!errors.review}
              />
            </Form.Group>
            <ImageVideoDragUpload
              labelText="Image1"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
                'video/*': ['.mp4', '.avi', '.mov', '.mkv'],
              }}
              handleFileChange={(file) => {
                handleImage1Change(file);
              }}
            />
            <div>
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp, .mp4,
                .avi, .mov, .mkv
              </small>
            </div>
            <div>
              <small className="">Dimensions should be 1:1 </small>
            </div>
            <InputImageAndVideo image={image1} valueImage={image1} />
            <ImageVideoDragUpload
              labelText="Image2"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
                'video/*': ['.mp4', '.avi', '.mov', '.mkv'],
              }}
              handleFileChange={(file) => {
                handleImage2Change(file);
              }}
            />
            <div>
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp, .mp4,
                .avi, .mov, .mkv
              </small>
            </div>
            <div>
              <small className="">Dimensions should be 1:1 </small>
            </div>
            <InputImageAndVideo image={image2} valueImage={image2} />
            <ImageVideoDragUpload
              labelText="Image3"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
                'video/*': ['.mp4', '.avi', '.mov', '.mkv'],
              }}
              handleFileChange={(file) => {
                handleImage3Change(file);
              }}
            />
            <div>
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp, .mp4,
                .avi, .mov, .mkv
              </small>
            </div>
            <div>
              <small className="">Dimensions should be 1:1 </small>
            </div>
            <InputImageAndVideo image={image3} valueImage={image3} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAddReview}
            style={{ backgroundColor: color, border: 'none' }}
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
                Add Review...
              </>
            ) : (
              'Add Review'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Reviews;
