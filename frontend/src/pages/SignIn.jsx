import { useState, useEffect } from "react";
import axios from "axios";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import Card from "../components/Card";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function SignIn() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/user/", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.date) {
          setIsAuthenticated(true);
        }
        navigate("/");
      });
  }, []);

  const loginRequest = async () => {
    try {
      const userData = {
        username,
        password,
      };
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        userData,
        {
          withCredentials: true,
        },
      );
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <PageWrapper>
        <Card>
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Username"}
            placeholder={"Enter your username"}
            type={"text"}
          />
          <div className="relative w-full mt-4">
            <InputBox
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label={"Password"}
              placeholder={"Enter your password"}
              type={showPassword ? "text" : "password"}
            />
            <span
              className="absolute right-2 top-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </span>
          </div>
          <Button onClick={loginRequest} label={"Sign In"} />
          <h3 className="m-2"></h3>
          <BottomWarning
            label={"Don't have an account?"}
            navigateTo={"Sign Up"}
            to={"/signup"}
          />
        </Card>
      </PageWrapper>
    </div>
  );
}
