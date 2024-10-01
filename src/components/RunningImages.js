const RunningImages = ({ brandImages }) => {
  const total = brandImages.length;
  const duration = total * 2;

  return (
    <div className="wrapper">
      {brandImages.map((image, index) => (
        <img
          alt="image"
          key={index}
          src={image.image}
          className="item px-2  mt-4"
          style={{
            animationDuration: `${duration}s`, 
            animationDelay: `calc(${duration}s / ${total} * -${index + 1})`, 
          }}
        />
      ))}
    </div>
  );
};

export default RunningImages;
