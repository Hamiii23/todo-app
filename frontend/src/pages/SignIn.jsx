import { useState, useEffect } from "react";
import axios from 'axios';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from "../components/BottomWarning";
import Card from "../components/Card";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
      const navigate = useNavigate();
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      useEffect(() => {
        axios.get('http://localhost:8000/api/v1/user/', {
          withCredentials: true
        }).then((res) => {
          if(res.date) {
            setIsAuthenticated(true)
          }
          navigate("/")
        })
      }, [])
    
      const loginRequest = async () => {
          try {
                const userData = {
                  username,
                  password,
                };
                const res = await axios.post('http://localhost:8000/api/v1/user/login', userData,
                {
                  withCredentials: true
                });              
                console.log(res);
                navigate('/');
          } catch (error) {
                console.log(error);
          };
      };

    return (
      <div>
        <Card>
          <Heading label={"Sign In"}/>
          <SubHeading label={"Enter your credentials to access your account"}/>
          <InputBox onChange={(e) => {
            setUsername(e.target.value)
          }} label={"Username"} placeholder={"Enter your username"} type={"text"}/>
          <InputBox onChange={(e) => {
            setPassword(e.target.value);
          }} label={"Password"} placeholder={"Enter your password"} type={"password"}/>
          <Button onClick={loginRequest} label={"Sign In"}/>
          <h3 className="m-2"></h3>
          <BottomWarning label={"Don't have an account?"} navigateTo={"Sign Up"} to={'/signup'}/>
          </Card>
      </div>
    );
};