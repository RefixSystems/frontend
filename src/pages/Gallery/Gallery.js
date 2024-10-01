import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { HeadingWithQuotes } from '../../components/Heading';
import { useGetGalleryDetailsQuery } from '../../redux/api/HomeApi';
import Paragraph from '../../components/paragraph';
import FetchLoader from '../../components/FetchLoader';
import NoDataFound from '../../components/NoDataFound';

const Gallery = () => {
  const [data, setData] = useState([]);
  const { data: GalleryData, isFetching } = useGetGalleryDetailsQuery();

  useEffect(() => {
    if (GalleryData && GalleryData.data) {
      setData(GalleryData.data);
    }
  }, [GalleryData]);

  return (
<Container>
      <Row className="about-header">
        <Col className="text-center mt-5">
          <HeadingWithQuotes>Gallery</HeadingWithQuotes>
        </Col>
      </Row>
      {isFetching ? (
        <FetchLoader />
      ) : (
        <>
          {data.length === 0 ? (
            <Row className="my-4">
              <Col className="text-center">
               <NoDataFound/>
              </Col>
            </Row>
          ) : (
            data.map((gallery) => (
              <div className="my-4" key={gallery._id}>
                <h5 className="my-2 text-md-start text-center" style={{ color: 'black' }}>
                  {gallery.location}
                </h5>
                <div>
                  <Paragraph fontWeight={400} fontSize={'16px'} className="text-md-start text-center">
                    {gallery.address}
                  </Paragraph>
                  <Row className="justify-content-md-start justify-content-sm-center">
                    {gallery.images.map((img) => (
                      <Col xs={12} md={6} lg={3} key={img._id} className="d-flex justify-content-center">
                        <Image
                          alt="image"
                          src={img.image}
                          fluid
                          className="border"
                          style={{
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            marginBottom: '10px',
                            width: '300px',
                            height: '200px',
                            objectFit: 'contain',
                          }}
                        />
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </Container>


  )}
  export default Gallery;
