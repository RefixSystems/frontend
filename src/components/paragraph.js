import React from 'react';

const Paragraph = ({
  color,
  fontWeight,
  fontSize,
  className,
  children,
  onClick,
}) => {
  return (
    <p
      className={className}
      onClick={onClick}
      style={{ color: color, fontWeight: fontWeight, fontSize: fontSize }}
    >
      {children}
    </p>
  );
};

export default Paragraph;
