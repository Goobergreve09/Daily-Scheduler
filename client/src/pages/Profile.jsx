import { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";

import { Container, Row, Col } from "react-bootstrap";

const Profile = () => {
  // Define useState and useEffect at the top
  const [userData, setUserData] = useState({});
  const [paddedUsername, setPaddedUsername] = useState("");

  // Fetch data with useQuery
  const { loading, data } = useQuery(QUERY_MOVIE);

  useEffect(() => {
    if (!loading && data) {
      const user = data?.me || {};
      setUserData(user);
      setPaddedUsername(user?.username ? user.username.padEnd(20, ".") : "");

      // Calculate total watch hours
      let totalHours = 0;
      if (user?.savedMovies) {
        totalHours = user.savedMovies.reduce((total, movie) => {
          const runtime = movie.movieLength ? parseInt(movie.movieLength) : 0;
          return total + runtime;
        }, 0);
      }
      setTotalWatchHours(totalHours / 60); // Convert minutes to hours
    }
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="home-container align-items-center">
      <Row className="img-header-row">
        <Col className="justify-content-center">
          <img
            src={blockbusterTotalaccess}
            alt="Vintage Logo"
            style={{ width: "30%" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
