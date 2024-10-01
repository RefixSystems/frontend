import React from 'react';

const InputVideo = ({ video, valueVideo }) => {
  const isValidVideo =
    video && (Array.isArray(video) ? video.length > 0 : true);
  const videoSrc =
    valueVideo !== video
      ? video
      : video instanceof File
        ? URL.createObjectURL(video)
        : video;

  return (
    <>
      {isValidVideo ? (
        <video
          src={videoSrc}
          width={300}
          height={200}
          controls
          className="mt-3"
          style={{ objectFit: 'contain' }}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <></>
      )}
    </>
  );
};

export default InputVideo;
