import React, { useState, useEffect, useRef } from 'react';
import { Table, Container, Col, Row, Form, Spinner } from 'react-bootstrap';
import { Heading, HeadingWithQuotes } from '../../components/Heading';
import {
  useGetPriceChartQuery,
  useGetPriceChartsQuery,
} from '../../redux/api/PriceChartApi';
import { useTheme } from '../../Contexts/ThemeContext';
import FetchLoader from '../../components/FetchLoader';
import NoDataFound from '../../components/NoDataFound';
import { BsSearch } from 'react-icons/bs';
import { FaChevronDown, FaChevronUp, FaXmark } from 'react-icons/fa6';

const PriceChart = () => {
  const { color } = useTheme();
  const { data, isLoading } = useGetPriceChartQuery();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [visibleComponent, setVisibleComponent] = useState(null);

  const searchRef = useRef(null);
  const { data: SearchData, isFetching: searchLoader } = useGetPriceChartsQuery(
    { query: searchValue }
  );

  useEffect(() => {
    if (SearchData && SearchData.data) {
      const filteredData = SearchData.data
        .map((component) => {
          const componentMatches = component.component
            .toLowerCase()
            .includes(searchValue.toLowerCase());
          const matchingDetails = component.details.filter((item) =>
            item.description.toLowerCase().includes(searchValue.toLowerCase())
          );

          return {
            ...component,
            details:
              componentMatches && matchingDetails.length === 0
                ? component.details
                : matchingDetails,
          };
        })
        .filter(
          (component) =>
            component.details.length > 0 ||
            component.component
              .toLowerCase()
              .includes(searchValue.toLowerCase())
        );

      setSearchData(filteredData);
    } else {
      setSearchData([]);
    }
  }, [SearchData, searchValue]);

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setShowSearchResults(value.trim().length > 0);
  };

  const hasData =
    data &&
    data.data &&
    data.data.length > 0 &&
    data.data.some(
      (component) => component.details && component.details.length > 0
    );

  const filteredData = data?.data.filter((component) =>
    component.component.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTableVisibility = (component) => {
    if (visibleComponent === component) {
      setVisibleComponent(null);
    } else {
      setVisibleComponent(component);
    }
  };

  return (
    <div>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <>
          <Container fluid className="mt-5">
            <HeadingWithQuotes>Price Chart</HeadingWithQuotes>
          </Container>

          <Col
            className={`col-6 col-md-4 col-lg-3 mx-3 mt-2 ml-5 ${isScrolled ? 'd-none d-lg-flex' : ''} justify-content-md-start justify-content-center align-items-center`}
          >
            <Form
              className="border rounded d-flex align-items-center position-relative w-100"
              ref={searchRef}
            >
              <Form.Control
                type="text"
                placeholder="Search here"
                aria-label="Search"
                className="border-0"
                style={{ paddingLeft: '10px' }}
                value={searchValue}
                onChange={handleSearchInputChange}
                onClick={() => setShowSearchResults(true)}
              />
              {!searchValue.length > 0 ? (
                <div
                  className="p-1 position-absolute"
                  style={{
                    right: '5px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <BsSearch className="pointer" />
                </div>
              ) : (
                <div
                  className="bg-light p-1 position-absolute"
                  style={{
                    right: '5px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <FaXmark
                    className="pointer"
                    onClick={() => {
                      setSearchValue('');
                      setSearchData([]);
                      setShowSearchResults(false);
                    }}
                  />
                </div>
              )}
            </Form>
          </Col>

          {/* Render the filtered Price Chart or No Data Found */}
          {showSearchResults ? (
            searchData.length > 0 ? (
              <Container className='mt-4'>
                {searchData.map((component, index) => (
                  <div key={index}>
                    <Row className="p-2" key={index}>
                    <Col>
                      <div
                        className="subtitle mx-3 d-flex justify-content-between align-items-center"
                        onClick={() =>
                          toggleTableVisibility(component.component)
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        <h5 style={{ color , fontSize:'18px' }}>{component.component}</h5>
                        {visibleComponent === component.component ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </div>
                      {visibleComponent === component.component && (
                        <Row className="justify-content-center mt-3">
                          <Col lg={10} md={10} sm={12}>
                            <Table bordered hover responsive>
                              <thead>
                                <tr>
                                  <th>Description</th>
                                  <th>Labour Charge</th>
                                  <th>Component Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {component.details.map((item, idx) => (
                                  <tr key={idx}>
                                    <td>{item.description}</td>
                                    <td>₹{item.labourCharge}</td>
                                    <td>
                                      {item.serviceCharge !== null
                                        ? `₹${item.serviceCharge}`
                                        : 'Depends on Model'}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      )}
                      <hr />
                    </Col>
                  </Row>
            
                  </div>
                ))}
              </Container>
            ) : (
              <Row className="justify-content-center">
                <Col
                  xs="auto"
                  className="justify-content-center align-item-center"
                >
                  <div>
                    <NoDataFound />
                    <Heading>No data available for the price chart</Heading>
                  </div>
                </Col>
              </Row>
            )
          ) : hasData ? (
            <Container className='mt-4'>
              {data.data.map((component, index) => (
                <div key={index}>
                <Row className="p-2" key={index}>
                    <Col>
                      <div
                        className="subtitle mx-3 d-flex justify-content-between align-items-center"
                        onClick={() =>
                          toggleTableVisibility(component.component)
                        }
                        style={{ cursor: 'pointer' }}
                      >
                        <h5 style={{ color,fontSize:'18px' }}>{component.component}</h5>
                        {visibleComponent === component.component ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </div>
                      {visibleComponent === component.component && (
                        <Row className="justify-content-center mt-3">
                          <Col lg={10} md={10} sm={12}>
                            <Table bordered hover responsive>
                              <thead>
                                <tr>
                                  <th>Description</th>
                                  <th>Labour Charge</th>
                                  <th>Component Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {component.details.map((item, idx) => (
                                  <tr key={idx}>
                                    <td>{item.description}</td>
                                    <td>₹{item.labourCharge}</td>
                                    <td>
                                      {item.serviceCharge !== null
                                        ? `₹${item.serviceCharge}`
                                        : 'Depends on Model'}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      )}
                      <hr />
                    </Col>
                  </Row>
                </div>
              ))}
            </Container>
          ) : (
            <Row className="justify-content-center">
              <Col
                xs="auto"
                className="justify-content-center align-item-center"
              >
                <div>
                  <NoDataFound />
                  <Heading>No Price Chart Data</Heading>
                </div>
              </Col>
            </Row>
          )}
        </>
      )}
    </div>
  );
};

export default PriceChart;
