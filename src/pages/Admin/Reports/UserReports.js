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
import { BsSearch, BsX } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import {
  useGetExportDataDownloadQuery,
  useGetExportDataQuery,
} from '../../../redux/api/OrdersApi';
import { MdOutlineFileDownload } from 'react-icons/md';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NoAccess from '../../../components/NoAccess';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
const UserReports = () => {
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
  const [loading, setLoading] = useState(false);

  const role = getRole();

  const { data: UserReportsData, isLoading } = useGetExportDataQuery({
    page: currentPage,
    search: searchTerm,
    role: role,
    startDate: startDate,
    endDate: endDate,
    dayFilter: selectedPeriod,
    type: 'user',
    limit: '10',
  });

  const { data: downloadData, refetch } = useGetExportDataDownloadQuery({
    role: role,
    search: searchTerm,
    startDate: startDate,
    endDate: endDate,
    dayFilter: selectedPeriod,
    type: 'user',
  });
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  useEffect(() => {
    if (UserReportsData && UserReportsData.data) {
      setData(UserReportsData.data);
      setStartIndex(UserReportsData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(UserReportsData.pagination.totalItems);
      setEndIndex(UserReportsData.pagination.endIndex);
      setTotalPages(UserReportsData.pagination.totalPages);
    }
  }, [UserReportsData, currentPage, role]);

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

        const reorderedData = data.map((item) => {
          const primaryAddress =
            item.address && item.address.length > 0
              ? item.address.find((addr) => addr.primaryAddress === true)
                  ?.address
              : '-';

          return {
            s_no: item.s_no ?? '-',
            userName: item.userName ?? '-',
            phoneNumber: item.phoneNumber ?? '-',
            email: item.email ?? '-',
            dob: item.dob ?? '-',
            address: primaryAddress ?? '-',
            createdAt: item.createdAt ?? '-',
            updatedAt: item.updatedAt ?? '-',
          };
        });

        const headers = [
          'S.No',
          'User Name',
          'Phone Number',
          'Email',
          'Date Of Birth',
          'Address',
          'Created At',
          'Update At',
        ];
        if (format === 'xlsx') {
          const fileName = 'exported_user.xlsx';
          const worksheet = XLSX.utils.json_to_sheet(reorderedData);
          XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'user');
          XLSX.writeFile(workbook, fileName);
          setShowModal(false);
        } else if (format === 'pdf') {
          try {
            const doc = new jsPDF({
              orientation: 'landscape',
              format: 'a3',
            });
            const splitTextToSize = (text, size) => {
              const lines = [];
              for (let i = 0; i < text.length; i += size) {
                lines.push(text.substring(i, i + size));
              }
              return lines;
            };
            const body = data.map((item) => {
              const primaryAddress =
                item.address && item.address.length > 0
                  ? item.address.find((addr) => addr.primaryAddress === true)
                      ?.address
                  : '-';

              return [
                item.s_no ?? '-',
                item.userName ?? '-',
                item.phoneNumber ?? '-',
                item.email ?? '-',
                item.dob ?? '-',
                primaryAddress ?? '-', // Use the primaryAddress
                formatDateTime(item.createdAt) ?? '-',
                item.updatedAt ?? '-',
              ];
            });

            doc.autoTable({
              head: [
                [
                  'S.No',
                  'User Name',
                  'Phone Number',
                  'Email',
                  'Date Of Birth',
                  'Address',
                  'Created At',
                  'Update At',
                ],
              ],
              body: body,
              theme: 'striped',
              styles: { cellWidth: 'wrap' },
              columnStyles: { 1: { cellWidth: 'auto' } },
            });
            doc.save('exported_user.pdf');
          } catch (pdfError) {
            console.error('Error generating PDF:', pdfError);
            toast.error('Error generating PDF', { autoClose: 1000 });
          }
        } else if (format === 'csv') {
          const fileName = 'exported_user.csv';
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

  return (
    <>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <div>
          <Container fluid className="mt-3 ">
            <Row className="boxShadow p-4 mb-4 mt-4 align-items-center justify-content-between">
              <Row className="p-2 mb-2 mt-2 align-items-center justify-content-between">
                <Col xs="12" md="auto">
                  <h4 className="fw-bold text-center text-md-start">
                    User Reports
                  </h4>
                </Col>
              </Row>
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
          </Container>
        </div>
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
    </>
  );
};

export default UserReports;
