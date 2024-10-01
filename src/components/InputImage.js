import React from 'react';

const InputImage = ({ image, valueImage }) => {
  const isValidImage =
    image && (Array.isArray(image) ? image.length > 0 : true);

  const imageSrc =
    valueImage !== image
      ? image
      : image instanceof File
        ? URL.createObjectURL(image)
        : image;

  return (
    <>
      {isValidImage ? (
        <img
          src={imageSrc}
          width={100}
          height={70}
          alt="image"
          className="mt-3"
          style={{ objectFit: 'contain' }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default InputImage;
