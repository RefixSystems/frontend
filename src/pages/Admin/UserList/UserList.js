import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import BasicTable from '../../../components/TablePaginationComponent';
import {
  useDeleteUserListMutation,
  useGetUserListQuery,
} from '../../../redux/api/UserListApi';
import { BsSearch, BsX } from 'react-icons/bs';
import { HiMiniUserCircle } from 'react-icons/hi2';
import DeleteModel from '../../../components/DeleteModel';
import { MdDelete } from 'react-icons/md';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { toast } from 'react-toastify';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import ServerError from '../../../components/ServerError';
import { getPhoneNumber } from '../../../Constants/PhoneNumberGlobal';

const UserList = () => {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItem] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [deleteShow, setDeleteShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  // const [fullAccess, setFullAccess] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const [count, setCount] = useState(0);
  const [read, setRead] = useState(false);
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');

  const role = getRole();
  const phoneNumber = getPhoneNumber();

  const {
    data: UserListData,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetUserListQuery({
    page: currentPage,
    search: searchTerm,
    role: role,
    phoneNumber:phoneNumber,
  });
  const [deleteUserListApi] = useDeleteUserListMutation();

  useEffect(() => {
    if (UserListData && UserListData.data) {
    
      setData(UserListData.data);
      setStartIndex(UserListData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItem(UserListData.pagination.totalItems);
      setEndIndex(UserListData.pagination.endIndex);
      setTotalPages(UserListData.pagination.totalPages);
      // setFullAccess(UserListData.moduleAccess.fullAccess);
      setRead(UserListData.moduleAccess.read);
      setCount(UserListData.userCount);
    }

    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [UserListData, currentPage, role,error,isError]);


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

  const deleteHandleClose = () => setDeleteShow(false);

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    setDeleteShow(true);
  };

  const deleteUserList = async () => {
    try {
      const response = await deleteUserListApi({ id: idToDelete, role: role });
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
      Header: 'User Name',
      accessor: 'userName',
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Date Of Birth',
      accessor: 'dob',
    },
    {
      Header: 'Address',
      accessor: 'address',
      Cell: ({ value }) => {
        return value && value.length > 0 ? value[0].address : '';
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
          <Container fluid className="mt-3 reduced-width-row ">
            <Row className="boxShadow p-4 mb-4 mt-4  ">
              <Col className="d-flex flex-row justify-content-between mt-1">
                <h4 className="fw-bold "> User List</h4>
              </Col>
            </Row>

            <Row className="  boxShadow p-4  mb-3 mt-3 d-flex  flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row">
              <Col className="my-2 mx-2 " xxl={3} xl={3} lg={3} sm={6} md={6}>
                <div className="input-group">
                  <span className="input-group-text">
                    <BsSearch />
                  </span>
                  <input
                    type="text"
                    placeholder="Search UserList..."
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
                className="d-flex flex-column text-center my-2 "
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

            <Row className="boxShadow p-4 mb-4 ">
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
          </Container>
        ) : (
          <NoAccess />
        )}
      </>
    )}


      <DeleteModel
        YES={deleteUserList}
        DELETESTATE={deleteShow}
        ONCLICK={deleteHandleClose}
        DESCRIPTION="Are you sure you want to delete this userlist"
        DELETETITLE="UserList"
      />
    </div>
  );
};

export default UserList;
