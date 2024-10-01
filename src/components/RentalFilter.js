import React, { useState } from 'react';
import {
  Card,
  Form,
  Accordion,
  Col,
  Button,
  Spinner,
  Row,
} from 'react-bootstrap';
import Paragraph from './paragraph';
import BasicButton from './BasicButton';
import 'bootstrap-icons/font/bootstrap-icons.css';
import image from '../../src/assests/images/quality.png';

const RentalFilter = ({
  filters,
  filterOptions,
  handleFilterChange,
  clearFilters,
  handleCustomFilter,
}) => {
  return (
    <>
      <Col xs={12} lg={4} className="mb-4 d-block d-lg-none">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Filters</Accordion.Header>
            <Accordion.Body>
              <Col className="d-flex flex-row justify-content-between align-items-center">
                <h5>Filters</h5>{' '}
                <Paragraph
                  className={'text-primary text-center pointer'}
                  onClick={clearFilters}
                >
                  Clear All
                </Paragraph>
              </Col>
              {Object.keys(filterOptions).map((filterType) => (
                <Accordion className="my-2" key={filterType}>
                  <Accordion.Item eventKey={filterType}>
                    <Accordion.Header>
                      {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    </Accordion.Header>
                    <Accordion.Body>
                      {filterOptions[filterType].map((option) => (
                        <div className="d-flex mx-2" key={option}>
                          <Form.Check
                            type="checkbox"
                            className="pointer"
                            checked={filters[filterType].includes(option)}
                            onChange={() =>
                              handleFilterChange(filterType, option)
                            }
                            id={`${filterType}-${option}`}
                          />
                          <Form.Label
                            htmlFor={`${filterType}-${option}`}
                            className="pointer mx-2"
                          >
                            {option}
                          </Form.Label>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="text-center mt-4">
          <BasicButton
            label={'Customize your Laptop'}
            className="w-100"
            onClick={handleCustomFilter}
          />
        </div>
      </Col>
      <Col xs={12} lg={3} className="d-none d-lg-block">
        <Card className="p-lg-3 p-xs-1 mb-3">
          <Col className="d-flex flex-row justify-content-between align-items-center">
            <h5>Filters</h5>{' '}
            <Paragraph
              className={'text-primary text-center pointer'}
              onClick={clearFilters}
            >
              Clear All
            </Paragraph>
          </Col>
          {Object.keys(filterOptions).map((filterType) => (
            <Accordion className="my-2" key={filterType}>
              <Accordion.Item eventKey={filterType}>
                <Accordion.Header>
                  {filterType === 'operatingSystem'
                    ? 'OS'
                    : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </Accordion.Header>
                <Accordion.Body>
                  {filterOptions[filterType].map((option) => (
                    <div className="d-flex mx-2" key={option}>
                      <Form.Check
                        type="checkbox"
                        className="pointer"
                        checked={filters[filterType].includes(option)}
                        onChange={() => handleFilterChange(filterType, option)}
                        id={`${filterType}-${option}`}
                      />
                      <Form.Label
                        htmlFor={`${filterType}-${option}`}
                        className="pointer mx-2"
                      >
                        {option}
                      </Form.Label>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
        </Card>
        <div className="text-center">
          <BasicButton
            label={'Customize your Laptop'}
            className="w-100"
            onClick={handleCustomFilter}
          />
        </div>
           </Col>
    </>
  );
};

export default RentalFilter;
