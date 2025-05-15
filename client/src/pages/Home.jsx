import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import homePageImg from "../assets/images/homepageHeader.jpg";

import "../css/base.css";
import "../css/Home.css";

class Home extends React.Component {
  render() {
    return (
      <Container className="home-container align-items-center">
        <Row className="homePage-row">
          <Col className="justify-content-center">
            Welcome to the Daily Scheduler!
          </Col>
        </Row>
                <Row className="homePage-row">
          <Col className="justify-content-center">
            <img 
              src={homePageImg} 
              alt="Homepage" 
              className="homepage-image" 
              style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} 
            />
          </Col>
        </Row>
        <Row className="homePage-row">
        <Col className="justify-content-center">
        <span className="italic">Site Currently in Progress</span>
        </Col>
    </Row>
      </Container>
    );
  }
}

export default Home;
