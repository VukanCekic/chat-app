import "./App.css";
import { Navigation } from "./components/Navigation";
import {BrowserRouter, Routes, Route, useNavigate, Navigate} from "react-router-dom";

import { Login } from "./pages/login/Login";
import { Home } from "./pages/home/Home";
import { Signup } from "./pages/signup/Signup";
import { Chat } from "./pages/chat/Chat";
import { useSelector } from "react-redux";
import { useState } from "react";
import { PrivateRoutes } from "./utils/private-route.utils";
import { AppContext, socket } from "./context/app-context";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const user = useSelector((state) => state.user);


  return (
    <div className="App">
      <AppContext.Provider
        value={{
          socket,
          currentRoom,
          setCurrentRoom,
          members,
          setMembers,
          messages,
          setMessages,
          privateMemberMsg,
          setPrivateMemberMsg,
          rooms,
          setRooms,
          newMessages,
          setNewMessages,
        }}
      >
        <BrowserRouter>
          <Navigation></Navigation>
          <Routes>

            <Route element={<PrivateRoutes />}>
              <Route path="/chat" element={<Chat />} />
            </Route>

              <Route path="/" element={<Home />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to='/chat' />} />
              <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/chat' />} />

          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
