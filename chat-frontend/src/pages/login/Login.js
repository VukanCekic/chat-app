import React, { useContext, useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../services/app-api";

import "./Login.css";
import { AppContext } from "../../context/app-context";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { socket } = useContext(AppContext);
  const [loginUser, { isLoading }] = useLoginUserMutation();

  async function handleLogin(e) {
    e.preventDefault();
    // login logic
    const data = await loginUser({ email, password });

    if (data.error) {
      setError(data.error.data.message);
    } else {
      socket.emit("new-user", { name: data.data.name });
      navigate("/chat");
    }
  }

  return (
    <Row>
      <Col md={5} className="login__bg"></Col>
      <Col
        md={7}
        className="d-flex align-items-center justify-content-center flex-direction-column"
      >
        <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {error && <p className="alert alert-danger">{error}</p>}
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {isLoading ? <Spinner animation="grow" /> : "Login"}
          </Button>
          <div className="py-4">
            <p className="text-center">
              Don't have an account ? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
