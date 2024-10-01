import React from 'react';

export const HeadingWithQuotes = ({ children }) => {
  return (
    <h4 className="text-center">
      <span className="main">“</span>
      {children}
      <span className="main">”</span>
    </h4>
  );
};

export const Heading = ({ children }) => {
  return <h4 className="text-center">{children}</h4>;
};
