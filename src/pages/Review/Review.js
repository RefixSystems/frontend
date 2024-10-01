import React from 'react';
import { Col, Container, Row, } from 'react-bootstrap';
import ReviewComponent from '../../components/ReviewComponent';
import { Heading, HeadingWithQuotes } from '../../components/Heading';
import NoAccess from '../../components/NoAccess';
import NoDataFound from '../../components/NoDataFound';

const Reviews = ({ reviews = [] }) => {
  return (
    <Container fluid className="mt-5">
      <HeadingWithQuotes>Ratings and Reviews</HeadingWithQuotes>
      {reviews.length > 0 ? (
        <>
          {reviews.map((review) => (
            <ReviewComponent key={review._id} {...review} />
          ))}
        </>
      ) : (
        <>
          <Row className="justify-content-center ">
            <Col xs="auto" className="justify-content-center align-item-center">
              <div>
                <NoDataFound />
                <Heading>No Reviews Found</Heading>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Reviews;
