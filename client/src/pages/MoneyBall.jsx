import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MONEYBALL } from "../utils/queries";
import { MONEYBALL_SUBMIT } from "../utils/mutations";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ProgressBar,
  Accordion,
} from "react-bootstrap";
import moneyBallLogo from "../assets/images/moneyBallLogo.jpg";
import Alert from "@mui/material/Alert";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import "../css/base.css";
import "../css/luckyPick.css";

const MoneyBall = () => {
  const { loading, data, refetch } = useQuery(QUERY_MONEYBALL);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [submitMoneyBall] = useMutation(MONEYBALL_SUBMIT, {
    errorPolicy: "all",
  });

  const [formData, setFormData] = useState({
    beginningNumber: "",
    endingNumber: "",
    hitJackPot: "",
    jackpotDetails: "",
    multipliers: "",
    bet: "",
    cashStart: "",
    cashEnd: "",
    hitFreeGames: "",
    freeGamesDetails: "",
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
      await submitMoneyBall({
        variables: {
          moneyBallData: {
            beginningNumber: parseInt(formData.beginningNumber),
            endingNumber: parseInt(formData.endingNumber),
            hitJackPot: formData.hitJackPot === "true",
            jackpotDetails: formData.jackpotDetails || "",
            multipliers: formData.multipliers || "",
            bet: parseFloat(formData.bet) || 0,
            cashStart: parseFloat(formData.cashStart) || 0,
            cashEnd: formData.cashEnd !== "" ? parseFloat(formData.cashEnd) : 0,
            hitFreeGames: formData.hitFreeGames === "true",
            freeGamesDetails: formData.freeGamesDetails || "",
          },
        },
      });

      setSuccessMessage("Submission successful!");
      refetch();

      // Reset form
      setFormData({
        beginningNumber: "",
        endingNumber: "",
        hitJackPot: "",
        jackpotDetails: "",
        multipliers: "",
        bet: "",
        cashStart: "",
        cashEnd: "",
        hitFreeGames: "",
        freeGamesDetails: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Submission failed. Please try again.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const submissions = data?.moneyBallSubmissions || [];

  return (
    <Container className="luckyPick-container">
      <Row className="img-header-row text-center">
        <Col>
          <img
            src={moneyBallLogo}
            alt="Money Ball Logo"
            className="headerImage mt-3"
          />
        </Col>
      </Row>
      <Row className="img-header-row text-center">
        <Col>
          <h1 className="mt-4">
            MoneyBall <span>Submission Form </span>
          </h1>
        </Col>
      </Row>

      {/* Custom Form Fields */}
      <Accordion className="mb-5">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="accordionHeader">
            📥 Submit New Entry
          </Accordion.Header>
          <Accordion.Body>
            <Card className="formCard mt-5 mb-5 p-4">
              <Row className="mt-4">
                <Col md={6}>
                  <Form.Group controlId="beginningNumber">
                    <Form.Label>What number did you begin with?</Form.Label>
                    <Form.Control
                      type="number"
                      name="beginningNumber"
                      value={formData.beginningNumber}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="endingNumber">
                    <Form.Label>What number did you hit on?</Form.Label>
                    <Form.Control
                      type="number"
                      name="endingNumber"
                      value={formData.endingNumber}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="hitJackPot">
                    <Form.Label>Did you hit the jackpot?</Form.Label>
                    <Form.Control
                      as="select"
                      name="hitJackPot"
                      value={formData.hitJackPot}
                      onChange={handleInputChange}
                    >
                      <option value="">Select...</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="jackpotDetails">
                    <Form.Label>How many times?</Form.Label>
                    <Form.Control
                      type="text"
                      name="jackpotDetails"
                      value={formData.jackpotDetails}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="multipliers">
                    <Form.Label>Did you Hit a Multiplier?</Form.Label>
                    <Form.Control
                      as="select"
                      name="multipliers"
                      value={formData.multipliers}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an Option</option>
                      <option value="None">No</option>
                      <option value="2x">2x</option>
                      <option value="3x">3x</option>
                      <option value="5x">5x</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="bet">
                    <Form.Label>Bet?</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="bet"
                      value={formData.bet}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="cashStart">
                    <Form.Label>Cash Start</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="cashStart"
                      value={formData.cashStart}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="cashEnd">
                    <Form.Label>Cash End</Form.Label>
                    <Form.Control
                      type="number"
                      name="cashEnd"
                      value={formData.cashEnd}
                      onChange={handleInputChange}
                      step="any"
                    />
                  </Form.Group>

                  <Form.Group controlId="hitFreeGames">
                    <Form.Label>Did you hit free games?</Form.Label>
                    <Form.Control
                      as="select"
                      name="hitFreeGames"
                      value={formData.hitFreeGames}
                      onChange={handleInputChange}
                    >
                      <option value="">Select...</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="freeGamesDetails">
                    <Form.Label>How many times?</Form.Label>
                    <Form.Control
                      type="text"
                      name="freeGamesDetails"
                      value={formData.freeGamesDetails}
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
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {/* Display Submissions */}

      <Row>
        <Col>

          {!loading &&
            submissions.length > 0 &&
            (() => {
              const totals = submissions.reduce(
                (acc, sub) => {
                  const start = parseFloat(sub.cashStart) || 0;
                  const end = parseFloat(sub.cashEnd) || 0;
                  acc.cashStart += start;
                  acc.cashEnd += end;
                  if (end > start) acc.gamesWon += 1;
                  else if (end < start) acc.gamesLost += 1;
                  return acc;
                },
                { cashStart: 0, cashEnd: 0, gamesWon: 0, gamesLost: 0 }
              );

              const totalRevenue = (totals.cashEnd - totals.cashStart).toFixed(
                2
              );
              const totalGames = totals.gamesWon + totals.gamesLost;
              const winPercentage =
                totalGames > 0
                  ? ((totals.gamesWon / totalGames) * 100).toFixed(2)
                  : "0.00";
              const averageHit = (
                submissions.reduce(
                  (acc, sub) => acc + (sub.endingNumber || 0),
                  0
                ) / submissions.length
              ).toFixed(2);

              // Count specific values
              const totalSubmissions = submissions.length;
              const freeGamesHits = submissions.filter(
                (sub) => sub.hitFreeGames
              ).length;
              const jackpotHits = submissions.filter(
                (sub) => sub.hitJackPot
              ).length;

              // Multiplier breakdown
              const multiplierCounts = submissions.reduce(
                (acc, sub) => {
                  const multiplier = sub.multipliers;
                  if (multiplier === "2x") acc.twoX += 1;
                  else if (multiplier === "3x") acc.threeX += 1;
                  else if (multiplier === "5x") acc.fiveX += 1;
                  return acc;
                },
                { twoX: 0, threeX: 0, fiveX: 0 }
              );

              // Calculate percentages
              const freeGamesPercentage = totalSubmissions
                ? ((freeGamesHits / totalSubmissions) * 100).toFixed(2)
                : "0.00";

              const jackpotPercentage = totalSubmissions
                ? ((jackpotHits / totalSubmissions) * 100).toFixed(2)
                : "0.00";

              const twoXPercentage = totalSubmissions
                ? ((multiplierCounts.twoX / totalSubmissions) * 100).toFixed(2)
                : "0.00";
              const threeXPercentage = totalSubmissions
                ? ((multiplierCounts.threeX / totalSubmissions) * 100).toFixed(
                    2
                  )
                : "0.00";
              const fiveXPercentage = totalSubmissions
                ? ((multiplierCounts.fiveX / totalSubmissions) * 100).toFixed(2)
                : "0.00";

              return (
                <Card className="text-center shadow-sm rounded mb-4 p-4 bg-light">
                  <Card.Title className="mb-4">📊 Game Statistics</Card.Title>

                  <Row className="mb-3">
                    <Col>
                      <h6 className="text-secondary">Average Number Hit</h6>
                      <h4 className="text-primary fw-bold">{averageHit}</h4>
                    </Col>
                    <Col>
                      <h6 className="text-secondary">Total Revenue</h6>
                      <h4 className="text-success fw-bold">${totalRevenue}</h4>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <h6 className="text-secondary">Games Won</h6>
                      <h4 className="text-success">
                        <FaArrowUp className="me-2" />
                        {totals.gamesWon}
                      </h4>
                    </Col>
                    <Col>
                      <h6 className="text-secondary">Games Lost</h6>
                      <h4 className="text-danger">
                        <FaArrowDown className="me-2" />
                        {totals.gamesLost}
                      </h4>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col>
                      <h6 className="text-secondary">Win Percentage</h6>
                      <ProgressBar
                        now={winPercentage}
                        label={`${winPercentage}%`}
                        variant="info"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <h6 className="text-secondary">Free Games Hit</h6>
                      <h4 className="fw-bold">{freeGamesPercentage}%</h4>
                    </Col>
                    <Col>
                      <h6 className="text-secondary">Jackpot Hit</h6>
                      <h4 className="fw-bold">{jackpotPercentage}%</h4>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col>
                      <h6 className="text-secondary">
                        🎯 Multiplier Distribution
                      </h6>
                      <p className="fw-bold mb-0">
                        2x: {twoXPercentage}% | 3x: {threeXPercentage}% | 5x:{" "}
                        {fiveXPercentage}%
                      </p>
                    </Col>
                  </Row>
                </Card>
              );
            })()}
          {loading ? (
            <p>Loading...</p>
          ) : submissions.length === 0 ? (
            <p>No submissions yet.</p>
          ) : (
            submissions.map((sub) => (
              <div key={sub._id} className="submission-entry mb-4">
                <Container className="submissionContainer p-5">
                  <div className="mt-2">
                    <table className="table table-striped mt-5">
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
                            <strong>Beginning Number:</strong>
                          </td>
                          <td>{sub.beginningNumber}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Number Hit On:</strong>
                          </td>
                          <td>{sub.endingNumber}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Jackpot Hit:</strong>
                          </td>
                          <td>{sub.hitJackPot ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            <strong>
                              Jackpot hit{" "}
                              {sub.hitJackPot ? sub.jackpotDetails : 0} times
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Multiplier Hit:</strong>
                          </td>
                          <td>{sub.multipliers}</td>
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
                            <strong>FreeGames Hit:</strong>
                          </td>
                          <td>{sub.hitFreeGames ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            <strong>
                              Free Games Hit{" "}
                              {sub.hitFreeGames ? sub.freeGamesDetails : 0}{" "}
                              times
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <Row className="mt-5">
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

export default MoneyBall;
