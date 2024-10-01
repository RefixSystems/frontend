import React, { useState } from 'react';
import { Row, Col, Image, Modal, Carousel, Container } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { truncateText } from '../Constants/constant';

const ReviewComponent = ({
  userName,
  rating,
  date,
  review,
  images,
  profileImage = 'https://via.placeholder.com/50',
}) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleShow = (index) => {
    setCurrentIndex(index);
    setShowCarousel(true);
  };
  const handleClose = () => setShowCarousel(false);

  const isImage = (url) => /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(url);
  const isVideo = (url) => /\.(mp4|avi|mov|mkv)$/i.test(url);

  return (
    <Container className="w-100">
      <Row className="my-3 p-3 border rounded mt-4">
        <Col className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Image
                src={profileImage ?? 'https://via.placeholder.com/50'}
                roundedCircle
                width={50}
                height={50}
                alt={`${userName}'s profile`}
                className="me-2"
              />
              <h6 className="mb-0">{truncateText(userName , 16) }</h6>
            </div>
            <small className="text-muted">{date}</small>
          </div>
          <div className="my-1">
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                color={index < rating ? '#ffc107' : 'lightgray'}
              />
            ))}
          </div>
          <p className="mb-0">{review}</p>
          {images.length > 0 && (
            <div className="d-flex mt-3 ">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="mx-1 mb-2"
                  style={{
                    maxHeight: '100px',
                    maxWidth: '150px',
                    width: '150px',
                    cursor: 'pointer',
                    flex: '1 1 calc(50% - 10px)',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleShow(index)}
                >
                  {isImage(image) ? (
                    <Image
                      src={image}
                      thumbnail
                      alt={`Review media ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  ) : isVideo(image) ? (
                    
                      <video
                      key={index}
                        controls
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleShow(index)}

                      >
                        <source src={image} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                  
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>

      {/* Modal for displaying carousel */}
      <Modal
        show={showCarousel}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Reviews</Modal.Title>
        </Modal.Header>
        <Col style={{ maxHeight: '400px',  overflowY: 'scroll' }}>
          <Modal.Body>
            {images.length > 1 ? (
              <Carousel
                infinite={true}
                autoPlay={false}
                arrows={true}
                keyBoardControl={true}
                className="mt-4"
                activeIndex={currentIndex}
                onSelect={(selectedIndex) => setCurrentIndex(selectedIndex)}
                interval={null}
              >
                {images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                        maxHeight: '400px',
                      }}
                    >
                      {isImage(image) ? (
                        <img
                          src={image}
                          alt={`Carousel media ${index + 1}`}
                          className="d-block"
                          style={{
                            width: '250px',
                            height: '250px',
                            objectFit: 'contain',
                          }}
                        />
                      ) : isVideo(image) ? (
                        <video
                          controls
                          style={{
                            width: '250px',
                            height: '250px',
                            objectFit: 'contain',
                          }}
                        >
                          <source src={image} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : null}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : images.length === 1 ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  maxHeight: '400px',
                }}
              >
                {isImage(images[0]) ? (
                  <img
                    src={images[0]}
                    alt="Single Image"
                    className="d-block"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      maxHeight: '400px',
                    }}
                  />
                ) : isVideo(images[0]) ? (
                  <video
                    controls
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      maxHeight: '400px',
                    }}
                  >
                    <source src={images[0]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </div>
            ) : null}
            <hr />
            <Row className="align-items-center mt-3">
              {/* Profile Image */}
              <Col xs="auto">
                <Image
                  src={profileImage ?? 'https://via.placeholder.com/50'}
                  roundedCircle
                  width={50}
                  height={50}
                  alt={`${userName}'s profile`}
                  className="me-2"
                />
              </Col>
              {/* Name and Rating */}
              <Col>
                <div>
                  <h6 className="mb-0">{userName}</h6>
                  <div>
                    {Array.from({ length: 5 }, (_, index) => (
                      <FaStar
                        key={index}
                        color={index < rating ? '#ffc107' : 'lightgray'}
                      />
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
            {/* Review Text */}
            <div className="mt-3 mx-3">
              <p>{review}</p>
            </div>
          </Modal.Body>
        </Col>
      </Modal>
    </Container>
  );
};

export default ReviewComponent;
