import { useState } from "react";
import axios from 'axios';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

export default function AddList() {
      const [name, setName] = useState('');
    
      const listCreateRequest = async () => {
          try {
                const res = await axios.post('http://localhost:8000/api/v1/lists/create', {
                    name
                },
                {
                  withCredentials: true
                });              
                console.log(res);
          } catch (error) {
                console.log(error);
          };
      };

    return (
        <div className='flex justify-center'>
            <div className=''>
              <div>
                <h1 className='text-4xl m-2'>Add List</h1>
              </div>
                <InputBox onChange={(e) => {
                  setName(e.target.value)
                }} label={"Title"} placeholder={"enter your todo title"} type={"text"}/>
                <Button onClick={listCreateRequest} label={"Sign In"}/>
            </div>
        </div>
    );
};