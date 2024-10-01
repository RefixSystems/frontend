import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Modal, Form, Spinner } from 'react-bootstrap';
import BasicTable from '../../../components/TablePaginationComponent';
import {
  useEditCredentialsMutation,
  useGetCredentialsQuery,
} from '../../../redux/api/CredentialsApi';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import ServerError from '../../../components/ServerError';
const Credentials = () => {
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItem] = useState();
  const { id } = useParams();
  const [editId, setEditId] = useState(null);
  const [editShow, setEditShow] = useState(false);
  const [Credentials, setCredentials] = useState('');
  const [Credentialsvalue, setCredentialsValue] = useState('');
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);

  const role = getRole();

  const { data: CredentialsData, isLoading, isError, 
    error, } = useGetCredentialsQuery({
    page: currentPage,
    search: '',
    id: id,
    role: role,
  });
  const [editCredentialsData] = useEditCredentialsMutation();
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  useEffect(() => {
    if (CredentialsData && CredentialsData.data) {
      setData(CredentialsData.data);
      setStartIndex(CredentialsData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItem(CredentialsData.pagination.totalItems);
      setEndIndex(CredentialsData.pagination.endIndex);
      setTotalPages(CredentialsData.pagination.totalPages);
      setFullAccess(CredentialsData.moduleAccess.fullAccess);
      setRead(CredentialsData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [CredentialsData, currentPage, role,error,isError]);


  const handleEditShow = (id) => {
    const credentials = data.find((d) => d._id === id);

    if (credentials) {
      setEditId(id);
      setCredentials(credentials.credentialsKey);
      setCredentialsValue(credentials.credentialsValue);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setCredentials('');
  };

  const handleCredentialsChange = (e) => {
    setCredentials(e.target.value);
  };

  const handleCredentialsValueChange = (e) => {
    setCredentialsValue(e.target.value);
  };

  const handleEditData = async () => {
    if (!Credentialsvalue) {
      toast.error('Please fill  the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);
    try {
      const response = await editCredentialsData({
        id: editId,
        role: role,
        data: {
          type: 'credential',
          credentialsValue: Credentialsvalue,
        },
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setEditShow(false);
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
      minWidth: 10,
    },
    {
      Header: 'Name',
      accessor: 'credentialsKey',
    },
    {
      Header: 'value',
      accessor: 'credentialsValue',
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
                  <h4 className="fw-bold">Credentials</h4>
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
            </Container>
          ) : (
            <NoAccess />
          )}
        </>
      )}

      <Modal show={editShow} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Credentials</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="CredentialsInput">
              <Form.Label>Credentials Name:</Form.Label>
              <Form.Control
                type="text"
                value={Credentials}
                onChange={handleCredentialsChange}
                readOnly
                disabled
              />
            </Form.Group>

            <Form.Group controlId="CredentialsInput">
              <Form.Label>Credentials value:</Form.Label>
              <Form.Control
                type="text"
                value={Credentialsvalue}
                onChange={handleCredentialsValueChange}
                placeholder="Enter the credentials value here"
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
    </div>
  );
};

export default Credentials;
