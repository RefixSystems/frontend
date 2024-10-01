import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNav from '../Navbars/MainNav';
import Sidebar from '../Navbars/Sidebar';
import { Col, Container, Row } from 'react-bootstrap';

export default function DashboardLayout() {
  return (
    <div>
      <MainNav />
      <Container fluid>
        <Row className="">
          <Col lg={2} xxl={2} xl={2} md={0} sm={0} className="p-0 m-0">
            <Sidebar />
          </Col>
          <Col
            className=""
            lg={10}
            xxl={10}
            xl={10}
            md={12}
            sm={12}
            id="reduced-width-row"
          >
            <div className="px-lg-3 px-1 px-sm-1 px-md-5 px-xxl-5 px-xl-5">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
