import React from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

export default function RefurbishedLayout() {
  return (
    <div>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
