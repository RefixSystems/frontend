import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap';
import BasicTable from '../../../components/TablePaginationComponent';
import { BsSearch, BsX } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { FaEdit, FaFileDownload, FaPlus } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete, MdOutlineFileUpload } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useAddImportRefurbishedMutation,
  useDeleteRefurbishedMutation,
  useGetRefurbishedQuery,
} from '../../../redux/api/RefurbishedApi';
import { useAddReviewMutation } from '../../../redux/api/ProductreviewApi';
import { Rating } from 'react-simple-star-rating';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import ImageVideoDragUpload from '../../../components/ImageVideoDragUpload';
import InputImageAndVideo from '../../../components/InputImageAndVideo';
import { IoBagAddSharp } from 'react-icons/io5';
import { useAddRentalOrderMutation } from '../../../redux/api/RentalApi';
import sampleExcel from '../../../assests/excel/refurbished.xlsx';
import ServerError from '../../../components/ServerError';

const Refurbished = () => {
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
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  // States for Add Review modal
  const [addShow, setAddShow] = useState(false);
  const [reviewRefurbishedId, setReviewRefurbishedId] = useState(null);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [importShow, setImportShow] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [show, setShow] = useState(false);
  const [userNameOrder, setUserNameOrder] = useState('');
  const [phoneNumberOrder, setPhoneNumberOrder] = useState('');
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [laptopId, setLaptopId] = useState('');
  const [orderType, setOrderType] = useState('');
  const [hasServerError, setHasServerError] = useState(false);

  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  const role = getRole();
  const {
    data: RefurbishedData,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetRefurbishedQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    role: role,
  });
  const [deleteRefurbished] = useDeleteRefurbishedMutation();
  const [addReview] = useAddReviewMutation();
  const [addOrder] = useAddRentalOrderMutation();
  const [addRefurbishedImport] = useAddImportRefurbishedMutation();

  useEffect(() => {
    if (RefurbishedData && RefurbishedData.data) {
      setData(RefurbishedData.data);
      setStartIndex(RefurbishedData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(RefurbishedData.pagination.totalItems);
      setEndIndex(RefurbishedData.pagination.endIndex);
      setTotalPages(RefurbishedData.pagination.totalPages);
      setFullAccess(RefurbishedData.moduleAccess.fullAccess);
      setWrite(RefurbishedData.moduleAccess.write);
      setRead(RefurbishedData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [RefurbishedData, currentPage, role, error, isError]);

  const navigate = useNavigate();
  const handleAddRefurbished = () => {
    navigate('/admin/add-refurbished');
  };

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

  const handleImage1Change = (file) => {
    setImage1(file);
  };
  const handleImage2Change = (file) => {
    setImage2(file);
  };
  const handleImage3Change = (file) => {
    setImage3(file);
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleDeleteRefurbished = async () => {
    try {
      const response = await deleteRefurbished({ id: idToDelete, role: role });
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

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleAddShow = (RefurbishedId, type) => {
    setReviewRefurbishedId(RefurbishedId);
    setType(type);
    setAddShow(true);
  };

  const handleAddClose = () => {
    setAddShow(false);
    setUserName('');
    setPhoneNumber('');
    setRating('');
    setReview('');
    setImage1('');
    setImage2('');
    setImage3('');
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
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('productType', type);
      formData.append('productId', reviewRefurbishedId);
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
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /*order model functions*/

  const handleShow = (laptopId, type) => {
    setLaptopId(laptopId);
    setOrderType(type);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setUserNameOrder('');
    setPhoneNumberOrder('');
    setAlternatePhoneNumber('');
    setAddress('');
  };

  const handleAddRentalOrder = async () => {
    event.preventDefault();
    if (!userNameOrder || !phoneNumberOrder || !address) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    if (phoneNumberOrder.length !== 10) {
      toast.error('Phone number must be exactly 10 digits', {
        autoClose: 1000,
      });
      return;
    }

    setLoading(true);
    try {
      const data = {
        type: orderType,
        laptopId: laptopId,
        userName: userNameOrder,
        phoneNumber: phoneNumberOrder,
        alternatePhoneNumber: alternatePhoneNumber,
        address: address,
      };

      const response = await addOrder({
        role: role,
        data: data,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setShow();
        setUserNameOrder('');
        setPhoneNumberOrder('');
        setAlternatePhoneNumber('');
        setAddress('');
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
        setUserNameOrder('');
        setPhoneNumberOrder('');
        setAlternatePhoneNumber('');
        setAddress('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    fetch(sampleExcel)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'refurbished.xlsx';
        link.click();
      })
      .catch((error) => console.error('Error downloading the file:', error));
  };

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: 's_no',
    },
    {
      Header: 'Image',
      accessor: 'images',
      Cell: (props) => {
        const imageArray = props.value;
        const imageUrl =
          Array.isArray(imageArray) && imageArray.length > 0
            ? imageArray[0]
            : null;

        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            style={{
              width: '50px',
              height: '50px',
            }}
          />
        ) : (
          <HiUserCircle size={50} />
        );
      },
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: 'Brand',
      accessor: 'brand',
    },
    {
      Header: 'Model',
      accessor: 'model',
    },
    {
      Header: 'Processor',
      accessor: 'processor',
    },
    {
      Header: 'Ram',
      accessor: 'ram',
    },
    {
      Header: 'Screen Size',
      accessor: 'screenSize',
    },
    {
      Header: 'Storage',
      accessor: 'storage',
    },
    {
      Header: 'Color',
      accessor: 'color',
    },
    {
      Header: 'Operating System',
      accessor: 'operatingSystem',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Add In Carousel',
      accessor: 'addInCarousel',
      Cell: ({ value }) => (value ? 'Yes' : 'No'),
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
        const type = props.row.original.type;
        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <Button
              variant=""
              style={{ backgroundColor: color, color: 'white' }}
              onClick={() => handleAddShow(rowIdx, type)}
            >
              <RiPencilFill />
            </Button>
            <Link to={`/admin/edit-Refurbished/${rowIdx}`}>
              <Button variant="warning" className="ms-2">
                <FaEdit />
              </Button>
            </Link>
            <Button
              variant="danger"
              className="ms-2"
              onClick={() => deleteHandleShow(rowIdx)}
            >
              <MdDelete />
            </Button>

            <Button
              style={{ backgroundColor: color }}
              className="ms-2"
              onClick={() => handleShow(rowIdx, type)}
            >
              <IoBagAddSharp />
            </Button>
          </div>
        );
      },
    });
  }

  const handleImportShow = () => {
    setImportShow(true);
  };

  const handleImportClose = () => {
    setImportShow(false);
    setExcelFile(null);
  };

  const handleFileChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const handleImportSubmit = async () => {
    setLoading(true);

    if (!excelFile) {
      toast.error('Please select an Excel file to upload', { autoClose: 1000 });
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', excelFile);

    try {
      const response = await addRefurbishedImport({
        role: role,
        data: formData,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        handleImportClose();
        refetch();
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload the Excel file', { autoClose: 1000 });
    } finally {
      setLoading(false);
    }
  };

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
                  <h4 className="fw-bold">Refurbished</h4>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-2"
                        onClick={handleDownload}
                      >
                        <FaFileDownload size={23} />
                        <span className="d-none d-md-inline"> Downlaod</span>
                      </Button>

                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        onClick={handleImportShow}
                        className="p-2 m-2"
                      >
                        <MdOutlineFileUpload size={23} />
                        <span className="d-none d-md-inline">
                          Import Refurbished
                        </span>
                      </Button>

                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddRefurbished}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline">
                          {' '}
                          Add Refurbished
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
                      placeholder="Search Refurbished..."
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
                YES={handleDeleteRefurbished}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this Refurbished"
                DELETETITLE="Refurbished"
              />
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}

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
            <Form.Group controlId="formUserName">
              <Form.Label>
                User Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the user name here"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                isInvalid={!!errors.userName}
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber" className="mt-3 mb-3">
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
              <Form.Label>
                Rating <span className="text-danger">*</span>
              </Form.Label>
              <Rating
                ratingValue={rating}
                onClick={handleRating}
                size={30}
                stars={5}
              />
            </Form.Group>
            <Form.Group controlId="formReview" className="mt-3">
              <Form.Label>
                Review <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={review}
                placeholder="Enter the review here"
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
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleAddReview}
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

      {/* Import Excel Modal */}
      <Modal show={importShow} onHide={handleImportClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Import Excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile">
              <Form.Label>
                Upload Excel File <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="mt-3"
            onClick={handleImportClose}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleImportSubmit}
            className="mt-3"
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
                Submit...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* order model */}

      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="review-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Rental Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUserName" className="mb-3">
              <Form.Label>
                User Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={userNameOrder}
                onChange={(e) => setUserNameOrder(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber" className="mb-3">
              <Form.Label>
                Phone Number <span className="text-danger">*</span>
              </Form.Label>

              <InputGroup>
                <InputGroup.Text>+91</InputGroup.Text>
                <Form.Control
                  type="tel"
                  value={phoneNumberOrder}
                  onChange={(e) => {
                    const input = e.target.value;
                    const numericInput = input
                      .replace(/[^0-9]/g, '')
                      .slice(0, 10);
                    setPhoneNumberOrder(numericInput);
                  }}
                  placeholder="Enter phone number"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formAlternatePhoneNumber" className="mb-3">
              <Form.Label>
                Alternate Phone Number <span className="text-danger"></span>
              </Form.Label>

              <InputGroup>
                <InputGroup.Text>+91</InputGroup.Text>
                <Form.Control
                  type="tel"
                  value={alternatePhoneNumber}
                  onChange={(e) => {
                    const input = e.target.value;
                    const numericInput = input
                      .replace(/[^0-9]/g, '')
                      .slice(0, 10);
                    setAlternatePhoneNumber(numericInput);
                  }}
                  placeholder="Enter alternate phone number"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>
                Address <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                rows={3}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={handleAddRentalOrder}
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
                    Submit...
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Refurbished;
