
import React from 'react';

const InputImage = ({ image, valueImage }) => {
  const isValidImage = image && (Array.isArray(image) ? image.length > 0 : true);

  const imageSrc =
    valueImage !== image
      ? image
      : image instanceof File
      ? URL.createObjectURL(image)
      : image;
  const isVideo =
    image instanceof File &&
    ['video/mp4', 'video/avi', 'video/mov', 'video/mkv'].includes(image.type);

  return (
    <>
      {isValidImage ? (
        isVideo ? (
          <video
            width={100}
            height={70}
            controls
            className="mt-3"
            style={{ objectFit: 'contain' }}
          >
            <source src={imageSrc} type={image.type} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={imageSrc}
            width={100}
            height={70}
            alt="image"
            className="mt-3"
            style={{ objectFit: 'contain' }}
          />
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default InputImage;
