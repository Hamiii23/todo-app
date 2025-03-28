import { useState, useEffect } from "react";
import axios from 'axios';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from "../components/BottomWarning";
import Card from "../components/Card";
import Heading from "../components/Heading";
import { useNavigate } from "react-router-dom";
import SubHeading from "../components/SubHeading";


export default function SignUp() {
      const navigate = useNavigate();
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');

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

      const registerRequest = async () => {
          try {
                const userData = {
                    username,
                    email,
                    password
                };

                if(name) {
                    userData.name = name
                };

                const res = await axios.post('http://localhost:8000/api/v1/user/register', userData);              
                console.log(res);
                navigate('/signin')
          } catch (error) {
                console.log(error);
          };
      };

    return (
      <div>
        <Card>
          <Heading label={"Sign Up"}/>
          <SubHeading label={"Enter your information to create an account"}/>
          <InputBox onChange={(e) => {
            setName(e.target.value)
          }} label={"Name"} placeholder={"Enter your name"} type={"text"}/>
          <InputBox onChange={(e) => {
            setUsername(e.target.value)
          }} label={"Username"} placeholder={"Enter your username"} type={"text"}/>
          <InputBox onChange={(e) => {
            setEmail(e.target.value)
          }} label={"Email"} placeholder={"Enter your email"} type={"text"}/>
          <InputBox onChange={(e) => {
            setPassword(e.target.value);
          }} label={"Password"} placeholder={"Enter your password"} type={"password"}/>
          <Button onClick={registerRequest} label={"Sign Up"}/>
          <BottomWarning label={"Already have an account?"} navigateTo={"Sign In"} to={'/signin'}/>
        </Card>
      </div>
    );
};