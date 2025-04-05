import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ChangePassword from "./pages/ChangePassword.jsx";

function App() {
  return (
    <div className="grid justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
