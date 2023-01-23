import React, { useContext, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/app-context";
import { Col, Row } from "react-bootstrap";
import {
  addNotifications,
  resetNotifications,
} from "../../features/user-slice";
import "./Sidebar.css";
export const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    rooms,
    privateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  function joinRoom(room) {
    const data = { room, currentRoom };
    socket.emit("join-room", data);
    setCurrentRoom(room);

    // dispatch for notifications
    dispatch(resetNotifications(room));
  }

  function orderIds(id1, id2) {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  }

  async function getRooms() {
    fetch("http://localhost:3001/user/rooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }
  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom != room) dispatch(addNotifications(room));
  });

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await getRooms();
      // ...
    }
    if (user) {
      const data = { room: "arcade", currentRoom: null };

      fetchData();
      setCurrentRoom("arcade");
      socket.emit("join-room", data);
      socket.emit("new-user", { name: user.name });
    }
  }, []);

  socket.off("new-user-client").on("new-user-client", (payload) => {
    setMembers(payload.online);
  });

  socket.off("users-changed").on("users-changed", (payload) => {
    setMembers(payload.online);
  });

  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item
            key={idx}
            onClick={() => joinRoom(room)}
            active={room == currentRoom}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {room}{" "}
            {currentRoom !== room &&
              user.newMessages &&
              user.newMessages[room] && (
                <span className="badge rounded-pill bg-primary">
                  {user.newMessages[room]}
                </span>
              )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
      {Array.isArray(members) &&
        members.map((member, idx) => (
          <ListGroup.Item
            key={idx}
            style={{ cursor: "pointer" }}
            active={privateMemberMsg?._id == member?._id}
            disabled={member._id === user._id}
          >
            <Row>
              <Col xs={2} className="member-status">
                <img src={member.picture} className="member-status-img" />
                {member.status == "online" ? (
                  <i className="fas fa-circle sidebar-online-status"></i>
                ) : (
                  <i className="fas fa-circle sidebar-offline-status"></i>
                )}
              </Col>
              <Col xs={9}>
                {member.name}
                {member._id === user?._id && " (You)"}
                {member.status == "offline" && " (Offline)"}
              </Col>
              <Col xs={1}>
                <span className="badge rounded-pill bg-primary">
                  {user.newMessages &&
                    user.newMessages[orderIds(member._id, user._id)]}
                </span>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
    </>
  );
};
