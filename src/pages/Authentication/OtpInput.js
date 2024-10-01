import React, { useState, useEffect } from 'react';

const OtpInput = ({ numInputs, value, onChange }) => {
  const [activeInput, setActiveInput] = useState(0);

  useEffect(() => {
    if (activeInput < numInputs) {
      document.getElementById(`otp-input-${activeInput}`).focus();
    }
  }, [activeInput, numInputs]);

  const handleChange = (e, index) => {
    const { value: inputValue } = e.target;
    if (/^[0-9]$/.test(inputValue) || inputValue === '') {
      const newOtp = value.split('');
      newOtp[index] = inputValue;
      onChange(newOtp.join(''));
      if (inputValue !== '' && index < numInputs - 1) {
        setActiveInput(index + 1);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0) {
      setActiveInput(index - 1);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < numInputs - 1) {
      setActiveInput(index + 1);
    }
  };

  const handleFocus = (index) => {
    setActiveInput(index);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {Array.from({ length: numInputs }).map((_, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={() => handleFocus(index)}
          maxLength={1}
          style={{
            width: '2rem',
            height: '2rem',
            margin: '0 0.5rem',
            fontSize: '1rem',
            borderRadius: 4,
            border: '1px solid rgba(0,0,0,0.3)',
            textAlign: 'center',
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
