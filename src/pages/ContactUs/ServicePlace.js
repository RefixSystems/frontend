import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { FaPhone } from 'react-icons/fa6';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { handleWhatsappClick } from '../../Constants/constant';
import { useTheme } from '../../Contexts/ThemeContext';

const ServicePlace = ({ subplace }) => {
  const { color } = useTheme();
  return (
    <Card
      style={{
        width: '18rem',
        height: '250px',
        border: `1px solid ${color}`,
        boxShadow: ' 0 0 20px #00000033',
        backgroundColor: 'white',
        borderRadius: '8%',
      }}
      className=" card-header bg-white mt-4"
    >
      <p className="state-address"> {subplace.name}</p>
      <Card.Body className="text-center mt-5" style={{ fontSize: '12px' }}>
        <span className="mt-5" style={{}}>
          {subplace.address}
        </span>
        <br />

        <br />
        <span className="d-block mt-2">
          <FaPhone /> <span className="">{subplace.phone}</span>
        </span>
        <span className="d-block mt-2">
          <MdOutlinePhoneAndroid />
          <span className="">{subplace.mobile}</span>
        </span>
        <Button
          className="bg-main mt-3 w-100"
          style={{
            backgroundColor: color,
            boxShadow: '0 0 10px gainsboro',
            borderRadius: '44px',
          }}
          onClick={() => handleWhatsappClick(subplace.mobile)}
        >
          Enquire Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ServicePlace;
