import React, { useContext, useEffect } from "react";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../services/app-api";
import { AppContext } from "../context/app-context";

export const Navigation = () => {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  const { socket } = useContext(AppContext);
  async function handleLogout(e) {
    e.preventDefault();
    await logoutUser(user);
    socket.emit("leave-chat-room", user);
    // window.location.replace("/");
  }
  return (
    <Navbar bg="info" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-white">Chat-io</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link className="text-white">Login</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/chat">
              <Nav.Link className="text-white">Chat</Nav.Link>
            </LinkContainer>
            {user && (
              <NavDropdown
                title={
                  <>
                    <img
                      src={user.picture}
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                    {user.name}
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Button variant="danger" onClick={(e) => handleLogout(e)}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
