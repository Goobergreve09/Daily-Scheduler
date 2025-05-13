import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ROCKET } from "../utils/queries";
import { ROCKETRUMBLE_SUBMIT } from "../utils/mutations";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import rocketRumbleLogo from "../assets/images/rocketRumble.jpg";
import Alert from "@mui/material/Alert";

import "../css/luckyPick.css";

const RocketRumble = () => {
  const { loading, data, refetch } = useQuery(QUERY_ROCKET);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [submitRocketRumble] = useMutation(ROCKETRUMBLE_SUBMIT, {
    errorPolicy: "all",
  });

  const [formData, setFormData] = useState({
    blueNumber: "",
    greenNumber: "",
    purpleNumber: "",
    redNumber: "",
    rocketBoost: "",
    freeGames: "",
    bet: "",
    cashStart: "",
    cashEnd: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await submitRocketRumble({
        variables: {
          rocketRumbleData: {
            blueNumber: parseInt(formData.blueNumber),
            greenNumber: parseInt(formData.greenNumber),
            purpleNumber: parseInt(formData.purpleNumber),
            redNumber: parseInt(formData.redNumber),
            rocketBoost: formData.rocketBoost === "yes",
            freeGames: formData.freeGames === "yes",
            bet: parseFloat(formData.bet),
            cashStart: parseFloat(formData.cashStart),
            cashEnd: parseFloat(formData.cashEnd),
            notes: formData.notes || "",
          },
        },
      });

      setSuccessMessage("Submission successful!");

      refetch();

      setFormData({
        blueNumber: "",
        greenNumber: "",
        purpleNumber: "",
        redNumber: "",
        rocketBoost: "",
        freeGames: "",
        bet: "",
        cashStart: "",
        cashEnd: "",
        notes: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Submission failed. Please try again.");
    } finally {
      setLoadingSubmit(false); // stop loading
    }
  };

  const submissions = data?.rocketRumbleSubmissions || [];

  // Calculate metrics: Total Revenue, Wins, Losses, Win Percentage
  const totalRevenue = submissions
    .reduce((acc, sub) => acc + (sub.cashEnd || 0) - (sub.cashStart || 0), 0)
    .toFixed(2);

  const gamesWon = submissions.filter(
    (sub) => parseFloat(sub.cashEnd) > parseFloat(sub.cashStart)
  ).length;

  const gamesLost = submissions.filter(
    (sub) => parseFloat(sub.cashEnd) < parseFloat(sub.cashStart)
  ).length;

  const winPercentage =
    submissions.length > 0
      ? ((gamesWon / submissions.length) * 100).toFixed(2)
      : 0;

  const rocketBoostHits = submissions.filter((sub) => sub.rocketBoost).length;
  const freeGamesHits = submissions.filter((sub) => sub.freeGames).length;

  const rocketBoostPercentage =
    submissions.length > 0
      ? ((rocketBoostHits / submissions.length) * 100).toFixed(2)
      : 0;

  const freeGamesPercentage =
    submissions.length > 0
      ? ((freeGamesHits / submissions.length) * 100).toFixed(2)
      : 0;

  return (
    <Container className="luckyPick-container">
      <Row className="img-header-row text-center">
        <Col>
          <h1 className="mt-4">Rocket Rumble Submission</h1>
        </Col>
      </Row>
      <Row className="img-header-row text-center">
        <Col>
          <img
            src={rocketRumbleLogo}
            alt="Rocket Rumble Logo"
            className="headerImage"
          />
        </Col>
      </Row>

      {/* Form Section */}
      <Card className="formCard mt-5 mb-5 p-4">
        <Row className="mt-4">
          <Col md={6}>
            <Form.Group controlId="blueNumber">
              <Form.Label>
                Blue Start Number?{" "}
                <span className="italic">Only Answer if Necessary</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="blueNumber"
                value={formData.blueNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="greenNumber">
              <Form.Label>
                Green Start Number?{" "}
                <span className="italic">Only Answer if Necessary</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="greenNumber"
                value={formData.greenNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="purpleNumber">
              <Form.Label>
                Purple Start Number?{" "}
                <span className="italic">Only Answer if Necessary</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="purpleNumber"
                value={formData.purpleNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="redNumber">
              <Form.Label>
                Red Start Number?{" "}
                <span className="italic">Only Answer if Necessary</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="redNumber"
                value={formData.redNumber}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="rocketBoost">
              <Form.Label>Did you hit Rocket Boost?</Form.Label>
              <Form.Control
                as="select"
                name="rocketBoost"
                value={formData.rocketBoost}
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="freeGames">
              <Form.Label>Did you hit Free Games?</Form.Label>
              <Form.Control
                as="select"
                name="freeGames"
                value={formData.freeGames}
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="bet">
              <Form.Label>Bet</Form.Label>
              <Form.Control
                type="number"
                step="any"
                name="bet"
                value={formData.bet}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="cashStart">
              <Form.Label>Cash Start</Form.Label>
              <Form.Control
                type="number"
                step="any"
                name="cashStart"
                value={formData.cashStart}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="cashEnd">
              <Form.Label>Cash End</Form.Label>
              <Form.Control
                type="number"
                step="any"
                name="cashEnd"
                value={formData.cashEnd}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="notes">
              <Form.Label>Do you have any comments?</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <Row className="mt-4 mb-5 text-center">
          <Col>
            <Button
              className="submitButton w-25"
              variant="success"
              onClick={handleSubmit}
              disabled={loadingSubmit}
            >
              {loadingSubmit ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {errorMessage && (
              <Alert
                severity="error"
                onClose={() => setErrorMessage("")}
                className="mt-4"
              >
                {errorMessage}
              </Alert>
            )}

            {successMessage && (
              <Alert
                severity="success"
                onClose={() => setSuccessMessage("")}
                className="mt-4"
              >
                {successMessage}
              </Alert>
            )}
          </Col>
        </Row>
      </Card>

      {/* Submissions Summary */}
      <Row>
        <Col>
          <h3 className="mb-5 text-center">Previous Submissions</h3>

          {!loading && submissions.length > 0 && (
            <>
              <Container className="totalsBackground p-3 mb-4">
                <Row className="text-center mb-3">
                  <Col>
                    <h5>Total Revenue: ${totalRevenue}</h5>
                  </Col>
                </Row>

                {/* Add the new metrics */}
                <Row className="text-center mt-4">
                  <Col>
                    <h5>Games Won: {gamesWon}</h5>
                  </Col>
                </Row>
                <Row className="text-center mb-4">
                  <Col>
                    <h5>Games Lost: {gamesLost}</h5>
                  </Col>
                </Row>

                <Row className="text-center mb-3">
                  <Col>
                    <h5>Win Percentage: {winPercentage}%</h5>
                  </Col>
                </Row>
                <Row className="text-center">
                  <Col>
                    <h5>Rocket Boost: {rocketBoostPercentage}%</h5>
                  </Col>
                </Row>
                <Row className="text-center">
                  <Col>
                    <h5>Free Games: {freeGamesPercentage}%</h5>
                  </Col>
                </Row>
              </Container>
            </>
          )}

          {loading ? (
            <p>Loading...</p>
          ) : submissions.length === 0 ? (
            <p>No submissions yet.</p>
          ) : (
            submissions.map((sub) => (
              <div key={sub._id} className="submission-entry mb-4">
                <Container className="submissionContainer p-5">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th colSpan="2" className="text-center">
                          <h4>Submission Details</h4>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Blue Number Played:</strong>
                        </td>
                        <td>{sub.blueNumber || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Green Number Played:</strong>
                        </td>
                        <td>{sub.greenNumber || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Purple Number Played:</strong>
                        </td>
                        <td>{sub.purpleNumber || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Red Number Played:</strong>
                        </td>
                        <td>{sub.redNumber || "N/A"}</td>{" "}
                      </tr>
                      <tr>
                        <td>
                          <strong>Rocket Boost:</strong>
                        </td>
                        <td>{sub.rocketBoost ? "Yes" : "No"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Free Games:</strong>
                        </td>
                        <td>{sub.freeGames ? "Yes" : "No"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Bet:</strong>
                        </td>
                        <td>${sub.bet}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Cash Start:</strong>
                        </td>
                        <td>${sub.cashStart}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Cash End:</strong>
                        </td>
                        <td>${sub.cashEnd}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Comments:</strong>
                        </td>
                        <td>{sub.notes}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Row className="mt-3">
                    <Col className="text-center">
                      <span className="italic">
                        Submitted on {new Date(sub.createdAt).toLocaleString()}
                      </span>
                    </Col>
                  </Row>
                </Container>
              </div>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RocketRumble;
