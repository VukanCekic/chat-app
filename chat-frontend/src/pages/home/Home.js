

import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css"


export const Home = () => {
  return (
    <Row>
 
    <Col md={6} className="home__bg"></Col>
    <Col md={6} className="d-flex flex-column align-items-center justify-content-center col-md-6">
        <div>
            <h1>Together, explore the globe.</h1>
            <p>Chat App allows you to communicate with people all over the world.</p>
            <LinkContainer to="/chat">
                <Button variant="info">
                    Get Started <i className="fas fa-comments home-message-icon"></i>
                </Button>
            </LinkContainer>
        </div>
    </Col>
</Row>
  )
}
