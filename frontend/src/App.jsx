import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ChangePassword from "./pages/ChangePassword.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import ProfileCard from "./components/ProfileCard.jsx";

function App() {
  return (
    <div className="grid justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<ProfileCard />} />
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
