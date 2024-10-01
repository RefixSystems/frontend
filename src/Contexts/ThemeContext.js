import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [color, setColor] = useState('#00a8b2');

  const updateColor = (newColor) => {
    setColor(newColor);
  };

  return (
    <ThemeContext.Provider value={{ color, updateColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
