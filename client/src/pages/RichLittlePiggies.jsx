import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_RICH_PIGGIES } from "../utils/queries";
import { RICHLITTLEPIGGIES_SUBMIT } from "../utils/mutations";
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
import Alert from "@mui/material/Alert";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import richLittlePiggiesLogo from "../assets/images/richLittlePiggies.webp";
import "../css/luckyPick.css";

const RichLittlePiggies = () => {
  const { loading, data, refetch } = useQuery(QUERY_RICH_PIGGIES);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [submitRichLittlePiggies] = useMutation(RICHLITTLEPIGGIES_SUBMIT, {
    errorPolicy: "all",
  });

  const [formData, setFormData] = useState({
    beginningNumber: "",
    endingNumber: "",
    jackPotFreeGames: "",
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
      await submitRichLittlePiggies({
        variables: {
          richLittlePiggiesData: {
            beginningNumber: parseInt(formData.beginningNumber),
            endingNumber: parseInt(formData.endingNumber),
            jackPotFreeGames: formData.jackPotFreeGames === "yes",
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
        beginningNumber: "",
        endingNumber: "",
        jackPotFreeGames: "",
        bet: "",
        cashStart: "",
        cashEnd: "",
        notes: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Submission failed. Please try again.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const submissions = data?.richLittlePiggiesSubmissions || [];

  // Metrics
  const averageHit =
    submissions.length > 0
      ? (
          submissions.reduce((acc, sub) => acc + (sub.endingNumber || 0), 0) /
          submissions.length
        ).toFixed(2)
      : "0.00";

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
      : "0.00";

  const doubleHitPercentage =
    submissions.length > 0
      ? (
          (submissions.filter((sub) => sub.jackPotFreeGames === true).length /
            submissions.length) *
          100
        ).toFixed(2)
      : "0.00";

  return (
    <Container className="luckyPick-container">
      <Row className="img-header-row text-center">
        <Col>
          <img
            src={richLittlePiggiesLogo}
            alt="Rich Little Piggies Logo"
            className="headerImage mt-3"
          />
        </Col>
      </Row>

      <Row className="img-header-row text-center">
        <Col>
          <h1 className="mt-4">
            Rich Little Piggies <span>Submission Form</span>
          </h1>
        </Col>
      </Row>

      {/* Form Section */}
      <Accordion className="mb-5">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="accordionHeader">
            📥 Submit New Entry
          </Accordion.Header>
          <Accordion.Body>
            <Card className="formCard mt-5 mb-5 p-4">
              <Row>
                <Col md={6}>
                  <Form.Group controlId="beginningNumber">
                    <Form.Label>How many free games to begin?</Form.Label>
                    <Form.Control
                      type="number"
                      name="beginningNumber"
                      value={formData.beginningNumber}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="endingNumber">
                    <Form.Label>At what number did it hit?</Form.Label>
                    <Form.Control
                      type="number"
                      name="endingNumber"
                      value={formData.endingNumber}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="jackPotFreeGames">
                    <Form.Label>
                      Did Free Games and Jackpot hit at the same time?
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="jackPotFreeGames"
                      value={formData.jackPotFreeGames}
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

              {/* Submit Button & Alerts */}
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

      {/* Game Statistics Summary */}
      <Card className="text-center shadow-sm rounded mb-4 p-4 bg-light">
        <Card.Title className="mb-4">📊 Game Statistics</Card.Title>

        <Row className="mb-3">
          <Col>
            <h6 className="text-secondary">Average Hit Number</h6>
            <h4 className="text-primary fw-bold">{averageHit}</h4>
          </Col>
          <Col>
            <h6 className="text-secondary">Total Revenue</h6>
            <h4 className="text-success fw-bold">${totalRevenue}</h4>
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

        <Row>
          <Col>
            <h6 className="text-secondary">Games Won</h6>
            <h4 className="text-success">
              <FaArrowUp className="me-2" />
              {gamesWon}
            </h4>
          </Col>
          <Col>
            <h6 className="text-secondary">Games Lost</h6>
            <h4 className="text-danger">
              <FaArrowDown className="me-2" />
              {gamesLost}
            </h4>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h6 className="text-secondary">🎉 Jackpot + Free Games Hit</h6>
            <h4 className="fw-bold">{doubleHitPercentage}%</h4>
          </Col>
        </Row>
      </Card>

      {/* Submissions Table */}
      <Row>
        <Col>

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
                          <strong>Free Games Count to Start:</strong>
                        </td>
                        <td>{sub.beginningNumber}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Hit Number:</strong>
                        </td>
                        <td>{sub.endingNumber}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Jackpot + Free Games?</strong>
                        </td>
                        <td>{sub.jackPotFreeGames ? "Yes" : "No"}</td>
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

export default RichLittlePiggies;
