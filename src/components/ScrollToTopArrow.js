import React from 'react';
import ScrollToTop from 'react-scroll-to-top';
import { FaArrowUp } from 'react-icons/fa';
import { useTheme } from '../Contexts/ThemeContext';

const ScrollToTopArrow = () => {
  const { color } = useTheme();
  return (
    <>
      <ScrollToTop
        smooth
        className="scroll-to-top"
        style={{
          bottom: '65px',
          left: '15px',
          backgroundColor: color,
          height: '50px',
          width: '50px',
          borderRadius: '50%',
        }}
        component={<FaArrowUp color="#fff" />}
      />
    </>
  );
};

export default ScrollToTopArrow;
