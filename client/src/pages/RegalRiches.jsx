import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_REGAL } from "../utils/queries";
import { REGALRICHES_SUBMIT } from "../utils/mutations";
import { Container, Row, Col, Form, Button} from "react-bootstrap";
import regalRichesLogo from "../assets/images/regalRiches-Logo.webp";

import "../css/luckyPick.css";

const RegalRiches = () => {
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
            whichColor: formData.whichColor|| "",
            combo: formData.combo === "true",
            beginningNumber: parseInt(formData.beginningNumber),
            endingNumber: parseInt(formData.endingNumber),
            bet: parseFloat(formData.bet) || 0,
            cashStart: parseFloat(formData.cashStart) || 0,
            cashEnd: parseFloat(formData.cashEnd) || 0,
            notes: formData.notes || "",
          },
        },
      });

      alert("Submission successful!");
      refetch();

      // Reset form
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
      {/* Image Upload Section - unchanged */}
      <Row className="img-header-row text-center">
        <Col>
          <h1 className="mt-4">Regal Riches Submission</h1>
        </Col>
      </Row>
      <Row className="img-header-row text-center">
        <Col>
          <img
            src={regalRichesLogo}
            alt="Regal Riches Logo"
            className="headerImage"
          />
        </Col>
      </Row>

      {/* Custom Form Fields */}
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
              step="0.01"
              name="cashEnd"
              value={formData.cashEnd}
              onChange={handleInputChange}
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
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Col>
      </Row>

      {/* Display Submissions */}

      <Row>
  <Col>
    <h3 className="justify-content-center mb-5">Previous Submissions</h3>

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

        <Row className="text-center mb-5">
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
                        <tr className=" justify-content-center ">
                          <td>
                            <strong>
                              Jackpot hit {sub.jackpotDetails} times
                            </strong>
                          </td>
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
                        <tr className=" justify-content-center ">
                          <td>
                            <strong>
                              Free Games Hit {sub.freeGamesDetails} times
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

export default RegalRiches;
