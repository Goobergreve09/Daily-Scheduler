import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_LUCKYPICK } from "../utils/queries";
import { LUCKYPICK_SUBMIT } from "../utils/mutations";
import Alert from "@mui/material/Alert";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Card,
} from "react-bootstrap";
import ModalImage from "react-modal-image";
import luckyPickLogo from "../assets/images/luckyPickLogo.png";

import "../css/luckyPick.css";

const LuckyPick = () => {
  const { loading, data, refetch } = useQuery(QUERY_LUCKYPICK);

  const [submitLuckyPick] = useMutation(LUCKYPICK_SUBMIT, {
    errorPolicy: "all",
  });

  const [beforePhoto, setBeforePhoto] = useState(null);
  const [afterPhoto, setAfterPhoto] = useState(null);
  const [previewBefore, setPreviewBefore] = useState(null);
  const [previewAfter, setPreviewAfter] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "lucky_pick_preset");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dokhvz05z/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary error:", errorData);
        throw new Error(errorData.error?.message || "Upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error.message);
      return null;
    }
  };

  const [formData, setFormData] = useState({
    multipliers: "",
    freeGames: "",
    numbersOffBoard: "",
    wilds: "",
    bet: "",
    cashStart: "",
    cashEnd: "",
    hitProgressive: "",
    stageDetails: "",
  });

  const handleBeforeChange = (e) => {
    const file = e.target.files[0];
    setBeforePhoto(file);
    if (file) setPreviewBefore(URL.createObjectURL(file));
  };

  const handleAfterChange = (e) => {
    const file = e.target.files[0];
    setAfterPhoto(file);
    if (file) setPreviewAfter(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    setErrorMessage("");
    setSuccessMessage(""); // Start loading
    try {
      const beforeImageUrl = await uploadToCloudinary(beforePhoto);
      const afterImageUrl = await uploadToCloudinary(afterPhoto);

      if (!beforeImageUrl || !afterImageUrl) {
        setErrorMessage("Error uploading images. Please try again.");
        setLoadingSubmit(false);
        return;
      }

      await submitLuckyPick({
        variables: {
          luckyPickData: {
            beforeImageUrl,
            afterImageUrl,
            multipliers: parseInt(formData.multipliers) || 0,
            freeGames: parseInt(formData.freeGames) || 0,
            numbersOffBoard: parseInt(formData.numbersOffBoard) || 0,
            wilds: parseInt(formData.wilds) || 0,
            bet: parseFloat(formData.bet) || 0,
            cashStart: parseFloat(formData.cashStart) || 0,
            cashEnd: parseFloat(formData.cashEnd) || 0,
            hitProgressive: formData.hitProgressive === "yes",
            stageDetails: formData.stageDetails || "",
          },
        },
      });

      setSuccessMessage("Submission successful!");

      refetch();
      setFormData({
        multipliers: "",
        freeGames: "",
        numbersOffBoard: "",
        wilds: "",
        bet: "",
        cashStart: "",
        cashEnd: "",
        hitProgressive: "",
        stageDetails: "",
      });
      setBeforePhoto(null);
      setAfterPhoto(null);
      setPreviewBefore(null);
      setPreviewAfter(null);
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Submission failed. Please try again.");
    } finally {
      setLoadingSubmit(false); // Always end loading
    }
  };

  const submissions = data?.luckyPickSubmissions || [];

  return (
    <Container className="luckyPick-container">
      <Row className="img-header-row text-center">
        <Col>
          <h1 className="mt-4">Lucky Pick Submission</h1>
        </Col>
      </Row>
      <Row className="img-header-row text-center">
        <Col>
          <img
            src={luckyPickLogo}
            alt="Lucky Pick Logo"
            className="headerImage"
          />
        </Col>
      </Row>


      {/* Image Upload Section */}
      <Row className="mt-4">
        <Col md={6}>
          <Form.Group controlId="beforePhoto">
            <Form.Label>Before Photo</Form.Label>
            <Form.Control type="file" onChange={handleBeforeChange} />
            {previewBefore && (
              <Image
                src={previewBefore}
                thumbnail
                className="submissionImage mt-2"
              />
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="afterPhoto">
            <Form.Label>After Photo</Form.Label>
            <Form.Control type="file" onChange={handleAfterChange} />
            {previewAfter && (
              <Image
                src={previewAfter}
                thumbnail
                className="submissionImage mt-2"
              />
            )}
          </Form.Group>
        </Col>
      </Row>

      {/* Form Fields */}
      <Card className="p-4 mt-5 formCard">
        <Row className="mt-4">
          <Col md={6}>
            {[
              "multipliers",
              "freeGames",
              "numbersOffBoard",
              "wilds",
              "bet",
            ].map((field) => (
              <Form.Group controlId={field} key={field}>
                <Form.Label>{field.replace(/([A-Z])/g, " $1")}</Form.Label>
                <Form.Control
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                />
              </Form.Group>
            ))}
          </Col>
          <Col md={6}>
            <Form.Group controlId="cashStart">
              <Form.Label>Cash Start</Form.Label>
              <Form.Control
                type="number"
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
              />
            </Form.Group>
            <Form.Group controlId="hitProgressive">
              <Form.Label>Did you hit a progressive?</Form.Label>
              <Form.Control
                as="select"
                name="hitProgressive"
                value={formData.hitProgressive}
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="stageDetails">
              <Form.Label>Which stage and how many times?</Form.Label>
              <Form.Control
                type="text"
                name="stageDetails"
                value={formData.stageDetails}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

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

      {/* Previous Submissions */}
      <Row>
        <Col>
          <h3 className="justify-content-center mb-4 mt-5">
            Previous Submissions
          </h3>
        </Col>
      </Row>

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

          const totalRevenue = (totals.cashEnd - totals.cashStart).toFixed(2);
          const totalGames = totals.gamesWon + totals.gamesLost;
          const winPercentage =
            totalGames > 0
              ? ((totals.gamesWon / totalGames) * 100).toFixed(2)
              : "0.00";

          return (
            <Container className="totalsBackground p-3 mb-4">
              <Row className="text-center mb-2">
                <Col>
                  <h5>Total Revenue: ${totalRevenue}</h5>
                </Col>
              </Row>
              <Row className="text-center mt-4">
                <Col>
                  <h5>Games Won: {totals.gamesWon}</h5>
                </Col>
              </Row>
              <Row className="text-center">
                <Col>
                  <h5>Games Lost: {totals.gamesLost}</h5>
                </Col>
              </Row>
              <Row className="text-center mt-3">
                <Col>
                  <h5>Win Percentage: {winPercentage}%</h5>
                </Col>
              </Row>
            </Container>
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
              <Row className="justify-content-center text-center">
                <Col md={6}>
                  <ModalImage
                    small={sub.beforeImageUrl}
                    large={sub.beforeImageUrl}
                    alt="Before"
                    className="submissionImage mb-3"
                  />
                </Col>
                <Col md={6}>
                  <ModalImage
                    small={sub.afterImageUrl}
                    large={sub.afterImageUrl}
                    alt="After"
                    className="submissionImage"
                  />
                </Col>
              </Row>

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
                        <strong>Multipliers:</strong>
                      </td>
                      <td>{sub.multipliers}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Free Games:</strong>
                      </td>
                      <td>{sub.freeGames}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Numbers Off Board:</strong>
                      </td>
                      <td>{sub.numbersOffBoard}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Wilds:</strong>
                      </td>
                      <td>{sub.wilds}</td>
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
                        <strong>Hit Progressive:</strong>
                      </td>
                      <td>{sub.hitProgressive ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Stages Hit:</strong>
                      </td>
                      <td>{sub.stageDetails}</td>
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
    </Container>
  );
};

export default LuckyPick;
