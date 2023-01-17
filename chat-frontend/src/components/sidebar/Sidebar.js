import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

export const Sidebar = () => {
  const rooms = ["arcade", "dance-hall", "studio-b", "traphouse"];
  return (
    <>
      <h2>Avaiable rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item key={idx}>{room}</ListGroup.Item>
        ))}
      </ListGroup>

      <h2>Members</h2>
    </>
  );
};
