import React from 'react';
import { Outlet, Link } from 'react-router-dom'; 
import { Col, Container, Row } from 'react-bootstrap';

export default function RentLayout() {
  return (
    <div>
      <Container fluid>
        <Outlet />
      </Container>
    </div>
  );
}
