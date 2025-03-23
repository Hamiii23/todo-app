import { useState } from "react";
import axios from 'axios';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

export default function SignIn() {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
    
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
          } catch (error) {
                console.log(error);
          };
      };

    return (
        <div className='flex justify-center border-1 p-5 mt-3 border-gray-400 rounded-2xl bg-gray-50'>
            <div className=''>
              <div>
                <h1 className='text-4xl m-2'>Log In</h1>
              </div>
                <InputBox onChange={(e) => {
                  setUsername(e.target.value)
                }} label={"Username"} placeholder={"enter your username"} type={"text"}/>
                <InputBox onChange={(e) => {
                  setPassword(e.target.value);
                }} label={"Password"} placeholder={"enter your password"} type={"password"}/>
                <Button onClick={loginRequest} label={"Sign In"}/>
            </div>
        </div>
    );
};