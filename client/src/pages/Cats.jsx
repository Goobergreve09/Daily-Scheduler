import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_CATS } from "../utils/queries";
import { CATS_SUBMIT } from "../utils/mutations";
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
import catsLogo from "../assets/images/cats.png";
import Alert from "@mui/material/Alert";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import "../css/base.css";
import "../css/luckyPick.css";

const Cats = () => {
  const { loading, data, refetch } = useQuery(QUERY_CATS);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [submitCats] = useMutation(CATS_SUBMIT, {
    errorPolicy: "all",
  });

  const [formData, setFormData] = useState({
    numberWilds: "",
    numberWays: "",
    jackPot: "",
    freeGames: "",
    hitBoth: "",
    bet: "",
    cashStart: "",
    cashEnd: "",
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
      await submitCats({
        variables: {
          catsData: {
            numberWilds: parseInt(formData.numberWilds),
            numberWays: parseInt(formData.numberWays),
            jackPot: formData.hitJackPot === "true",
            freeGames: parseInt(formData.freeGames),
            hitBoth: formData.hitBoth === "true",
            bet: parseFloat(formData.bet) || 0,
            cashStart: parseFloat(formData.cashStart) || 0,
            cashEnd: formData.cashEnd !== "" ? parseFloat(formData.cashEnd) : 0,
          },
        },
      });

      setSuccessMessage("Submission successful!");
      refetch();

      // Reset form
      setFormData({
        numberWilds: "",
        numberWays: "",
        jackPot: "",
        freeGames: "",
        hitBoth: "",
        bet: "",
        cashStart: "",
        cashEnd: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Submission failed. Please try again.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const submissions = data?.catsSubmissions || [];

  return (
    <Container className="luckyPick-container">
      <Row className="img-header-row text-center">
        <Col>
          <img
            src={catsLogo}
            alt="Money Ball Logo"
            className="headerImage mt-3"
          />
        </Col>
      </Row>
      <Row className="img-header-row text-center">
        <Col>
          <h1 className="mt-4">
            Cats<span>Submission Form </span>
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
                  <Form.Group controlId="numberWilds">
                    <Form.Label>Number of Wilds at start?</Form.Label>
                    <Form.Control
                      type="number"
                      name="numberWilds"
                      value={formData.numberWilds}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="numberWays">
                    <Form.Label>Number of Ways at Start?</Form.Label>
                    <Form.Control
                      type="number"
                      name="numberWays"
                      value={formData.numberWays}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="jackPot">
                    <Form.Label>Did you hit a jackpot?</Form.Label>
                    <Form.Control
                      as="select"
                      name="jackPot"
                      value={formData.jackPot}
                      onChange={handleInputChange}
                    >
                      <option value="">Select...</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="freeGames">
                    <Form.Label>How many free games did you hit?</Form.Label>
                    <Form.Control
                      type="number"
                      name="freeGames"
                      value={formData.freeGames}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="hitBoth">
                    <Form.Label>Did you hit both cats?</Form.Label>
                    <Form.Control
                      as="select"
                      name="hitBoth"
                      value={formData.hitBoth}
                      onChange={handleInputChange}
                    >
                      <option value="">Select...</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
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

              // Count specific values
              const totalSubmissions = submissions.length;

              const jackpotHits = submissions.filter(
                (sub) => sub.jackPot
              ).length;

              const bothCatsHits = submissions.filter(
                (sub) => sub.hitBoth
              ).length;

              const bothCatsPercentage = totalSubmissions
                ? ((bothCatsHits / totalSubmissions) * 100).toFixed(2)
                : "0.00";

              // Calculate percentages

              const jackpotPercentage = totalSubmissions
                ? ((jackpotHits / totalSubmissions) * 100).toFixed(2)
                : "0.00";

              return (
                <Card className="text-center shadow-sm rounded mb-4 p-4 bg-light">
                  <Card.Title className="mb-4">📊 Game Statistics</Card.Title>

                  <Row className="mb-3">
                    <Col>
                      <h6 className="text-secondary">Total Revenue</h6>
                      <h4
                        className={`fw-bold ${
                          parseFloat(totalRevenue) < 0
                            ? "text-danger"
                            : "text-success"
                        }`}
                      >
                        ${totalRevenue}
                      </h4>
                    </Col>
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

                  <Row className="mb-3">
                    <Col>
                      <h6 className="text-secondary">Jackpot Hit</h6>
                      <h4 className="fw-bold">{jackpotPercentage}%</h4>
                    </Col>
                    <Col>
                      <h6 className="text-secondary">Both Cats Hit</h6>
                      <h4 className="fw-bold">{bothCatsPercentage}%</h4>
                    </Col>
                  </Row>

                  <Row className="mt-3"></Row>
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
                            <strong>Number of Wilds:</strong>
                          </td>
                          <td>{sub.numberWilds}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Number of Ways:</strong>
                          </td>
                          <td>{sub.numberWays}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Jackpot Hit:</strong>
                          </td>
                          <td>{sub.hitJackPot ? "Yes" : "No"}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Number of free games hit:</strong>
                          </td>
                          <td>{sub.freeGames}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Both cats hit:</strong>
                          </td>
                          <td>{sub.hitBoth ? "Yes" : "No"}</td>
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

export default Cats;
