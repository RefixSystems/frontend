import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Carousel, Image } from 'react-bootstrap';
import { FaWrench, FaClock, FaTruck, FaHeart, FaStar } from 'react-icons/fa';
import Paragraph from '../../components/paragraph';
import { Heading, HeadingWithQuotes } from '../../components/Heading';
import { useGetHomeDetailsQuery } from '../../redux/api/HomeApi';
import { useGetAboutUsQuery } from '../../redux/api/AboutUs';
import NoDataFound from '../../components/NoDataFound';
import FetchLoader from '../../components/FetchLoader';
import { truncateText } from '../../Constants/constant';


const AboutUs = () => {
  const [reviews, setReviews] = useState([]);
  const [data, setData] = useState([]);
  const [section1, setSection1] = useState({});
  const [section2, setSection2] = useState([]);
  const [section3, setSection3] = useState({});
  const [section4, setSection4] = useState([]);

  const { data: HomeData } = useGetHomeDetailsQuery({ phoneNumber: '' });
  const { data: AboutUsData, isLoading } = useGetAboutUsQuery();

  useEffect(() => {
    if (HomeData && HomeData.data) {
      setReviews(HomeData.data.reviews);
    }
  }, [HomeData]);

  useEffect(() => {
    if (AboutUsData && AboutUsData.data) {
      setData(AboutUsData.data);
      setSection1(AboutUsData.data[0]);
      setSection2(AboutUsData.data[1].section2);
      setSection3(AboutUsData.data[2]);
      setSection4(AboutUsData.data[3]);
    }
  }, [AboutUsData]);

  return (
    <Container className="mt-5">
      <HeadingWithQuotes>About us</HeadingWithQuotes>

      {isLoading ? (
        <FetchLoader />
      ) : (
        <div>
          {data && data.length > 0 ? (
            <>
              {section1.title && section1.text && section1.image && (
                
                <Row className="about-section mt-4">
                  
                  <Col
                    lg={6}
                    md={12}
                    className="about-text px-3 py-2 py-md-5 mt-4"
                  >
                   
                   <Card.Title >
                            {section1.title}
                          </Card.Title>
                    <Paragraph>
                      <span className="main fs-5">
                        {section1.text.charAt(0)}
                      </span>
                      {section1.text.slice(1)}
                    </Paragraph>
                  </Col>
                  <Col lg={6} md={12} className="px-3">
                    <img
                      src={section1.image}
                      alt="About Us"
                      style={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'contain',
                      }}
                    />
                  </Col>
                </Row>
              )}

              {section2.length > 0 && (
                <Row className="mt-5 mb-5">
                  {section2.map(
                    (section, index) =>
                      section.title &&
                      section.text && (
                        <Col md={3} key={section._id} className="mb-4 mt-4">
                          <Card className="h-100">
                            <Card.Body className="d-flex flex-column">
                              {index === 0 ? (
                                <div className="service-icon wrench-icon">
                                  <FaWrench size={25} />
                                </div>
                              ) : index === 1 ? (
                                <div className="service-icon clock-icon">
                                  <FaClock size={25} />
                                </div>
                              ) : index === 2 ? (
                                <div className="service-icon truck-icon">
                                  <FaTruck size={25} />
                                </div>
                              ) : index === 3 ? (
                                <div className="service-icon heart-icon">
                                  <FaHeart size={25} />
                                </div>
                              ) : null}
                              <Card.Title>{section.title}</Card.Title>
                              <Card.Text>{section.text}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      )
                  )}
                </Row>
              )}

              {section3.title &&
                section3.text &&
                Array.isArray(section3.images) &&
                section3.images.length > 0 && (
                  <Row className="mt-4">
                    <Card className="p-5">
                      <Row className="about-company-section">
                        <Col
                          md={12}
                          lg={3}
                          className="about-company-text"
                        >
                          <Card.Title className="mt-4">
                            {section3.title}
                          </Card.Title>
                          <p>{section3.text}</p>
                        </Col>
                        {section3.images.map((image, index) => (
                          <Col
                            key={image._id}
                            md={4}
                            lg={3}
                            className="about-company-image mb-4"
                          >
                            <img
                              src={image.image}
                              alt="Our History"
                              style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'contain',
                              }}
                            />
                          </Col>
                        ))}
                      </Row>
                    </Card>
                  </Row>
                )}

              {/* {section4.length > 0 && (
                <Row className="mt-5">
                  <Col>
                    <Heading>Experienced Staff</Heading>
                    <Row className="text-center mt-4">
                      {section4.map(
                        (section, index) =>
                          section.title &&
                          section.text &&
                          section.image && (
                            <Col key={index} md={3} className="mb-4">
                              <Card className="h-100">
                                <Card.Img
                                  alt="topimage"
                                  variant="top"
                                  className="card-img-custom"
                                  src={section.image}
                                  style={{
                                    height: '400px',
                                    objectFit: 'cover',
                                  }}
                                />
                                <Card.Body className="d-flex flex-column">
                                  <Card.Title>{section.title}</Card.Title>
                                  <Card.Subtitle className="mb-2 text-muted text-secondary">
                                    {section.position}
                                  </Card.Subtitle>
                                  <Card.Text className="flex-grow-1">
                                    {section.text}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </Col>
                          )
                      )}
                    </Row>
                  </Col>
                </Row>
              )} */}

              {reviews.length > 0 && (
                <Row className="text-left mt-5  ">
                  <Col>
                    <Heading>What Our Clients Say About Our Services</Heading>
                    <Carousel
                      controls={false}
                      indicators={true}
                      interval={3000}
                      pause={false}
                      className="mt-4"
                    >
                      {reviews.map((review, index) => (
                        <Carousel.Item key={index}>
                          <div className="client-testimonial m-1 ">
                            <div className="d-flex align-items-center flex-sm-row text-center text-sm-start">
                              <Image
                                src={review.profileImage}
                                roundedCircle
                                width={50}
                                height={50}
                                alt={`${review.userName}'s profile`}
                                className="me-2"
                              />
                              <div className='text-start'>
                                <h6 className="mb-1">{review.userName}</h6>
                                <div className="my-1">
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <FaStar
                                      key={i}
                                      color={
                                        i < review.rating
                                          ? '#ffc107'
                                          : 'lightgray'
                                      }
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="m-1 ">{truncateText(review.review, 250)}</p>
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </Col>
                </Row>
              )}
            </>
          ) : (
            <NoDataFound />
          )}
        </div>
      )}
    </Container>
  );
};

export default AboutUs;
