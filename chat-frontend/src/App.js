import "./App.css";
import { Navigation } from "./components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./pages/login/Login";
import { Home } from "./pages/home/Home";
import { Signup } from "./pages/signup/Signup";
import { Chat } from "./pages/chat/Chat";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/chat" element={<Chat></Chat>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
