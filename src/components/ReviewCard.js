import React, { useState } from 'react';
import {
  Row,
  Col,
  Image,
  Modal,
  Carousel,
  Container,
  Card,
} from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { truncateText } from '../Constants/constant';

const ReviewCard = ({
  userName,
  rating,
  date,
  review,
  images,
  profileImage = 'https://via.placeholder.com/50',
}) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const handleShow = (index) => {
    setStartIndex(index);
    setShowCarousel(true);
  };

  const handleClose = () => setShowCarousel(false);

  const isImage = (url) => {
    const imageExtensions = [
      'jpg',
      'jpeg',
      'png',
      'svg',
      'webp',
      '.mp4',
      '.avi',
      '.mov',
      '.mkv',
    ];
    const extension = url.split('.').pop().toLowerCase();
    return imageExtensions.includes(extension);
  };

  return (
    <Container>
      <Card
        className=""
        style={{
          width: '100%',
          height: '320px',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <Col onClick={() => handleShow(0)}>
          {images.length > 0 && (
            <div className="m-2 ">
              {isImage(images[0]) ? (
                <Image
                  src={images[0]}
                  alt={`Review images 1`}
                  style={{
                    width: '100%',
                    height: '200px',
                    cursor: 'pointer',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <video
                  width="100%"
                  height="200px"
                  controls
                  style={{ objectFit: 'cover', cursor: 'pointer' }}
                >
                  <source src={images[0]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
          <div className="d-flex flex-column align-items-start mx-3">
            <div className="d-flex align-items-center">
              <Image
                src={profileImage ?? 'https://via.placeholder.com/50'}
                roundedCircle
                width={40}
                height={40}
                alt={`${userName}'s profile`}
                className="me-3"
              />

              <div>
                <h6 className="mb-0">{userName}</h6>
                <div className="d-flex">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                      key={index}
                      color={index < rating ? '#ffc107' : 'lightgray'}
                      className="me-1"
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mx-2 my-3">{truncateText(review, 80)}</p>
          </div>
        </Col>
      </Card>

      {/* Modal for displaying carousel */}
      <Modal show={showCarousel} onHide={handleClose} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title> Customer Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              {images.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                >
                  {isImage(images[startIndex]) ? (
                    <img
                      src={images[startIndex]}
                      alt={`Image ${startIndex + 1}`}
                      className="d-block"
                      style={{
                        width: '100%',
                        height: '200px',
                        cursor: 'pointer',
                        display: 'cover',
                      }}
                    />
                  ) : (
                    <video
                      controls
                      style={{
                        width: '100%',
                        height: '200px',
                        cursor: 'pointer',
                        display: 'cover',
                      }}
                    >
                      <source src={images[startIndex]} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
            </Col>
            <Col md={6}>
              <div className="d-flex flex-column align-items-start mt-2">
                <div className="d-flex align-items-start">
                  <Image
                    src={profileImage ?? 'https://via.placeholder.com/50'}
                    roundedCircle
                    width={30}
                    height={30}
                    alt={`${userName}'s profile`}
                    className="me-3"
                  />

                  <div>
                    <h6 className="mb-0 ">{userName}</h6>
                    <div className="d-flex">
                      {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                          key={index}
                          color={index < rating ? '#ffc107' : 'lightgray'}
                          className="me-1"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="m-2">{truncateText(review, 170)}</p>
              </div>
            </Col>
          </Row>
          {images.length > 0 && (
            <div className="d-flex mt-5">
              {images.map((item, index) => (
                <div
                  key={index}
                  className="mx-1"
                  style={{
                    height: '100px',
                    width: '150px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setStartIndex(index)}
                >
                  {isImage(item) ? (
                    <Image
                      src={item}
                      thumbnail
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        width: '150px',
                        height: '100px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <video
                      controls
                      style={{
                        width: '100%',
                        height: '80%',
                        objectFit: 'contain',
                        maxHeight: '400px',
                      }}
                    
                    >
                      <source src={item} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ReviewCard;
