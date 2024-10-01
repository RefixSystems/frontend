import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import BasicTable from '../../../components/TablePaginationComponent';
import {
  useDeleteCouponMutation,
  useGetCouponQuery,
} from '../../../redux/api/CouponApi';
import { BsSearch, BsX } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { FaEdit, FaPlus } from 'react-icons/fa';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { HiMiniUserCircle } from 'react-icons/hi2';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import ServerError from '../../../components/ServerError';
const Coupon = () => {
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
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');

  const role = getRole();
  const {
    data: CouponData,
    isLoading,
    isError, 
    error,
    refetch,
  } = useGetCouponQuery({ page: currentPage, search: searchTerm, role: role });

  const [deleteCoupon] = useDeleteCouponMutation();

  useEffect(() => {
    if (CouponData && CouponData.data) {
      setData(CouponData.data);
      setStartIndex(CouponData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(CouponData.pagination.totalItems);
      setEndIndex(CouponData.pagination.endIndex);
      setTotalPages(CouponData.pagination.totalPages);
      setFullAccess(CouponData.moduleAccess.fullAccess);
      setWrite(CouponData.moduleAccess.write);
      setRead(CouponData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [CouponData, currentPage, role,error,isError]);

  const navigate = useNavigate();
  const handleAddCoupon = () => {
    navigate('/admin/add-coupon');
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

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const handleDeleteCoupon = async () => {
    try {
      const response = await deleteCoupon({ id: idToDelete, role: role });
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
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Code',
      accessor: 'code',
    },
    {
      Header: 'Value',
      accessor: 'value',
    },
    {
      Header: 'Limit',
      accessor: 'limit',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'StartDate',
      accessor: 'startDate',
    },
    {
      Header: 'EndDate',
      accessor: 'endDate',
    },
    {
      Header: 'Applicable To',
      accessor: 'applicable',
      Cell: ({ value }) => {
        const items = value.split(',');
        return (
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      },
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
            <Link to={`/admin/edit-Coupon/${rowIdx}`}>
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
                  <h4 className="fw-bold">Coupon</h4>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddCoupon}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline"> Add Coupon</span>
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
                      placeholder="Search Coupon..."
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
                YES={handleDeleteCoupon}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure want to delete this Coupon"
                DELETETITLE="Coupon"
              />
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}
    </div>
  );
};

export default Coupon;
