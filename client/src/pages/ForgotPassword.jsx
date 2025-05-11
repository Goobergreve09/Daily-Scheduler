import { useState } from "react";

import { Form, Button, Card, Container } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../utils/mutations";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ForgotPassword = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [resetPassword, { error }] = useMutation(RESET_PASSWORD);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await resetPassword({
        variables: { email },
      });
      closeModal();
    } catch (err) {
      console.error(err);
    }
    setEmail("");
  };

  return (

    <Container fluid className="d-flex justify-content-center align-items-center resetpassword-container">
      <Card className="resetCard mb-5 mt-5 m-3">
        <Card.Header className="text-center">
          <h4>Reset Password</h4>
        </Card.Header>
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Text className="text-center mb-3">
            The email address you provide will be sent instructions to reset
            your password. If you do not receive an email after 5 minutes, try
            again.
          </Card.Text>
          <Card.Text className="needHelp-bold">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Need Help?{" "}
            <a href="/feedback">
              <span className="contactSupport">Contact Support</span>
            </a>
          </Card.Text>
          <Form onSubmit={handleFormSubmit} className="resetForm w-100">
            <Form.Group className="mb-3 d-flex">
              <Form.Label htmlFor="email" className="mt-2 emailAddress">
                Email Address:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
                className="w-75"
              />
              <Form.Control.Feedback type="invalid">
                Email is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              disabled={!email}
              type="submit"
              variant="success"
              className="w-25 mx-auto d-block"
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>

  );
};

export default ForgotPassword;