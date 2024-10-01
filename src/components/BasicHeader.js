import React from "react";
import {  Col, Row } from "react-bootstrap";


const Header = (props) => {
  return (
    <div className="ml-xxl-n3 ml-xl-n3 ml-lg-n3">
      <Row className="d-flex flex-row justify-content-between align-items-center  mb-2">
        <Col className="d-flex flex-column flex-wrap-wrap align-content-center ">
          <h4 className="fw-bold ">{props.HEADING}</h4>
        </Col>
       
      </Row>
    </div>
  );
};

export default Header;
