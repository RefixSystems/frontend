// src/components/RequestIdCell.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RequestIdCell = ({ requestId,type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const encodedRequestId = encodeURIComponent(requestId);


    if (type === 'Rental') {
      navigate(`/admin/rentalOrder-details/${encodedRequestId}`);
    } else if (type === 'Repair') {
      navigate(`/admin/repairOrder-details/${encodedRequestId}`);
    }
    else if (type === 'Refurbished') {
      navigate(`/admin/refurbishedOrder-details/${encodedRequestId}`);
    }
  };

  return (
    <span
      onClick={handleClick}
      style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
    >
      {requestId}
    </span>
  );
};

export default RequestIdCell;
