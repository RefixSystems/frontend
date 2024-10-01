import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  Modal,
  Spinner,
} from 'react-bootstrap';
import BasicTable from '../../../components/TablePaginationComponent';
import {
  useGetExportDataDownloadOrdersQuery,
  useGetExportDataOrdersQuery,
  useGetOrderAssignedQuery,
} from '../../../redux/api/OrdersApi';
import { BsSearch, BsX } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { MdOutlineFileDownload } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NoAccess from '../../../components/NoAccess';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import { getEmail } from '../../../Constants/EmailGlobal';
import Select from 'react-select';
import ServerError from '../../../components/ServerError';

const OrderReports = () => {
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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [write, setWrite] = useState(false);
  const [read, setRead] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const [assigned, setAssigned] = useState([]);
  const [selectedAssigned, setSelectedAssigned] = useState('All');
  const [loading, setLoading] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);

  const role = getRole();
  const email = getEmail();
  const {
    data: OrderReportsData,
    isLoading,
    isError,
    error,
  } = useGetExportDataOrdersQuery({
    page: currentPage,
    search: searchTerm,
    role: role,
    startDate: startDate,
    endDate: endDate,
    dayFilter: selectedPeriod,
    assigned: selectedAssigned === 'All' ? '' : selectedAssigned,
    type: 'order',
    limit: '10',
    email: email,
  });
  const { data: AssignedData } = useGetOrderAssignedQuery({ role: role });

  const { data: downloadData, refetch: refetchRoleAccess } =
    useGetExportDataDownloadOrdersQuery({
      role: role,
      search: searchTerm,
      startDate: startDate,
      endDate: endDate,
      dayFilter: selectedPeriod,
      assigned: selectedAssigned === 'All' ? '' : selectedAssigned,
      type: 'order',
      email: email,
    });
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  useEffect(() => {
    if (OrderReportsData && OrderReportsData.data) {
      setData(OrderReportsData.data);
      setStartIndex(OrderReportsData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(OrderReportsData.pagination.totalItems);
      setEndIndex(OrderReportsData.pagination.endIndex);
      setTotalPages(OrderReportsData.pagination.totalPages);
      setFullAccess(OrderReportsData.moduleAccess.fullAccess);
      setWrite(OrderReportsData.moduleAccess.write);
      setRead(OrderReportsData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [OrderReportsData, currentPage, role, error, isError]);
  useEffect(() => {
    if (AssignedData && AssignedData.data) {
      setAssigned(['All', ...AssignedData.data]);
    }
  }, [AssignedData]);

  useEffect(() => {
    refetchRoleAccess({ search: searchTerm, role: selectedAssigned });
  }, [selectedAssigned]);

  const handleClear = () => {
    setSearchInput('');
    setSearchTerm('');
  };

  const handleSearch = () => {
    setIsSearching(true);
    setSearchTerm(searchInput);
    refetchRoleAccess({ page: currentPage, search: searchInput }).then(() => {
      setIsSearching(false);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: 's_no',
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
      Header: 'Alternate Phone Number',
      accessor: 'alternatePhoneNumber',
    },
    {
      Header: 'Total Orders',
      accessor: 'totalOrders',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Request Id',
      accessor: 'requestId',
    },
    {
      Header: 'Address',
      accessor: 'address',
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
    {
      Header: 'Transaction Id',
      accessor: 'transactionId',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Details',
      accessor: 'details',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: ' Initial Amount Paid Through',
      accessor: 'initialAmountPaidThrough',
    },
    {
      Header: 'Assigned To',
      accessor: 'assignedTo',
    },
    {
      Header: 'Assigned On',
      accessor: 'assignedOn',
    },
    {
      Header: 'Technician Comments',
      accessor: 'technicianComments',
    },
    {
      Header: 'Closed On',
      accessor: 'closedOn',
    },
    {
      Header: 'Paid',
      accessor: 'paidThrough',
    },
    {
      Header: 'Final Transaction Id',
      accessor: 'finalTransactionId',
    },
    {
      Header: 'Total Amount',
      accessor: 'totalAmount',
    },
    {
      Header: 'Notes',
      accessor: 'notes',
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

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    if (endDate && newStartDate >= endDate) {
      toast.warning('Start date must be earlier than the end date.', {
        autoClose: 2000,
      });
    } else {
      setStartDate(newStartDate);
      setSelectedPeriod('');
    }
  };

  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    if (startDate && newEndDate < startDate) {
      toast.warning('End date must be later than the start date.', {
        autoClose: 2000,
      });
    } else {
      setEndDate(newEndDate);
      setSelectedPeriod('');
    }
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
    setStartDate('');
    setEndDate('');
  };

  const handleExportData = async (format) => {
    setLoading(true);

    try {
      const { data, error } = downloadData;
      if (data && Array.isArray(data)) {
        if (data.length === 0) {
          toast.warn('No data to export', { autoClose: 1000 });
          return;
        }

        const reorderedData = data.map((item) => ({
          s_no: item.s_no ?? '-',
          userName: item.userName ?? '-',
          phoneNumber: item.phoneNumber ?? '-',
          alternatePhoneNumber: item.alternatePhoneNumber ?? '-',
          totalOrders: item.totalOrders ?? '-',
          email: item.email ?? '-',
          requestId: item.requestId ?? '-',
          Address: item.address ?? '-',
          type: item.type ?? '-',
          status: item.status ?? '-',
          details: item.details ?? '-',
          amount: item.amount ?? '-',
          initialAmountPaidThrough: item.initialAmountPaidThrough ?? '-',
          technicianComments: item.technicianComments ?? '-',
          closed: item.closed ?? '-',
          paid: item.paid ?? '-',
          notes: item.notes ?? '-',
          assignedTo: item.assignedTo ?? '-',
          assignedOn: item.assignedOn ?? '-',
          transactionId: item.transactionId ?? '-',
          finalTransactionId: item.finalTransactionId ?? '-',
          totalAmount: item.totalAmount ?? '-',
          createdAt: item.createdAt ?? '-',
          updatedAt: item.updatedAt ?? '-',
        }));

        const headers = [
          'S.No',
          'User Name',
          'Phone Number',
          'Alternative Ph.No',
          'Total Orders',
          'Email',
          'Request Id',
          'Address',
          'Type',
          'Status',
          'Details',
          'Amount',
          'Initial Amount Paid',
          'Technician Comments',
          'Closed',
          'Paid',
          'Notes',
          'Assigned To',
          'Assigned On',
          'Transaction Id',
          'Final Transaction Id',
          'Total Amount',
          'Created At',
          'Updated At',
        ];

        if (format === 'xlsx') {
          const fileName = 'exported_order.xlsx';
          const worksheet = XLSX.utils.json_to_sheet(reorderedData);
          XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'order');
          XLSX.writeFile(workbook, fileName);
        } else if (format === 'pdf') {
          try {
            const doc = new jsPDF({
              orientation: 'landscape',
              format: 'a1',
            });
            const body = reorderedData.map((item) => Object.values(item));
            doc.autoTable({
              head: [headers],
              body: body,
              theme: 'striped',
              styles: {
                overflow: 'linebreak',
                fontSize: 10,
              },
              columnStyles: {
                0: { cellWidth: 15 },
                1: { cellWidth: 25 },
                2: { cellWidth: 30 },
                3: { cellWidth: 30 },
                4: { cellWidth: 35 },
                5: { cellWidth: 25 },
                6: { cellWidth: 25 },
                7: { cellWidth: 20 },
                8: { cellWidth: 25 },
                9: { cellWidth: 20 },
                10: { cellWidth: 20 },
                11: { cellWidth: 25 },
                12: { cellWidth: 25 },
                13: { cellWidth: 30 },
                14: { cellWidth: 25 },
                15: { cellWidth: 25 },
                16: { cellWidth: 30 },
                17: { cellWidth: 30 },
                18: { cellWidth: 30 },
                19: { cellWidth: 30 },
                20: { cellWidth: 30 },
                21: { cellWidth: 30 },
                22: { cellWidth: 30 },
                23: { cellWidth: 30 },
              },
              startY: 20,
              pageBreak: 'auto',
            });
            doc.save('exported_order.pdf');
          } catch (pdfError) {
            console.error('Error generating PDF:', pdfError);
            toast.error('Error generating PDF', { autoClose: 1000 });
          }
        } else if (format === 'csv') {
          const fileName = 'exported_order.csv';
          const worksheet = XLSX.utils.json_to_sheet(reorderedData);
          XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
          const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
          const blob = new Blob([csvOutput], {
            type: 'text/csv;charset=utf-8;',
          });
          const link = document.createElement('a');
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', fileName);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        setStartDate('');
        setEndDate('');
        setSelectedPeriod('');
        setShowModal(false);
      } else if (error) {
        toast.error(error.message, { autoClose: 1000 });
      } else {
        toast.error('Unknown error occurred', { autoClose: 1000 });
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Error exporting data', { autoClose: 1000 });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (e) => {
    setSelectedAssigned(e.target.value);
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
            
                <Row className="boxShadow p-4 mb-4 mt-4 justify-content-between align-items-center">
                  <Row className="p-2 mb-2 mt-2 align-items-center justify-content-between">
                    <Col xs="12" md="auto">
                      <h4 className="fw-bold text-center text-md-start">
                        Order Reports
                      </h4>
                    </Col>
                  </Row>
                  {fullAccess && (
                  <Col
                    xs="12"
                    md="auto"
                    className="d-flex flex-column flex-md-row justify-content-end align-items-center"
                  >
                    <Form.Group
                      controlId="startDate"
                      className="me-md-2 mb-3 mb-md-0 w-100 w-md-auto"
                    >
                      <Form.Label>Start Date:</Form.Label>
                      <Form.Control
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        disabled={selectedPeriod}
                      />
                    </Form.Group>
                    <Form.Group
                      controlId="endDate"
                      className="me-md-2 mb-3 mb-md-0 w-100 w-md-auto"
                    >
                      <Form.Label>End Date:</Form.Label>
                      <Form.Control
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        disabled={selectedPeriod}
                      />
                    </Form.Group>
                    <Form.Group
                      controlId="period"
                      className="me-md-2 mb-3 mb-md-0 w-100 w-md-auto"
                    >
                      <Form.Label>Period:</Form.Label>
                      <Form.Select
                        value={selectedPeriod}
                        onChange={handlePeriodChange}
                        disabled={startDate || endDate}
                      >
                        <option value="">Select Period</option>
                        <option value="lastWeek">Last Week</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="lastYear">Last Year</option>
                      </Form.Select>
                    </Form.Group>
                    <Button
                      variant="success"
                      onClick={() => setShowModal(true)}
                      className="align-self-end mx-md-2 w-100 w-md-auto"
                    >
                      Download <MdOutlineFileDownload size={25} />
                    </Button>
                  </Col>
                )}
                </Row>
          

              <Row className="boxShadow p-3 mb-4 d-flex flex-lg-row flex-column flex-xxl-row flex-xl-row flex-sm-column flex-md-row">
                <Col className="my-4 mx-2" xxl={3} xl={3} lg={3} sm={6} md={6}>
                  <div className="input-group">
                    <span className="input-group-text">
                      <BsSearch />
                    </span>
                    <input
                      type="text"
                      placeholder="Search Orders..."
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
                {fullAccess ? (
                  <Col
                    className="d-flex flex-column my-4"
                    xxl={3}
                    xl={3}
                    lg={3}
                    sm={6}
                    md={6}
                  >
                    {' '}
                    <Select
                      placeholder="All"
                      options={assigned.map((assignee) => ({
                        value: assignee,
                        label: assignee,
                      }))}
                      value={
                        selectedAssigned === 'All'
                          ? null
                          : { value: selectedAssigned, label: selectedAssigned }
                      }
                      onChange={(option) =>
                        setSelectedAssigned(option ? option.value : 'All')
                      }
                    />
                  </Col>
                ) : (
                  <></>
                )}
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Export Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="primary"
            className="m-2"
            onClick={() => handleExportData('pdf')}
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
                Exporting PDF...
              </>
            ) : (
              'Export as PDF'
            )}
          </Button>
          <Button
            variant="success"
            className="m-2"
            onClick={() => handleExportData('xlsx')}
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
                Exporting Excel...
              </>
            ) : (
              'Export as Excel'
            )}
          </Button>
          <Button
            variant="warning"
            className="m-2"
            onClick={() => handleExportData('csv')}
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
                Exporting CSV...
              </>
            ) : (
              'Export as CSV'
            )}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderReports;
