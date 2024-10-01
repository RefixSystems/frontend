import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown, Form } from 'react-bootstrap';
import {
  useGetBarChartFilterQuery,
  useGetDashboardQuery,
} from '../../../redux/api/DashboardApi';
import TableComponents from '../../../components/TableComponent';
import { Link } from 'react-router-dom';
import { HiMiniUserCircle } from 'react-icons/hi2';
import { BsChatRightQuoteFill, BsFillLaptopFill } from 'react-icons/bs';
import { FaStar, FaUser } from 'react-icons/fa';
import { getRole } from '../../../Constants/Global';
import NoAccess from '../../../components/NoAccess';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import FetchLoader from '../../../components/FetchLoader';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineController,
  LinearScale,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const { color } = useTheme();
  const role = getRole();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('dayWise');
  const { data, error, isLoading } = useGetDashboardQuery();
  const { data: filterData } = useGetBarChartFilterQuery({ filter: filter });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  useEffect(() => {
    if (filterData) {
      const labels = filterData.data.map((item) => item.date);
      const pendingData = filterData.data.map((item) => item.pending);
      const inProcessData = filterData.data.map((item) => item.inProcess);
      const completedData = filterData.data.map((item) => item.completed);
      const inTransitData = filterData.data.map((item) => item.inTransit);
      const cancelledData = filterData.data.map((item) => item.cancelled);
      const totalData = filterData.data.map((item) => item.total);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Total',
            type: 'line',
            data: totalData,
            backgroundColor: '#4BC0C0',
            borderColor: '#4BC0C0',
            borderWidth: 2,
            fill: false,
            tension: 0.1,
          },
          {
            label: 'Pending',
            data: pendingData,
            backgroundColor: '#F18030',
            borderColor: '#F18030',
            borderWidth: 1,
          },
          {
            label: 'In Process',
            data: inProcessData,
            backgroundColor: '#FFCC00',
            borderColor: '#FFCC00',
            borderWidth: 1,
          },
          {
            label: 'In Transit',
            data: inTransitData,
            backgroundColor: '#6159f7',
            borderColor: '#6159f7',
            borderWidth: 1,
          },{
            label: 'Cancelled',
            data: cancelledData,
            backgroundColor: '#f71143',
            borderColor: '#f71143',
            borderWidth: 1,
          },
          {
            label: 'Completed',
            data: completedData,
            backgroundColor: '#01AD23',
            borderColor: '#01AD23',
            borderWidth: 1,
          },
        ],
      });
      setLoading(false);
    }
  }, [filter, filterData]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  if (isLoading) {
    return <FetchLoader />;
  }

  if (error) {
    return (
      <div>
        <NoAccess />
      </div>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const {
    totalUsers,
    unClosedQuotationRequests,
    reviews,
    rentalLaptopsInHand,
    users = [],
    transaction = [],
  } = data.data;

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: (d, i) => i + 1,
      minWidth: 10,
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

  const COLUMNSS = [
    {
      Header: 'ID',
      accessor: (d, i) => i + 1,
      minWidth: 10,
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: 'Transaction Id',
      accessor: 'transactionId',
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid>
      <Row className="mt-4 mx-2">
        <Col className="boxShadow p-4">
          <h4 className="fs-4 fw-bolder">Dashboard</h4>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="mb-3"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {role === 'Admin' ? (
            <Link to="/admin/user-list" className="link-unstyled">
              <p className="p-3 boxShadow">
                <div className="d-flex align-items-center">
                  <FaUser size={45} style={{ color: color }} />

                  <div className="ms-3">
                    <div className="fs-7 fw-bolder">Users Count</div>
                    <h3 className="fs-8 fw-bolder">{totalUsers}</h3>
                    <div className="fs-17">Total Number of Users</div>
                  </div>
                </div>
              </p>
            </Link>
          ) : (
            <p className="p-3 boxShadow">
              <div className="d-flex align-items-center">
                <FaUser size={45} style={{ color: color }} />

                <div className="ms-3">
                  <div className="fs-7 fw-bolder">Users Count</div>
                  <h3 className="fs-8 fw-bolder">{totalUsers}</h3>
                  <div className="fs-17">Total Number of Users</div>
                </div>
              </div>
            </p>
          )}
        </Col>

        <Col xs={12} sm={6} lg={4} className="mb-3">
          {role === 'Admin' ? (
            <Link to="/admin/quotes" className="link-unstyled">
              <p className="p-3 boxShadow">
                <div className="d-flex align-items-center">
                  <BsChatRightQuoteFill size={45} style={{ color: color }} />
                  <div className="ms-3">
                    <div className="fs-7 fw-bolder">UnClosed Rental</div>
                    <h3 className="fs-8 fw-bolder">
                      {unClosedQuotationRequests}
                    </h3>
                    <div className="fs-14">Unclosed Requests</div>
                  </div>
                </div>
              </p>
            </Link>
          ) : (
            <p className="p-3 boxShadow">
              <div className="d-flex align-items-center">
                <BsChatRightQuoteFill size={45} style={{ color: color }} />
                <div className="ms-3">
                  <div className="fs-7 fw-bolder">UnClosed Rental</div>
                  <h3 className="fs-8 fw-bolder">
                    {unClosedQuotationRequests}
                  </h3>
                  <div className="fs-14">Unclosed Requests</div>
                </div>
              </div>
            </p>
          )}
        </Col>

        <Col xs={12} sm={6} lg={4} className="mb-3">
          {role === 'Admin' ? (
            <Link to="/admin/review" className="link-unstyled">
              <p className="p-3 boxShadow">
                <div className="d-flex align-items-center">
                  <FaStar size={45} style={{ color: color }} />

                  <div className="ms-3">
                    <div className="fs-7 fw-bolder">Reviews</div>
                    <h3 className="fs-8 fw-bolder">{reviews}</h3>
                    <div className="fs-14">Unverified Reviews</div>
                  </div>
                </div>
              </p>
            </Link>
          ) : (
            <p className="p-3 boxShadow">
              <div className="d-flex align-items-center">
                <FaStar size={45} style={{ color: color }} />

                <div className="ms-3">
                  <div className="fs-7 fw-bolder">Reviews</div>
                  <h3 className="fs-8 fw-bolder">{reviews}</h3>
                  <div className="fs-14">Unverified Reviews</div>
                </div>
              </div>
            </p>
          )}
        </Col>

        <Col xs={12} sm={6} lg={4} className="mb-3">
          {role === 'Admin' ? (
            <Link to="/admin/rental" className="link-unstyled">
              <p className="p-3 boxShadow">
                <div className="d-flex align-items-center">
                  <BsFillLaptopFill size={45} style={{ color: color }} />

                  <div className="ms-3">
                    <div className="fs-7 fw-bolder">Rental Laptops</div>
                    <h3 className="fs-8 fw-bolder">{rentalLaptopsInHand}</h3>
                    <div className="fs-14">Active Rental laptops in Hand</div>
                  </div>
                </div>
              </p>
            </Link>
          ) : (
            <p className="p-3 boxShadow">
              <div className="d-flex align-items-center">
                <BsFillLaptopFill size={45} style={{ color: color }} />

                <div className="ms-3">
                  <div className="fs-7 fw-bolder">Rental Laptops</div>
                  <h3 className="fs-8 fw-bolder">{rentalLaptopsInHand}</h3>
                  <div className="fs-14">Active Rental laptops in Hand</div>
                </div>
              </div>
            </p>
          )}
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs={12} md={12} lg={12} className="mb-3">
          <p className="p-4 boxShadow">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="fs-4 mb-4 fw-bolder text-start">
                Orders Overview
              </h4>
              <Form>
                <Form.Group controlId="filterDropdown" className="mt-3">
                  {/* <Form.Label>Filter:</Form.Label> */}
                  <Form.Select
                    value={filter}
                    placeholder="Enter the status here"
                    onChange={handleFilterChange}
                  >
                    <option value="" disabled selected>
                      Select an option
                    </option>
                    <option value="dayWise">Day Wise</option>
                    <option value="monthWise">Month Wise</option>
                    <option value="yearWise">Year Wise</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>

            <div className="chart-scroll-container">
              <div className="chart-container">
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      tooltip: {
                        callbacks: {
                          label: function (tooltipItem) {
                            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                          },
                        },
                      },
                    },
                    scales: {
                      x: {
                        stacked: true,
                        title: {
                          display: true,
                          text: 'Date',
                        },
                        ticks: {
                          autoSkip: false,
                        },
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        stacked: true,
                        title: {
                          display: true,
                          text: 'Total Orders',
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </p>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs={12} md={6} lg={12} className="mb-3">
          <p className="p-4 boxShadow">
            <h4 className="fs-4 mb-4 fw-bolder text-start">New Users</h4>
            <TableComponents COLUMNS={COLUMNS} MOCK_DATA={users} />
          </p>
        </Col>

        {role === 'Admin' && (
          <Col xs={12} md={6} lg={12} className="mb-3">
            <p className="p-4 boxShadow">
              <h4 className="fs-4 mb-4 fw-bolder text-start">
                New Transactions
              </h4>
              <TableComponents COLUMNS={COLUMNSS} MOCK_DATA={transaction} />
            </p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
