import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./MessageForm.css";
export const MessageForm = () => {
  return (
    <div className="mt-5">
      <div className="messages-output">
        {/* <>
                        <div className="alert alert-info conversation-info">
                            <div>
                                Your conversation with {privateMemberMsg.name} <img src={privateMemberMsg.picture} className="conversation-profile-pic" />
                            </div>
                        </div>
                    </> */}
      </div>
      <Form onSubmit={() => {}}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Your message"
                onChange={(e) => {}}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", backgroundColor: "blue" }}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
