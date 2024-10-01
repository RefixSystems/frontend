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
import { MdDelete, MdInsertPhoto, MdOutlineFileUpload } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useAddImportRentalMutation,
  useAddRentalOrderMutation,
  useDeleteRentalMutation,
  useGetRentalQuery,
} from '../../../redux/api/RentalApi';
import { useAddReviewMutation } from '../../../redux/api/ProductreviewApi';
import { Rating } from 'react-simple-star-rating';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { useTheme } from '../../../Contexts/ThemeContext';
import { IoBagAddSharp } from 'react-icons/io5';
import { format } from 'date-fns';
import ImageVideoDragUpload from '../../../components/ImageVideoDragUpload';
import InputImageAndVideo from '../../../components/InputImageAndVideo';
import { HiMiniUserCircle } from 'react-icons/hi2';
import sampleExcel from '../../../assests/excel/rental.xlsx';
import ServerError from '../../../components/ServerError';

const Rental = () => {
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
  const [addShow, setAddShow] = useState(false);
  const [importShow, setImportShow] = useState(false);
  const [reviewRentalId, setReviewRentalId] = useState(null);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [type, setType] = useState('');
  const [errors, setErrors] = useState({});
  const [excelFile, setExcelFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');

  const [show, setShow] = useState(false);
  const [userNameOrder, setUserNameOrder] = useState('');
  const [phoneNumberOrder, setPhoneNumberOrder] = useState('');
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [purposeOfRental, setPurposeOfRental] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState('');
  const [laptopId, setLaptopId] = useState('');
  const [orderType, setOrderType] = useState('');
  const [hasServerError, setHasServerError] = useState(false);

  const role = getRole();
  const {
    data: RentalData,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetRentalQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    role: role,
  });
  const [deleteRental] = useDeleteRentalMutation();
  const [addReview] = useAddReviewMutation();
  const [addRentalOrder] = useAddRentalOrderMutation();
  const [addRentalImport] = useAddImportRentalMutation();
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  useEffect(() => {
    if (RentalData && RentalData.data) {
      setData(RentalData.data);
      setStartIndex(RentalData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(RentalData.pagination.totalItems);
      setEndIndex(RentalData.pagination.endIndex);
      setTotalPages(RentalData.pagination.totalPages);
      setFullAccess(RentalData.moduleAccess.fullAccess);
      setWrite(RentalData.moduleAccess.write);
      setRead(RentalData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [RentalData, currentPage, role, error, isError]);

  const navigate = useNavigate();
  const handleAddRental = () => {
    navigate('/admin/add-rental');
  };
  console.log(RentalData);
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

  const handleDeleteRental = async () => {
    try {
      const response = await deleteRental({ id: idToDelete, role: role });
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

  const handleAddShow = (rentalId, type) => {
    setReviewRentalId(rentalId);
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
      formData.append('productId', reviewRentalId);
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

  const handleRating = (rate) => {
    setRating(rate);
  };

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
    if (!excelFile) {
      toast.error('Please select an Excel file to upload', { autoClose: 1000 });
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', excelFile);

    setLoading(true);

    try {
      const response = await addRentalImport({
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
    setPurposeOfRental('');
    setRentalPeriod('');
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

    // if (alternatePhoneNumber.length !== 10) {
    //   toast.error('Alternate phone number must be at least 10 digits', {
    //     autoClose: 1000,
    //   });
    //   return;
    // }
    setLoading(true);
    try {
      const data = {
        type: orderType,
        laptopId: laptopId,
        userName: userNameOrder,
        phoneNumber: phoneNumberOrder,
        alternatePhoneNumber: alternatePhoneNumber,
        address: address,
        purposeOfRental: purposeOfRental,
        rentalPeriod: rentalPeriod,
      };

      const response = await addRentalOrder({
        role: role,
        data: data,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setUserNameOrder('');
        setPhoneNumberOrder('');
        setAlternatePhoneNumber('');
        setAddress('');
        setPurposeOfRental('');
        setRentalPeriod('');
        setShow(false);
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
        setUserNameOrder('');
        setPhoneNumberOrder('');
        setAlternatePhoneNumber('');
        setAddress('');
        setPurposeOfRental('');
        setRentalPeriod('');
        setShow(false);
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
        link.download = 'rental.xlsx';
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
      accessor: 'image',
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
    // {
    //   Header: 'Images',
    //   accessor: 'images',
    //   Cell: (props) => {
    //     const imageArray = props.value;

    //     return (
    //       <div
    //         style={{
    //           display: 'flex',
    //           alignItems: 'center',
    //           overflowX: 'scroll',
    //         }}
    //       >
    //         {Array.isArray(imageArray) && imageArray.length > 0 ? (
    //           imageArray.map((imageUrl, index) => (
    //             <img
    //               key={index}
    //               src={imageUrl}
    //               alt={`Image ${index + 1}`}
    //               style={{
    //                 width: '50px',
    //                 height: '50px',
    //                 marginRight: '5px',
    //               }}
    //             />
    //           ))
    //         ) : (
    //           <MdInsertPhoto size={50} />
    //         )}
    //       </div>
    //     );
    //   },
    // },

    {
      Header: 'Amount For 6 Months',
      accessor: 'amountFor6Months',
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
      Header: 'Add In Carousel',
      accessor: 'addInCarousel',
      Cell: ({ value }) => (value ? 'Yes' : 'No'),
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
            <Link to={`/admin/edit-rental/${rowIdx}`}>
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

  return (
    <div>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <>
          {hasServerError ? (
            <ServerError />
          ) : read ? (
            <Container fluid className="mt-3">
              <Row className="boxShadow p-4 mb-4 mt-4">
                <Col className="d-flex flex-row justify-content-between mt-1">
                  <h4 className="fw-bold">Rental</h4>
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
                          Import Rentals
                        </span>
                      </Button>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddRental}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline"> Add Rental</span>
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
                      placeholder="Search Rental..."
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
                YES={handleDeleteRental}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this Rental"
                DELETETITLE="Rental"
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
            <Form.Group className="mb-3">
              <Form.Label>
                Review <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the review here"
                rows={3}
                name="review"
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
            <Form.Group controlId="formPurposeOfRental" className="mb-3">
              <Form.Label>Purpose of Rental:</Form.Label>
              <Form.Control
                type="text"
                value={purposeOfRental}
                onChange={(e) => setPurposeOfRental(e.target.value)}
                placeholder="Enter the purpose of rental"
                required
              />
            </Form.Group>

            <Form.Group controlId="formRentalPeriod" className="mb-3">
              <Form.Label>Rental Period:</Form.Label>
              <Form.Control
                type="text"
                value={rentalPeriod}
                onChange={(e) => setRentalPeriod(e.target.value)}
                placeholder="Enter rental period (e.g., 2 Months)"
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

export default Rental;
