import React, { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const QuantityButton = ({ id, quantity, setQuantity }) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const handleInputClick = () => {
    setIsReadOnly(false);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 50) {
      setQuantity(value);
    } else if (value > 50) {
      setQuantity(50);
    } else {
      setQuantity(1);
    }
  };

  const handleInputBlur = () => {
    setIsReadOnly(true);
    if (quantity < 1) {
      setQuantity(1);
    } else if (quantity > 50) {
      setQuantity(50);
    }
  };

  return (
    <div key={id} className="d-flex align-items-center my-auto">
      <Button
        className="d-flex align-items-center justify-content-center p-1 m-0"
        variant="outline-danger"
        style={{ width: '30px', height: '25px' }}
        onClick={decrement}
        disabled={quantity === 1}
      >
        <FaMinus />
      </Button>
      <InputGroup
        className="mx-2"
        style={{
          width: '40px',
        }}
      >
        <FormControl
          style={{
            width: '40px',
            height: '25px',
            fontSize: '12px',
          }}
          type="text"
          value={quantity}
          readOnly={isReadOnly}
          className="text-center"
          onClick={handleInputClick}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      </InputGroup>
      <Button
        className="d-flex align-items-center justify-content-center p-1 m-0"
        variant="outline-success"
        style={{ width: '30px', height: '25px' }}
        onClick={increment}
        disabled={quantity === 50}
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default QuantityButton;
