import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaPhone } from 'react-icons/fa';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { Heading } from '../../components/Heading';
import { useTheme } from '../../Contexts/ThemeContext';
import { useGetGalleryDetailsQuery } from '../../redux/api/HomeApi';

const OurService = () => {
  const { color } = useTheme();
  const { data: GalleryData } = useGetGalleryDetailsQuery();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const places = GalleryData
    ? GalleryData.data.map((place) => ({
        name: place.location,
        address: place.address,
        phone: place.landline,
        mobile: place.mobile,
        images: place.images,
      }))
    : [];

  useEffect(() => {
    if (places.length > 0) {
      setSelectedPlace(places[0]);
    }
  }, [places]);

  const handleWhatsappClick = (mobile) => {
    window.open(`https://wa.me/${mobile}`, '_blank');
  };

  return (
    <Container className="mt-5">
      <Heading>Our Service Location</Heading>

      <Row className="justify-content-center align-items-center gap-4 mt-4">
        {places.map((place, index) => (
          <Col
            key={index}
            md={4}
            lg={3}
            sm={12}
            className="d-flex flex-column justify-content-center align-items-center m-4"
          >
            <Card
              style={{
                width: '100%',
                maxWidth: '18rem',
                border: `1px solid ${color}`,
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
              className="card-header bg-white"
            >
              <Card.Body className="text-center" style={{ padding: '1.5rem' }}>
                <h5
                  className="card-title"
                  style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}
                >
                  {place.name}
                </h5>
                <p
                  className="card-text"
                  style={{ fontSize: '0.875rem', color: '#555' }}
                >
                  {place.address}
                </p>
                <div className="d-block mt-3">
                  <p className="d-flex align-items-center justify-content-center">
                    <FaPhone style={{ marginRight: '0.5rem' }} />{' '}
                    <span>{place.phone}</span>
                  </p>
                  <p className="d-flex align-items-center justify-content-center mt-2">
                    <MdOutlinePhoneAndroid style={{ marginRight: '0.5rem' }} />{' '}
                    <span>{place.mobile}</span>
                  </p>
                </div>
                <Button
                  className="mt-3 w-100"
                  style={{
                    backgroundColor: color,
                    borderColor: color,
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '50px',
                    padding: '0.5rem',
                  }}
                  onClick={() => handleWhatsappClick(place.mobile)}
                >
                  Enquire Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OurService;
