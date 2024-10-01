import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Laptop from '../assests/images/laptop.webp';
import { Col } from 'react-bootstrap';
import Paragraph from './paragraph';
import { useNavigate } from 'react-router-dom';
import AddQuoteModal from './AddQuoteModel';
import SuccessModal from './SuccessModal';
import { useAddQuoteMutation } from '../redux/api/RentApi';
import { truncateText } from '../Constants/constant';
import { FaCircle } from 'react-icons/fa';

const SimilarProducts = ({ similarProduct = [] }) => {
  const navigate = useNavigate();
  const [laptopId, setLaptopId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModel] = useState(false);
  const [errorLottie, setErrorLottie] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [addQuote, { isLoading: quoteLoader }] = useAddQuoteMutation();

  const navigateToRentDetails = (laptop) => {
    window.scrollTo(0, 0);
    navigate(
      laptop.amount ? '/refurbished/refurbished-details' : '/rent/rent-details',
      { state: { laptop, similarProduct } }
    );
  };

  const handleAddQuote = async (values) => {
    const data = {
      phoneNumber: values.phoneNumber,
      userName: values.userName,
      email: values.email,
      laptopId: laptopId,
      rentalDays: values.rentalDays,
    };

    try {
      const response = await addQuote(data);

      if (response?.data) {
        setShowModal(false);
        setErrorLottie(false);
        setSuccessMessage(response?.data?.message);
        setShowSuccessModel(true);
        setTimeout(() => setShowSuccessModel(false), 4000);
        setLaptopId('');
      } else {
        setShowModal(false);
        setErrorLottie(true);
        setSuccessMessage(response?.error?.data.error);
        setShowSuccessModel(true);
        setTimeout(() => setShowSuccessModel(false), 4000);
        setLaptopId('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
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
    <div className="similar-products w-100">
      {similarProduct.length > 0 && (
        <h4 className="text-center mt-4 mb-4">You May Also Like</h4>
      )}
      {similarProduct.length > 0 && (
        <Carousel responsive={responsive} showDots={false}>
          {similarProduct.map((laptop, index) => (
            <div key={index} className="rounded-0 mb-2 p-2 mx-3 products-card">
              <Col
                className="d-flex justify-content-center align-items-center w-100 pointer"
                onClick={() => navigateToRentDetails(laptop)}
              >
                <img
                  src={laptop.image ?? Laptop}
                  alt="Laptop"
                  className="products-image"
                />
              </Col>
              <Col className="my-1 text-center">
                <Paragraph
                  className={'p-0 m-0'}
                  fontSize={'15px'}
                  fontWeight={800}
                >
                  {laptop.brand}
                </Paragraph>
                <Paragraph
                  className="fw-0 text-wrap p-0 m-0 pointer products-description"
                  fontSize="11px"
                  fontWeight={400}
                  onClick={() => navigateToRentDetails(laptop)}
                >
                  {truncateText(
                    laptop.model +
                      ' (' +
                      laptop.ram +
                      ' ' +
                      laptop.storage +
                      ' ' +
                      laptop.operatingSystem +
                      ' )',
                    42
                  )}
                </Paragraph>
              </Col>
              <div className="p-0 m-0 d-flex w-100 flex-row justify-content-center align-items-center">
                <FaCircle className="text-start" color={laptop.color} />
              </div>
            </div>
          ))}
        </Carousel>
      )}
      <AddQuoteModal
        handleAddQuote={handleAddQuote}
        handleClose={() => setShowModal(false)}
        show={showModal}
        isLoading={quoteLoader}
      />
      <SuccessModal
        showModal={showSuccessModal}
        setShowModal={setShowSuccessModel}
        successMessage={successMessage}
        error={errorLottie}
      />
    </div>
  );
};

export default SimilarProducts;
