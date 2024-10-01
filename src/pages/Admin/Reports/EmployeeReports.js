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
import FetchLoader from '../../../components/FetchLoader';
import { getRole } from '../../../Constants/Global';
import {
  useGetExportDataDownloadEmployeeQuery,
  useGetExportDataEmployeeQuery,
} from '../../../redux/api/OrdersApi';
import { MdOutlineFileDownload } from 'react-icons/md';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NoAccess from '../../../components/NoAccess';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import { getEmail } from '../../../Constants/EmailGlobal';
import ServerError from '../../../components/ServerError';
const EmployeeReports = () => {
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
  const [loading, setLoading] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);

  const email = getEmail();
  const role = getRole();
  const {
    data: EmployeeReportsData,
    isLoading,
    isError,
    error,
  } = useGetExportDataEmployeeQuery({
    page: currentPage,
    search: searchTerm,
    role: role,
    startDate: startDate,
    endDate: endDate,
    dayFilter: selectedPeriod,
    type: 'employee',
    limit: '10',
    email: email,
  });

  const { data: downloadData, refetch } = useGetExportDataDownloadEmployeeQuery(
    {
      role: role,
      search: searchTerm,
      startDate: startDate,
      endDate: endDate,
      dayFilter: selectedPeriod,
      type: 'employee',
      email: email,
    }
  );
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  useEffect(() => {
    if (EmployeeReportsData && EmployeeReportsData.data) {
      setData(EmployeeReportsData.data);
      setStartIndex(EmployeeReportsData.pagination.startIndex);
      setCurrentPage(currentPage);
      setTotalItems(EmployeeReportsData.pagination.totalItems);
      setEndIndex(EmployeeReportsData.pagination.endIndex);
      setTotalPages(EmployeeReportsData.pagination.totalPages);
      setFullAccess(EmployeeReportsData.moduleAccess.fullAccess);
      setWrite(EmployeeReportsData.moduleAccess.write);
      setRead(EmployeeReportsData.moduleAccess.read);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [EmployeeReportsData, currentPage, role, error, isError]);

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
      Header: 'Employee ID',
      accessor: 'employeeId',
    },
    {
      Header: 'Name Of Employee',
      accessor: 'nameOfEmployee',
    },
    {
      Header: 'Role',
      accessor: 'roleOfEmployee',
    },
    {
      Header: 'Date Of Birth',
      accessor: 'dateOfBirth',
    },
    {
      Header: 'ID Proof',
      accessor: 'idProof',
      Cell: (props) => {
        const idimageUrl = props.value;
        return idimageUrl ? (
          <img
            src={idimageUrl}
            alt="idProof"
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
      Header: 'Phone Number',
      accessor: 'phoneNumber',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Password',
      accessor: 'password',
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
          image: item.image ?? '-',
          employeeId: item.employeeId ?? '-',
          nameOfEmployee: item.nameOfEmployee ?? '-',
          roleOfEmployee: item.roleOfEmployee ?? '-',
          dateOfBirth: item.dateOfBirth ?? '-',
          idProof: item.idProof ?? '-',
          phoneNumber: item.phoneNumber ?? '-',
          email: item.email ?? '-',
          password: item.password ?? '-',
          status: item.status ?? '-',
          createdAt: item.createdAt ?? '-',
          updatedAt: item.updatedAt ?? '-',
        }));

        const headers = [
          'S.No',
          'Image',
          'Employee ID',
          'Employee Name',
          'Role',
          'D.O.B',
          'ID Proof',
          'Phone Number',
          'Email',
          'Password',
          'Status',
          'Created At',
          'Updated At',
        ];

        if (format === 'xlsx') {
          const fileName = 'exported_employee.xlsx';
          const worksheet = XLSX.utils.json_to_sheet(reorderedData);
          XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'employee');
          XLSX.writeFile(workbook, fileName);
          setShowModal(false);
        } else if (format === 'pdf') {
          try {
            const doc = new jsPDF({
              orientation: 'landscape',
              format: 'a2',
            });
            const splitTextToSize = (text, size) => {
              const lines = [];
              for (let i = 0; i < text.length; i += size) {
                lines.push(text.substring(i, i + size));
              }
              return lines;
            };
            const body = data.map((item) => [
              item.s_no ?? '-',
              splitTextToSize(item.image ?? '-', 50).join('\n') ?? '-',
              item.employeeId ?? '-',
              item.nameOfEmployee ?? '-',
              item.roleOfEmployee ?? '-',
              item.dateOfBirth ?? '-',
              splitTextToSize(item.idProof ?? '-', 50).join('\n') ?? '-',
              item.phoneNumber ?? '-',
              item.email ?? '-',
              item.password ?? '-',
              item.status ?? '-',
              item.createdAt ?? '-',
              item.updatedAt ?? '-',
            ]);
            doc.autoTable({
              head: [
                [
                  'S.No',
                  'Image',
                  'Employee ID',
                  'Name Of Employee',
                  'Role Of Employee',
                  'D.O.B',
                  'ID Proof',
                  'Phone Number',
                  'Email',
                  'Password',
                  'Status',
                  'Created At',
                  'Updated At',
                ],
              ],
              body: body,
              theme: 'striped',
              styles: {
                overflow: 'linebreak',
                fontSize: 10,
              },
              columnStyles: {
                0: { cellWidth: 15 },
                1: { cellWidth: 55 },
                2: { cellWidth: 30 },
                3: { cellWidth: 30 },
                4: { cellWidth: 35 },
                5: { cellWidth: 25 },
                6: { cellWidth: 55 },
                7: { cellWidth: 30 },
                8: { cellWidth: 50 },
                9: { cellWidth: 30 },
                10: { cellWidth: 20 },
                11: { cellWidth: 25 },
                12: { cellWidth: 25 },
              },
              startY: 20,
              pageBreak: 'auto',
            });

            doc.save('exported_employee.pdf');
          } catch (pdfError) {
            console.error('Error generating PDF:', pdfError);
            toast.error('Error generating PDF', { autoClose: 1000 });
          }
          setShowModal(false);
        } else if (format === 'csv') {
          const fileName = 'exported_employee.csv';
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
              {/* <Row className="boxShadow p-4 mb-4 mt-4 align-items-center justify-content-between">
  <Col xs="12" md="auto">
    <h4 className="fw-bold text-center text-md-start">Employee Reports</h4>
  </Col>
</Row> */}

              <Row className="boxShadow p-4 mb-4 mt-4 justify-content-between">
                <Row className="p-2 mb-2 mt-2 align-items-center justify-content-between">
                  <Col xs="12" md="auto">
                    <h4 className="fw-bold text-center text-md-start">
                      Employee Reports
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
                      placeholder="Search Employee..."
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
                <Col
                  className="d-flex flex-column align-items-end justify-content-end my-4"
                  xxl={2}
                  xl={2}
                  lg={2}
                  sm={3}
                  md={3}
                ></Col>
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

export default EmployeeReports;
