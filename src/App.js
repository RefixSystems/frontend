import React, { useEffect } from 'react';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import Router from './routes';
import { useGetHomeDetailsQuery } from './redux/api/HomeApi';
import { useTheme } from './Contexts/ThemeContext';

const App = () => {
  const { color, updateColor } = useTheme();
  const { data: HomeData, isLoading } = useGetHomeDetailsQuery({
    phoneNumber: '',
  });
  useEffect(() => {
    const storedThemeColor = localStorage.getItem('themeColor');
    if (storedThemeColor) {
      updateColor(storedThemeColor);
    }
  }, [updateColor]);

  useEffect(() => {
    const faviconLink = document.getElementById('favicon');
    if (HomeData && HomeData.data) {
      if (faviconLink) {
        faviconLink.href = HomeData.data.logo[0];
      }
      if (HomeData.data && HomeData.data.theme[0]) {
        const themeColor = HomeData.data.theme[0].credentialsValue;
        localStorage.setItem('themeColor', themeColor);
        updateColor(themeColor);
      }
      if (
        HomeData.data &&
        HomeData.data.razorPaySecretKey &&
        HomeData.data.razorPayKey
      ) {
        const razorPaySecretKey =  HomeData.data.razorPaySecretKey
        const razorPayKey =  HomeData.data.razorPayKey
        localStorage.setItem('razorPaySecretKey', razorPaySecretKey);
        localStorage.setItem('razorPayKey', razorPayKey);
       
      }
    }
  }, [HomeData, updateColor]);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', color);
  }, [color]);

  return (
    <div className="App">
      <ScrollToTop />
      <Router />
    </div>
  );
};

export default App;
