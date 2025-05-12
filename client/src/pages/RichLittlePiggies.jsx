import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_REGAL } from "../utils/queries";
import { REGALRICHES_SUBMIT } from "../utils/mutations";
import { Container, Row, Col, Form, Button, Card} from "react-bootstrap";
import regalRichesLogo from "../assets/images/regalRiches-logo.webp";

import "../css/luckyPick.css";

const RichLittlePiggies = () => {
  const { loading, data, refetch } = useQuery(QUERY_REGAL);

  const [submitRegalRiches] = useMutation(REGALRICHES_SUBMIT, {
    errorPolicy: "all",
  });

  const [formData, setFormData] = useState({
    whichColor: "",
    combo: "",
    beginningNumber: "",
    endingNumber: "",
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
    try {
      await submitRegalRiches({
        variables: {
          regalRichesData: {
            whichColor: formData.whichColor || "",
            combo: formData.combo === "yes",
            beginningNumber: parseInt(formData.beginningNumber),
            endingNumber: parseInt(formData.endingNumber),
            bet: parseFloat(formData.bet),
            cashStart: parseFloat(formData.cashStart),
            cashEnd: parseFloat(formData.cashEnd),
            notes: formData.notes || "",
          },
        },
      });

      alert("Submission successful!");
      refetch();

      setFormData({
        whichColor: "",
        combo: "",
        beginningNumber: "",
        endingNumber: "",
        bet: "",
        cashStart: "",
        cashEnd: "",
        notes: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const submissions = data?.regalRichesSubmissions || [];

  return (
    <Container className="luckyPick-container">
      <Row className="img-header-row text-center">
        <Col>
          <h1 className="mt-4">Regal Riches Submission</h1>
        </Col>
      </Row>
      <Row className="img-header-row text-center">
        <Col>
          <img src={regalRichesLogo} alt="Regal Riches Logo" className="headerImage" />
        </Col>
      </Row>

      {/* Form Section */}
      <Card className="formCard mt-5 mb-5 p-4">
      <Row className="mt-4">
        <Col md={6}>
          <Form.Group controlId="whichColor">
            <Form.Label>Which color did you play?</Form.Label>
            <Form.Control
              as="select"
              name="whichColor"
              value={formData.whichColor}
              onChange={handleInputChange}
            >
              <option value="">Select a color</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="combo">
            <Form.Label>Was this a combo?</Form.Label>
            <Form.Control
              as="select"
              name="combo"
              value={formData.combo}
              onChange={handleInputChange}
            >
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="beginningNumber">
            <Form.Label>What number did you start with?</Form.Label>
            <Form.Control
              type="number"
              name="beginningNumber"
              value={formData.beginningNumber}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="endingNumber">
            <Form.Label>What number did it hit on?</Form.Label>
            <Form.Control
              type="number"
              name="endingNumber"
              value={formData.endingNumber}
              onChange={handleInputChange}
            />
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
          <Button className=" submitButton w-25" variant="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
      </Card>

      {/* Submissions Summary */}
      <Row>
        <Col>
          <h3 className="mb-5">Previous Submissions</h3>

          {!loading && submissions.length > 0 && (
            <>
              <Row className="text-center mb-3">
                <Col>
                  <h5>
                    Average Number Hit On:{" "}
                    {(
                      submissions.reduce((acc, sub) => acc + (sub.endingNumber || 0), 0) /
                      submissions.length
                    ).toFixed(2)}
                  </h5>
                </Col>
              </Row>

              <Row className="text-center mb-3">
                <Col>
                  <h5>
                    Total Revenue: $
                    {(
                      submissions.reduce((acc, sub) => acc + (sub.cashEnd || 0), 0) -
                      submissions.reduce((acc, sub) => acc + (sub.cashStart || 0), 0)
                    ).toFixed(2)}
                  </h5>
                </Col>
              </Row>
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
                        <td><strong>Color Played:</strong></td>
                        <td>{sub.whichColor}</td>
                      </tr>
                      <tr>
                        <td><strong>Combo:</strong></td>
                        <td>{sub.combo ? "Yes" : "No"}</td>
                      </tr>
                      <tr>
                        <td><strong>Start Number:</strong></td>
                        <td>{sub.beginningNumber}</td>
                      </tr>
                      <tr>
                        <td><strong>Hit Number:</strong></td>
                        <td>{sub.endingNumber}</td>
                      </tr>
                      <tr>
                        <td><strong>Bet:</strong></td>
                        <td>${sub.bet}</td>
                      </tr>
                      <tr>
                        <td><strong>Cash Start:</strong></td>
                        <td>${sub.cashStart}</td>
                      </tr>
                      <tr>
                        <td><strong>Cash End:</strong></td>
                        <td>${sub.cashEnd}</td>
                      </tr>
                      <tr>
                        <td><strong>Comments:</strong></td>
                        <td>{sub.notes}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Row className="mt-3">
                    <Col className="text-center">
                      <span className="italic">Submitted on {new Date(sub.createdAt).toLocaleString()}</span>
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
