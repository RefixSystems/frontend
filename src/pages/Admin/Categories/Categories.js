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
  useDeleteCategoriesMutation,
  useEditCategoriesMutation,
  useGetCategoriesQuery,
  useAddCategoriesMutation,
} from '../../../redux/api/CategoriesApi';
import { BsSearch, BsX } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { FaEdit, FaPlus } from 'react-icons/fa';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { getRole } from '../../../Constants/Global';
import NoAccess from '../../../components/NoAccess';
import FetchLoader from '../../../components/FetchLoader';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import InputImage from '../../../components/InputImage';
import DragAndDropImageUpload from '../../../components/DragAndDropImageUpload';
import ServerError from '../../../components/ServerError';
const Categories = () => {
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
  const [categories, setcategories] = useState('');
  const [file, setFile] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [addShow, setAddShow] = useState(false);
  const [newcategories, setNewcategories] = useState('');
  const [status, setstatus] = useState('');
  const [newFile, setNewFile] = useState(null);
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [toggle, setToggle] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const role = getRole();
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  const {
    data: CategoriesData,
    refetch,
    isLoading,
    isError, 
    error,
  } = useGetCategoriesQuery({
    page: currentPage,
    search: searchTerm,
    id: id,
    role: role,
  });
  const [editCategoriesData] = useEditCategoriesMutation();
  const [deleteCategories] = useDeleteCategoriesMutation();
  const [addCategories] = useAddCategoriesMutation();

  useEffect(() => {
    if (CategoriesData && CategoriesData.data) {
      setData(CategoriesData.data);
      setStartIndex(CategoriesData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(CategoriesData.pagination.totalItems);
      setEndIndex(CategoriesData.pagination.endIndex);
      setTotalPages(CategoriesData.pagination.totalPages);
      setFullAccess(CategoriesData.moduleAccess.fullAccess);
      setWrite(CategoriesData.moduleAccess.write);
      setRead(CategoriesData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [CategoriesData, currentPage, role,error,isError]);

  const handleCheckboxClick = (rowIdx, check) => {
    setSelectedRowId(rowIdx);
    setShowConfirmationModal(true);
    setToggle(check);
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

  const handleEditShow = (id) => {
    const categories = data.find((d) => d._id === id);

    if (categories) {
      setEditId(id);
      setcategories(categories.category);
      setstatus(categories.status);
      setNewFile(categories.image);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setcategories('');
    setFile(null);
    setstatus('');
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handlestatusChange = (e) => {
    setstatus(e.target.value);
  };

  const handleEditcategoriesChange = (e) => {
    setcategories(e.target.value);
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleAddcategoriesChange = (e) => {
    setNewcategories(e.target.value);
  };

  const handleNewFileChange = (file) => {
    setNewFile(file);
  };

  const handleDeleteCategories = async () => {
    try {
      const response = await deleteCategories({ id: idToDelete, role: role });
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
    if (!categories || !newFile || !status) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('category', categories);
      formData.append('image', newFile);
      formData.append('status', status);

      const response = await editCategoriesData({
        id: editId,
        role: role,
        data: formData,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setEditShow(false);
        refetch();
        setcategories('');
        setNewFile('');
        setstatus('');
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
       }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmToggle = async () => {
    setLoading(true);

    const toggledValue = toggle === 'yes' ? 'no' : 'yes';
    try {
      const data = {
        showInHomePage: toggledValue,
      };

      const response = await editCategoriesData({
        id: selectedRowId,
        role: role,
        data: data,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setShowConfirmationModal(false);
        refetch();
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setShowConfirmationModal(false);
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
    setcategories('');
    setNewFile(null);
    setstatus('');
  };

  const handleAddData = async () => {
    if (!newcategories || !file) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('category', newcategories);
      formData.append('image', file);

      const response = await addCategories({
        role: role,
        data: formData,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setAddShow(false);
        refetch();
        setcategories('');
        setFile('');
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setcategories('');
        setFile('');
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
          <HiUserCircle size={50} />
        );
      },
    },
    {
      Header: 'Category',
      accessor: 'category',
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
      accessor: 'showInHomePage',
      Cell: (props) => {
        const rowIdx = props.row.original._id;
        const showInHomePage = props.row.original.showInHomePage;
        const isToggled = showInHomePage === 'yes';

        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <Button
              variant={isToggled ? 'success' : 'secondary'}
              onClick={() => handleCheckboxClick(rowIdx, showInHomePage)}
              className="ms-2"
            >
              {isToggled ? 'ON' : 'OFF'}
            </Button>
            <Button
              variant="warning"
              className="ms-2"
              onClick={() => handleEditShow(rowIdx)}
            >
              <FaEdit />
            </Button>
            {/* <Button
              variant="danger"
              className="ms-2"
              onClick={() => deleteHandleShow(rowIdx)}
            >
              <MdDelete />
            </Button> */}
          </div>
        );
      },
    });
  }

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
                  <h4 className="fw-bold">Categories</h4>
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
                          Add Categories
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
                      placeholder="Search Categories..."
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
                YES={handleDeleteCategories}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this Categories"
                DELETETITLE="Categories"
              />
            </Container>
          ) : (
            <NoAccess />
          )}

          <Modal show={editShow} onHide={handleEditClose} centered dialogClassName="review-modal">
            <Modal.Header closeButton>
              <Modal.Title>Edit Categories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="statusDropdown" className="mt-3 mb-3">
                  <Form.Label>
                    Status <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    value={status}
                    placeholder="Enter the status here"
                    onChange={handlestatusChange}
                  >
                    <option value="" disabled selected>
                      Select an option
                    </option>
                    <option value="Active">Active</option>
                    <option value="InActive">InActive</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="deviceNameInput" className='mb-3'>
                  <Form.Label>
                    Categories Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the category here"
                    value={categories}
                    onChange={handleEditcategoriesChange}
                    disabled
                  />
                </Form.Group>

                <DragAndDropImageUpload
                  labelText="Upload Image"
                  accepts={{
                    'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
                  }}
                  handleFileChange={(file) => {
                    handleNewFileChange(file);
                  }}
                />
                <div>
                  <small className="text-muted">
                    Accepted file types: .jpg , .jpeg, .png, .svg, .webp{' '}
                  </small>
                </div>
                <InputImage image={newFile} valueImage={newFile} />
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
              <Modal.Title>Add Categories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formCategory">
                  <Form.Label>
                    Category Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the category here"
                    onChange={handleAddcategoriesChange}
                  />
                </Form.Group>
                <Form.Group controlId="formFile" className="mt-3">
                  <DragAndDropImageUpload
                    labelText="Upload Image"
                    accepts={{
                      'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp'],
                    }}
                    handleFileChange={(file) => {
                      handleFileChange(file);
                    }}
                  />
                  <div>
                    <small className="text-muted">
                      Accepted file types: .jpg , .jpeg, .png, .svg, .webp{' '}
                    </small>
                  </div>
                  <InputImage image={file} valueImage={file} />
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

          <Modal
            show={showConfirmationModal}
            onHide={() => setShowConfirmationModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to update ?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowConfirmationModal(false)}
              >
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: color }}
                onClick={handleConfirmToggle}
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
                    Confirm...
                  </>
                ) : (
                  'Confirm'
                )}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Categories;
