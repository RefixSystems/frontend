import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { ImCross } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import { useGetPriceComparisonQuery } from '../../redux/api/PriceComparisonApi';
import { useTheme } from '../../Contexts/ThemeContext';
import FetchLoader from '../../components/FetchLoader';
import NoDataFound from '../../components/NoDataFound';

const PriceandComparison = () => {
  const { color } = useTheme();
  const { data: PriceComparisonData, isLoading: priceComparisonLoader } =
    useGetPriceComparisonQuery();
  const [priceComparison, setPriceComparison] = useState([]);

  // Use static data for now
  useEffect(() => {
    setPriceComparison([
      {
        nameOfFeature: 'Free Pickup & Drop',
        serviceCenter: false,
        localShop: false,
        ourServices: true,
      },
      {
        nameOfFeature: 'Expert Technician',
        serviceCenter: true,
        localShop: false,
        ourServices: true,
      },
      {
        nameOfFeature: '6 Month Warranty',
        serviceCenter: false,
        localShop: false,
        ourServices: true,
      },
      {
        nameOfFeature: 'Affordable ',
        serviceCenter: false,
        localShop: true,
        ourServices: true,
      },
      {
        nameOfFeature: 'Quality Spares',
        serviceCenter: true,
        localShop: false,
        ourServices: true,
      },
      {
        nameOfFeature: 'Free Diagnosis',
        serviceCenter: false,
        localShop: false,
        ourServices: true,
      },
    ]);
  }, []);

  const renderIcon = (isAvailable) => {
    return isAvailable ? (
      <FaCheck style={{ color: 'green' }} />
    ) : (
      <ImCross style={{ color: 'red' }} />
    );
  };

  return (
    <>
      <Container fluid>
        <h4 className="text-center mt-5">Price and Comparison</h4>
      </Container>

      <Container fluid style={{ overflowX: 'auto' }}>
        {priceComparisonLoader ? (
          <FetchLoader />
        ) : priceComparison.length > 0 ? (
          <Container className="mt-5">
            <Row className="flex-nowrap">
              {/* Features Column */}
              <Col
                lg={3}
                md={3}
                sm={6}
                xs={12}
                className="mb-3 mt-4"
                style={{ minWidth: '250px' }}
              >
                <Table
                  className="mt-3"
                  bordered
                  style={{
                    backgroundColor: '#fff',
                    padding: '10px',
                    color: '#424242',
                    textAlign: 'center',
                    boxShadow: '0 1px 20px rgba(0, 0, 0, .2)',
                    border: '1px solid #ddd',
                  }}
                >
                  <tbody>
                    {priceComparison.map((comparison, index) => (
                      <tr key={index}>
                        <td>{comparison.nameOfFeature}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>

              {/* Comparison Columns */}
              <Col
                lg={3}
                md={3}
                sm={6}
                xs={12}
                className="mb-3"
                style={{ minWidth: '250px' }}
              >
                <Table
                  bordered
                  style={{
                    backgroundColor: '#fff',
                    padding: '10px',
                    color: '#424242',
                    textAlign: 'center',
                    boxShadow: '0 1px 20px rgba(0, 0, 0, .2)',
                    border: '1px solid #ddd',
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: '#e0e0e0', color: '#000' }}>
                        Authorised Service Center
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceComparison.map((comparison, index) => (
                      <tr key={index}>
                        <td>{renderIcon(comparison.serviceCenter)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>

              <Col
                lg={3}
                md={3}
                sm={6}
                xs={12}
                className="mb-3"
                style={{ minWidth: '250px' }}
              >
                <Table
                  bordered
                  style={{
                    backgroundColor: '#fff',
                    padding: '10px',
                    color: '#424242',
                    textAlign: 'center',
                    boxShadow: '0 1px 20px rgba(0, 0, 0, .2)',
                    border: '1px solid #ddd',
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: '#e0e0e0', color: '#000' }}>
                        Local Shop
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceComparison.map((comparison, index) => (
                      <tr key={index}>
                        <td>{renderIcon(comparison.localShop)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>

              <Col
                lg={3}
                md={3}
                sm={6}
                xs={12}
                className="mb-3"
                style={{ minWidth: '250px' }}
              >
                <Table
                  bordered
                  style={{
                    backgroundColor: '#fff',
                    padding: '10px',
                    color: '#424242',
                    textAlign: 'center',
                    boxShadow: '0 1px 20px rgba(0, 0, 0, .2)',
                    border: '1px solid #ddd',
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: '#f67b25', color: '#fff' }}>
                        Refix System Service
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceComparison.map((comparison, index) => (
                      <tr key={index}>
                        <td>{renderIcon(comparison.ourServices)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        ) : (
          <NoDataFound />
        )}
      </Container>
    </>
  );
};

export default PriceandComparison;
