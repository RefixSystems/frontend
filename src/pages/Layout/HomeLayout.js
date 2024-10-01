import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Chatbot from '../Chatbot/Chatbot';
import ScrollToTopArrow from '../../components/ScrollToTopArrow';

export default function HomeLayout() {
  const location = useLocation();

  const isInvoicePdfRoute = location.pathname === '/invoice';

  return (
    <div>
      {!isInvoicePdfRoute && <Navbar />}
      <Container>
        <Outlet />
      </Container>
      {!isInvoicePdfRoute && <Chatbot />}
      {!isInvoicePdfRoute && <ScrollToTopArrow />}
      {!isInvoicePdfRoute && <Footer />}
    </div>
  );
}
