import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import section14 from '../../assests/images/section1-4.webp';
import windows from '../../assests/images/windows.webp';
import ubuntu from '../../assests/images/ubuntu.webp';
import linux from '../../assests/images/linux.webp';
import mac from '../../assests/images/mac.webp';
import { useNavigate } from 'react-router-dom';
import ComingSoonModal from '../../components/ComingSoonModal';
import { Heading, HeadingWithQuotes } from '../../components/Heading';
import NoDataFound from '../../components/NoDataFound';

const SectionOne = ({ category, banners, videoUrl = [] }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [modalText, setModalText] = useState('');
  const [imageLoaded, setImageLoaded] = useState({});
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    // Check if all images have loaded
    const allLoaded = Object.values(imageLoaded).every((loaded) => loaded);
    setAllImagesLoaded(allLoaded);
  }, [imageLoaded]);

  const handleImageLoad = (id) => {
    setImageLoaded((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleShow = (text) => {
    setModalText(text);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const laptopNames = [
    { id: 1, text: 'Windows', src: windows },
    { id: 2, text: 'Linux', src: linux },
    { id: 3, text: 'macOS', src: mac },
    { id: 4, text: 'Ubuntu', src: ubuntu },
  ];

  const categoryWithPaths = category.map((item) => {
    let path = '';
    let textToSend = false;
    let text = 'Quick';

    if (item.category === 'Rental') path = '/rent';
    if (item.category === 'Refurbished') path = '/refurbished';
    if (item.category === 'Repair & Service') path = '/repair-service';
    if (item.category === 'Quick Services') path = '/repair-service';

    return {
      ...item,
      path,
      onClick:
        item.status === 'Active'
          ? path
            ? () =>
                item.category === 'Quick Services'
                  ? navigate(path, { state: { textToSend, text } })
                  : navigate(path)
            : () => handleShow('Coming Soon')
          : () => handleShow('Coming Soon'),
    };
  });

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-between align-items-center mt-5 "
    >
      <Col>
        <HeadingWithQuotes>
          Your One-Stop Solution for Laptops
        </HeadingWithQuotes>
      </Col>

      <Container>
        <Row className="justify-content-center mt-4">
          <Col md={6}>
            <Card className="p-3 shadow border border-secondary rounded-0">
              <h1
                className="text-center text-dark fw-600"
                style={{ fontSize: '16px' }}
              >
                Home Services at your Doorstep
              </h1>

              {categoryWithPaths.length > 0 ? (
                <Row>
                  {categoryWithPaths.map((service) => (
                    <Col
                      key={service._id}
                      xs={6}
                      sm={6}
                      md={6}
                      className="pointer mt-3 underline-on-hover d-flex flex-column justify-content-center align-items-center p-1"
                      onClick={() => {
                        service.onClick();
                      }}
                    >
                      {!imageLoaded[service._id] && (
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      )}
                      <img
                        src={service.image}
                        width={150}
                        height={100}
                        alt={service.category}
                        onLoad={() => handleImageLoad(service._id)}
                        style={{
                          display: imageLoaded[service._id] ? 'block' : 'none',
                          objectFit: 'contain',
                          maxWidth: window.innerWidth < 768 ? '90%' : '100%',
                          maxHeight: window.innerWidth < 768 ? '90%' : '100%',
                        }}
                      />
                      <p className="text-dark text-center fs-16 fw-400 mt-2 ">
                        {service.category}
                      </p>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Row className="justify-content-center">
                  <Col
                    xs="auto"
                    className="justify-content-center align-item-center"
                  >
                    <NoDataFound />
                  </Col>
                </Row>
              )}
            </Card>
          </Col>

          <Col md={6} className=" d-none d-md-block">
            <video
              src={
                videoUrl.length > 0
                  ? videoUrl[0].image
                  : 'https://storage.googleapis.com/meetinground-464c9.appspot.com/images%2F1721200351410_km_20240712-1_1080p_30f_20240712_143520%20(1).mp4'
              }
              loop
              autoPlay
              muted
              className="mb-3"
              controls={false}
              width={'100%'}
              height={'405px'}
              style={{
                objectFit: 'cover',
              }}
            />
          </Col>
        </Row>
      </Container>

      <Col className="w-100 ">
        <Col>
          {banners.length > 0 && (
            <Col className="mt-5 ">
              <Heading>
                Amazing Deals - Exciting Offers for Minimum Value!
              </Heading>
            </Col>
          )}
        </Col>

        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          arrows={false}
          autoPlaySpeed={2000}
          showDots={false}
          indicators={false}
        >
          {banners.map((src, index) => (
            <div
              key={index}
              className=" mx-1 transparent  mt-4"
              style={{ height: '200px' }}
            >
              <img
                src={src}
                width={'100%'}
                height={'100%'}
                alt={`Banner ${index + 1}`}
                style={{ objectFit: 'fit' }}
              />
            </div>
          ))}
        </Carousel>
      </Col>
      <ComingSoonModal show={show} handleClose={handleClose} text={modalText} />
    </Container>
  );
};

export default SectionOne;
