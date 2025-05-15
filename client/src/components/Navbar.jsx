import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Modal, Tab } from "react-bootstrap";

import Auth from "../utils/auth";

import LoginForm from "./LoginForm";

import Logo from "../assets/images/navBarLogo.png";

import "../css/nav.css";

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const handleNavbarToggle = () => {
    setExpanded(!expanded);
  };

  const handleLinkClick = () => {
    if (expanded) {
    setExpanded(false);
    }
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        expanded={expanded}
        className="custom-navbar d-flex"
      >
        <Navbar.Brand background="dark" as={Link} to="/">
          <img
            src={Logo}
            alt="Scheduler Logo"
            className="navbar-logo"
            onClick={handleLinkClick}
          />
        </Navbar.Brand>

        <Navbar.Toggle onClick={handleNavbarToggle} />
        <Navbar.Collapse id="navbarCollapse">

          <Nav>
            {Auth.loggedIn() ? (
              <>

                <Nav.Link
                  as={NavLink}
                  to="/games"
                  activeclassname="active"
                  onClick={handleLinkClick}
                >
                  Games
                </Nav.Link>

                <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav className="mr-lg-0">
                <Nav.Link onClick={() => setShowModal(true)}>
                  Login
                </Nav.Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;