import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";

const Header = (props) => {
  return (
    <div className="ml-xxl-n3 ml-xl-n3 ml-lg-n3">
      <Row className="d-flex flex-row justify-content-between align-items-center  mb-2">
        <Col className="d-flex flex-column flex-wrap-wrap align-content-center ">
          <h4 className="fw-bold ">{props.HEADING}</h4>
        </Col>
        <Col className="d-flex flex-row flex-wrap-wrap justify-content-end align-items-center mr-lg-4 mr-xxl-4 mr-xl-4">
          <Button
            style={{backgroundColor:"#6B78B7",border:"none"}}
            className="d-lg-none d-xxl-none d-flex d-sm-flex d-md-flex rounded fw-bold "
            onClick={props.ONCLICK}
          >
            <FaPlus size={18} color="white" className=" fw-bold" />
          </Button>
          <Button
            style={{backgroundColor:"#6B78B7",border:"none"}}
            className="d-lg-block d-xxl-block d-none d-sm-none rounded fw-bold text-light"
            onClick={props.ONCLICK}
          >
            <FaPlus size={18} className="mr-2 fw-bold mx-1" />
            {props.BUTTON_NAME}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
