import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../css/games.css";

const Games = () => {
  return (
    <Container className="home-container align-items-center">
      <Row className="img-header-row">
        <Col className="justify-content-center mb-5 mt-5">
          <h1>Games Selection</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={6} md={4} className=" gamesList mb-3 justify-content-center">
          <Link to="/lucky-pick">
            <h5>Lucky Pick</h5>{" "}
          </Link>
        </Col>
        <Col sm={6} md={4} className="gamesList mb-3 justify-content-center">
          <Link to="/moneyball">
            <h5>Moneyball</h5>
          </Link>
        </Col>
        <Col sm={6} md={4} className="gamesList mb-3 justify-content-center">
          <Link to="/regalriches">
            <h5>Regal Riches</h5>
          </Link>
        </Col>
        <Col sm={6} md={4} className="gamesList mb-3 justify-content-center">
          <Link to="/richlittlepiggies">
            <h5>Rich Little Piggies</h5>
          </Link>
        </Col>
        <Col sm={6} md={4} className="gamesList mb-3 justify-content-center">
          <Link to="/rocketrumble">
            <h5>Rocket Rumble</h5>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Games;
