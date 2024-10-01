import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Reviews from './Review';
import { useGetUserReviewsQuery } from '../../redux/api/ReviewsApi';
import FetchLoader from '../../components/FetchLoader';

const FooterReview = () => {
  const [reviews, setReviews] = useState([]);
  const { data: ReviewData, isLoading, isFetching } = useGetUserReviewsQuery();
  useEffect(() => {
    if (ReviewData && ReviewData.data) {
      setReviews(ReviewData?.data);
    }
  }, [ReviewData, reviews]);

  return (
    <Container>
      {isFetching ? <FetchLoader /> : <Reviews reviews={reviews} />}
    </Container>
  );
};

export default FooterReview;
