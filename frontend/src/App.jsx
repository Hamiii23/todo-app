import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ChangePassword from "./pages/ChangePassword.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";

function App() {
  return (
    <div className="grid justify-center bg-soft-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/update/password" element={<ChangePassword />} />
          <Route path="/update/profile" element={<UpdateProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
