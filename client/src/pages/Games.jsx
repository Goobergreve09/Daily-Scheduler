import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Games = () => {
  return (
    <Container className="home-container align-items-center">
      <Row className="img-header-row">
        <Col className="justify-content-center">
          <h1>Games History</h1>
        </Col>
      </Row>
      <Row>
      <Col className="justify-content-center">
          <Link to="/lucky-pick"><h5>Lucky Pick</h5> </Link>
        </Col>
        <Col className="justify-content-center">
        <Link to="/moneyball"><h5>Moneyball</h5></Link>
        </Col>
        <Col className="justify-content-center">
        <Link to="/regalriches"><h5>Regal Riches</h5></Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Games;
