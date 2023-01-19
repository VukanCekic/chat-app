import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MessageForm } from "../../components/message-form/MessageForm";
import { Sidebar } from "../../components/sidebar/Sidebar";

export const Chat = () => {

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Sidebar></Sidebar>
        </Col>
        <Col md={8}>
          <MessageForm></MessageForm>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
