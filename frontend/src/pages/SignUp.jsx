import { useState } from "react";
import axios from 'axios';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

export default function SignUp() {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');

      const registerRequest = async () => {
          try {
                const userData = {
                    username,
                    email,
                    password
                };;

                if(name) {
                    userData.name = name
                };

                const res = await axios.post('http://localhost:8000/api/v1/user/register', userData);              
                console.log(res);
          } catch (error) {
                console.log(error);
          };
      };

    return (
        <div className='grid justify-center'>
            <div className=''>
              <div>
                <h1 className='text-4xl m-2'>Log In</h1>
              </div>
                <InputBox onChange={(e) => {
                  setName(e.target.value)
                }} label={"Name"} placeholder={"enter your name"} type={"text"}/>
                <InputBox onChange={(e) => {
                  setUsername(e.target.value)
                }} label={"Username"} placeholder={"enter your username"} type={"text"}/>
                <InputBox onChange={(e) => {
                  setEmail(e.target.value)
                }} label={"Email"} placeholder={"enter your email"} type={"text"}/>
                <InputBox onChange={(e) => {
                  setPassword(e.target.value);
                }} label={"Password"} placeholder={"enter your password"} type={"password"}/>
                <Button onClick={registerRequest} label={"Sign In"}/>
            </div>
        </div>
    );
};