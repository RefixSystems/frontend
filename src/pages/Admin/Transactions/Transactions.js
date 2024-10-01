import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import BasicTable from '../../../components/TablePaginationComponent';
import {
  useGetTransactionsQuery,
  useDeleteTransactionsMutation,
} from '../../../redux/api/TransactionsApi';
import { toast } from 'react-toastify';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { BsSearch, BsX } from 'react-icons/bs';
import { getRole } from '../../../Constants/Global';
import NoAccess from '../../../components/NoAccess';
import FetchLoader from '../../../components/FetchLoader';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import ServerError from '../../../components/ServerError';
import { getPhoneNumber } from '../../../Constants/PhoneNumberGlobal';

const Transactions = () => {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItem] = useState();
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');

  // const [fullAccess, setFullAccess] = useState(false);
  const [read, setRead] = useState(false);

  const [deleteTransactionsApi] = useDeleteTransactionsMutation();

  const role = getRole();
  const phoneNumber = getPhoneNumber();
  const {
    data: getTransactionsData,
    refetch,
    isLoading,
    isError, 
    error,
  } = useGetTransactionsQuery({
    page: currentPage,
    search: searchTerm,
    role: role,
    phoneNumber:phoneNumber,
  });

  useEffect(() => {
    if (getTransactionsData && getTransactionsData.data) {
      setData(getTransactionsData.data);
      setStartIndex(getTransactionsData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItem(getTransactionsData.pagination.totalItems);
      setEndIndex(getTransactionsData.pagination.endIndex);
      setTotalPages(getTransactionsData.pagination.totalPages);
      // setFullAccess(getTransactionsData.moduleAccess.fullAccess);
      setRead(getTransactionsData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [getTransactionsData, currentPage, role,error,isError]);

  const deleteHandleClose = () => setDeleteShow(false);

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
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

  const Transactions = async () => {
    try {
      const response = await deleteTransactionsApi({
        id: idToDelete,
        role: role,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setDeleteShow(false);
        setIdToDelete('');
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
      minWidth: 10,
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber',
    },
    {
      Header: 'Request Id',
      accessor: 'requestId',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: 'Type',
      accessor: 'type',
      Cell: ({ cell: { value } }) => (
        <div className="scrollable-list">
          <ul>
            {value.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ),
    },
    
    {
      Header: 'Coupon Code',
      accessor: 'couponCode',
    },
    {
      Header: 'Coupon Value',
      accessor: 'couponValue',
    },
    {
      Header: 'Transaction Id',
      accessor: 'transactionId',
    },
    {
      Header: 'Order Status',
      accessor: 'orderStatus',
    },
    {
      Header: 'Mode Of Payment',
      accessor: 'modeOfPayment',
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

  // if (fullAccess) {
  //   COLUMNS.push({
  //     Header: 'ACTIONS',
  //     accessor: 'action',
  //     Cell: (props) => {
  //       const rowIdx = props.row.original._id;
  //       return (
  //         <div className="d-flex align-items-center justify-content-center flex-row">
  //           <Button
  //             variant="danger"
  //             className="m-1"
  //             onClick={() => deleteHandleShow(rowIdx)}
  //           >
  //             <MdDelete />
  //           </Button>
  //         </div>
  //       );
  //     },
  //   });
  // }

  return (
    <div>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <>
        
         {hasServerError ? (
         <ServerError/>
        ) : read ? (
            <Container fluid className="my-4 ">
              <Row className="boxShadow p-4 mb-4 mt-4">
                <Col className="d-flex flex-row justify-content-between mt-1">
                  <h4 className="fw-bold ">Transactions</h4>
                </Col>
              </Row>

              <Row className=" boxShadow p-3 mb-4  d-flex  flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row">
                <Col className="my-4 mx-2" xxl={3} xl={3} lg={3} sm={6} md={6}>
                  <div className="input-group">
                    <span className="input-group-text">
                      <BsSearch />
                    </span>
                    <input
                      type="text"
                      placeholder="Search Transacation..."
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
              <Row className="boxShadow p-4 mb-4 justify-content-center">
                <Col
                  xs={12}
                  lg={12}
                  xl={12}
                  xxl={12}
                  md={12}
                  className="table-responsive"
                >
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
                </Col>
              </Row>
              <DeleteModel
                YES={Transactions}
                DELETESTATE={deleteShow}
                ONCLICK={deleteHandleClose}
                DESCRIPTION="Are you sure you want to delete this Transaction"
                DELETETITLE="Transaction History"
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

export default Transactions;
