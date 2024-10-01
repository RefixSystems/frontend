import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Paragraph from '../../components/paragraph';
import { details } from './details';
import { HeadingWithQuotes } from '../../components/Heading';

const TermsAndCondition = () => {
  return (
    <Container fluid className="mt-5">
      <HeadingWithQuotes>Terms and Conditions</HeadingWithQuotes>
      <Paragraph fontSize={'16px'} fontWeight={400}>
        <span className="main fs-5">B</span>y using our website and services,
        you agree to comply with and be bound by the following terms and
        conditions. Please read these terms carefully.
      </Paragraph>
      {details.map((detail) => {
        return (
          <Col key={detail.id} className="mt-4">
            <h5 className="text-start">
              {detail.id}
              {'. '}
              {detail.heading}
            </h5>
            {detail.content && (
              <Paragraph fontSize={'16px'} fontWeight={400}>
                {detail.content}
              </Paragraph>
            )}
            {detail.points && (
              <ul>
                {detail.points.map((point, index) => (
                  <li key={index}>
                    <Paragraph fontSize={'16px'} fontWeight={400}>
                      {point}
                    </Paragraph>
                  </li>
                ))}
              </ul>
            )}
          </Col>
        );
      })}
    </Container>
  );
};

export default TermsAndCondition;
