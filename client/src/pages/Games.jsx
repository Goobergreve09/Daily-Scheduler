import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Games = () => {
  return (
    <Container className="home-container align-items-center">
      <Row className="img-header-row">
        <Col className="justify-content-center">
          <div className="membership-card">
            <MemberCardProfile
              username={userData.username}
              email={userData.email}
              hoursWatched={formattedTotalWatchHours} // Pass total watch hours to MemberCard
              paddedUsername={paddedUsername}
              memberSince={memberSince}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Games;
