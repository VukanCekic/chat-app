import React, {useContext} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import {AppContext} from "../../context/app-context";
import {Col, Row} from "react-bootstrap";

export const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
    const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, setPrivateMemberMsg, currentRoom } = useContext(AppContext);
    const rooms = ["arcade", "dance-hall", "studio-b", "traphouse"];
    socket.off("users-changed").on("users-changed", (payload) => {
        console.log(payload)
        setMembers(payload.online);
    });
  return (
    <>
      <h2>Avaiable rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item key={idx}>{room}</ListGroup.Item>
        ))}
      </ListGroup>

      <h2>Members</h2>
        { members && members.length && members.map((member) => (
            <ListGroup.Item key={member.id} style={{ cursor: "pointer" }} active={privateMemberMsg?._id == member?._id} onClick={() => {}} disabled={member._id === user._id}>
                <Row>
                    <Col xs={2} className="member-status">
                        <img src={member.picture} className="member-status-img" />
                    </Col>
                    <Col xs={9}>
                        {member.name}
                        {member._id === user?._id && " (You)"}
                    </Col>
                    {/*<Col xs={1}>*/}
                    {/*    <span className="badge rounded-pill bg-primary">{user.newMessages[orderIds(member._id, user._id)]}</span>*/}
                    {/*</Col>*/}
                </Row>
            </ListGroup.Item>
        ))}
    </>
  );
};
