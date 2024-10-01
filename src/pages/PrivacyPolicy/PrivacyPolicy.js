import React from 'react';
import { Col, Container } from 'react-bootstrap';
import { details } from './details';
import Paragraph from '../../components/paragraph';
import { HeadingWithQuotes } from '../../components/Heading';

const PrivacyPolicy = () => {
  return (
    <Container fluid className="mt-5">
      <HeadingWithQuotes>Privacy Policy</HeadingWithQuotes>
      <Paragraph fontSize={'16px'} fontWeight={400}>
        <span className="main fs-5">R</span>efix Systems is committed to
        protecting your privacy. This Privacy Policy outlines how we collect,
        use, disclose, and safeguard your information when you visit our website
        or use our services. By accessing our site and services, you agree to
        the terms of this policy.
      </Paragraph>
      {details.map((details) => {
        return (
          <Col id={details.id} key={details.id}>
            <h5 className="text-start mt-4">{details.heading}</h5>
            <Paragraph fontSize={'16px'} fontWeight={400}>
              {details.content}
            </Paragraph>
          </Col>
        );
      })}
    </Container>
  );
};

export default PrivacyPolicy;
