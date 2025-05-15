import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MAGIC_NILE } from "../utils/queries";
import { MAGICNILE_SUBMIT } from "../utils/mutations";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Accordion,
} from "react-bootstrap";
import magicNileLogo from "../assets/images/magicNile.jpg";
import Alert from "@mui/material/Alert";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";

import "../css/luckyPick.css";

const MagicNile = () => {
  const { loading, data, refetch } = useQuery(QUERY_MAGIC_NILE);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [submitMagicNile] = useMutation(MAGICNILE_SUBMIT, {
    errorPolicy: "all",
  });

  const [formData, setFormData] = useState({
    blocksGreen: "",
    blocksRed: "",
    blocksBlue: "",
    colorHit: "",
    freeGames: "",
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
      await submitMagicNile({
        variables: {
          magicNileData: {
            blocksGreen: parseInt(formData.blocksGreen),
            blocksRed: parseInt(formData.blocksRed),
            blocksBlue: parseInt(formData.blocksBlue),
            colorHit: formData.colorHit || "",
            freeGames: formData.freeGames === "yes",
            bet: parseFloat(formData.bet),
            cashStart: parseFloat(formData.cashStart),
            cashEnd: parseFloat(formData.cashEnd),
          },
        },
      });

      setSuccessMessage("Submission successful!");

      refetch();

      setFormData({
        blocksGreen: "",
        blocksRed: "",
        blocksBlue: "",
        colorHit: "",
        freeGames: "",
        bet: "",
        cashStart: "",
        cashEnd: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Submission failed. Please try again.");
    } finally {
      setLoadingSubmit(false); // stop loading
    }
  };

  const submissions = data?.magicNileSubmissions || [];

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

  const totalSubmissions = submissions.length;
  const freeGamesHits = submissions.filter((sub) => sub.freeGames).length;

  const freeGamesPercentage = totalSubmissions
    ? ((freeGamesHits / totalSubmissions) * 100).toFixed(2)
    : "0.00";

  return (
    <Container className="luckyPick-container">
      <Row className="img-header-row text-center">
        <Col>
          <img
            src={magicNileLogo}
            alt="Magic of the Nile Logo"
            className="headerImage mt-3"
          />
        </Col>
      </Row>
      <Row className="img-header-row text-center">
        <Col>
          <h1 className="mt-4">
            Magic of the Nile <span>Submission Form</span>
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
              <Row className="mt-4">
                <Col md={6}>
                  <Form.Group controlId="blocksGreen">
                    <Form.Label>Number of blocks Green?</Form.Label>
                    <Form.Control
                      type="number"
                      name="blocksGreen"
                      value={formData.blocksGreen}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="blocksRed">
                    <Form.Label>Number of blocks Red?</Form.Label>
                    <Form.Control
                      type="number"
                      name="blocksRed"
                      value={formData.blocksRed}
                      onChange={handleInputChange}
                    />
                    <Form.Group controlId="blocksBlue">
                      <Form.Label>Number of blocks Blue?</Form.Label>
                      <Form.Control
                        type="number"
                        name="blocksBlue"
                        value={formData.blocksBlue}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Form.Group>
                  <Form.Group controlId="colorHit">
                    <Form.Label>Which color did you hit?</Form.Label>
                    <Form.Control
                      as="select"
                      name="colorHit"
                      value={formData.colorHit}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a color</option>
                      <option value="green">Green</option>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="freeGames">
                    <Form.Label>Did you hit free games?</Form.Label>
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

      {/* Submissions Summary */}
      <Row>
        <Col>
          {!loading && submissions.length > 0 && (
            <>
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
                <Row>
                  <Col>
                    <h6 className="text-secondary">Games Won</h6>
                    <h4 className="text-success">
                      <FaArrowUp className="me-2" /> {gamesWon}
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
                <Row>
                  <Col>
                    <h6 className="text-secondary">Free Games Hit</h6>
                    <h4 className="fw-bold">{freeGamesPercentage}%</h4>
                  </Col>
                </Row>
              </Card>
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
                          <strong>Number of Blocks Green:</strong>
                        </td>
                        <td>{sub.blocksGreen || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Number of Blocks Red:</strong>
                        </td>
                        <td>{sub.blocksRed || "N/A"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Number of Blocks Blue:</strong>
                        </td>
                        <td>{sub.blocksBlue || "N/A"}</td>
                      </tr>
                      
                        <tr>
                          <td>
                            <strong>Color Hit:</strong>
                          </td>
                          <td>{sub.colorHit}</td>
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

export default MagicNile;
