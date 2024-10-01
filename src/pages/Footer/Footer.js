import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Paragraph from '../../components/paragraph';
import { useGetHomeDetailsQuery } from '../../redux/api/HomeApi';
const Footer = () => {
  const navigate = useNavigate();
  const [socialLinks, setSocialLinks] = useState([]);
  const { data: HomeData, isLoading } = useGetHomeDetailsQuery({
    phoneNumber: '',
  });
  useEffect(() => {
    if (HomeData && HomeData.data) {
      setSocialLinks(HomeData?.data?.socialLinks);
    }
  }, [HomeData]);
  return (
    <div
      className="mt-5 pt-4 "
      style={{ backgroundColor: 'rgb(245, 245, 245)' }}
    >
      <Container>
        <Col className="d-flex flex-column">
          <Row className="justify-content-start">
            <Col
              xs={12}
              md={3}
              className="mb-3 pointer"
              onClick={() => navigate('/')}
            >
              <h6 className="main">Refix Systems</h6>
            </Col>
          </Row>
          <Row className="justify-content-start gap-lg-4 gap-xxl-4 gap-xl-4 gap-md-4">
            <Col xs={6} md={3} className="mb-3">
              <Paragraph fontSize={'20px'} fontWeight={600} className="mb-3">
                Company
              </Paragraph>
              <Paragraph
                fontSize={'14px'}
                fontWeight={400}
                onClick={() => navigate('/about-us')}
                className="pointer text-start footer-link"
              >
                About us
              </Paragraph>
              <Paragraph
                fontSize={'14px'}
                fontWeight={400}
                onClick={() => navigate('/contact-us')}
                className="pointer text-start footer-link"
              >
                Contact us
              </Paragraph>
              <Paragraph
                fontSize={'14px'}
                fontWeight={400}
                onClick={() => navigate('/terms-conditions')}
                className="pointer text-start footer-link"
              >
                Terms & Conditions
              </Paragraph>
              <Paragraph
                fontSize={'14px'}
                fontWeight={400}
                onClick={() => navigate('/privacy-policy')}
                className="pointer text-start footer-link"
              >
                Privacy Policy
              </Paragraph>
              <Paragraph
                fontSize={'14px'}
                fontWeight={400}
                onClick={() => navigate('/faq')}
                className="pointer text-start footer-link"
              >
                Faq
              </Paragraph>
            </Col>
            <Col xs={6} md={3} className="mb-3">
              <Paragraph fontSize={'20px'} fontWeight={600} className="mb-3">
                For customers
              </Paragraph>
              <Paragraph
                fontSize={'14px'}
                fontWeight={400}
                onClick={() => navigate('/reviews')}
                className="pointer text-start footer-link"
              >
                Reviews
              </Paragraph>
              <Paragraph
                fontSize={'14px'}
                fontWeight={400}
                onClick={() => navigate('/services')}
                className="pointer text-start footer-link"
              >
                Laptop services
              </Paragraph>
              <Paragraph
                fontSize={'14px'}
                fontWeight={400}
                onClick={() => navigate('/disclaimer')}
                className="pointer text-start footer-link"
              >
                Disclaimer
              </Paragraph>
              {/* <Paragraph
                fontSize={'14px'}
                fontWeight={400}
                onClick={() => navigate('/gallery')}
                className="pointer text-start footer-link"
              >
                Gallery
              </Paragraph> */}
              {/* <Paragraph
                fontSize={'14px'}
                fontWeight={400}
                onClick={() => navigate('/price-comparison')}
                className="pointer text-start footer-link"
              >
                Price & Comparison
              </Paragraph> */}
              <Paragraph
                fontSize={'14px'}
                fontWeight={400}
                onClick={() => navigate('/price-chart')}
                className="pointer text-start footer-link"
              >
                Price Chart
              </Paragraph>
            </Col>
            <Col xs={12} md={3} className="mb-4">
              <Paragraph fontSize={'20px'} fontWeight={600} className="mb-3">
                Social links
              </Paragraph>
              <div className="d-flex flex-row gap-3">
                {socialLinks.map((media) => (
                  <img
                    alt="mediaImage"
                    key={media._id}
                    className="footer-link mb-2"
                    src={media.image}
                    height={20}
                    width={20}
                    style={{
                      objectFit: 'cover',
                      width: '25px',
                      height: '25px',
                    }}
                    onClick={() =>
                      window.open(media.credentialsValue, '_blank')
                    }
                  />
                ))}
              </div>
              <Row className="d-flex justify-content-start mb-5 d-block d-md-none text-dark">
                <Paragraph
                  fontSize={'14px'}
                  fontWeight={400}
                  className="text-start"
                >
                  © Copyright 2024 Refix Systems.All rights reserved.
                </Paragraph>
              </Row>
            </Col>
          </Row>

          <hr className="bg-light" />
          <Row className="d-flex  mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-4 justify-content-start py-2  text-dark d-none d-md-flex">
            <Paragraph
              fontSize={'14px'}
              fontWeight={400}
              className="text-start"
            >
              © Copyright 2024 Refix Systems. All rights reserved.
            </Paragraph>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default Footer;
