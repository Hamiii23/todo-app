import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading.jsx";
import SubHeading from "../components/SubHeading.jsx";
import Card from "../components/Card.jsx";
import InputBox from "../components/InputBox.jsx";
import Button from "../components/Button.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/user/", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        navigate("/signin");
      });
  });

  const changePasswordRequest = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/v1/user/change-password",
        {
          oldPassword: currentPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <Card>
        <Heading label={"Change Your Password"} />
        <SubHeading label={"Stay Organized – Add a New Task"} />
        <InputBox
          onChange={(e) => {
            setCurrentPassword(e.target.value);
          }}
          label={"Current Password"}
          placeholder={"Enter your current password"}
          type={"password"}
        />
        <InputBox
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          label={"New Password"}
          placeholder={"Enter your new password"}
          type={"password"}
        />
        <InputBox
          onChange={(e) => {
            setConfirmNewPassword(e.target.value);
          }}
          label={"Confirm New Password"}
          placeholder={"confirmNewPasswordrm your new password"}
          type={"password"}
        />
        <Button onClick={changePasswordRequest} label={"Change Password"} />
      </Card>
    </div>
  );
}
