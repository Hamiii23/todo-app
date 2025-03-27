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
      <div className="flex justify-center h-screen items-center">
        <div className='flex justify-center border-1 p-5 mt-3 border-gray-400 rounded-2xl bg-gray-50'>
            <div className='px-10 py-2'>
              <div className="flex justify-center">
                <h1 className='text-2xl m-2'>Add List</h1>
              </div>
                <InputBox onChange={(e) => {
                  setName(e.target.value)
                }} label={"Title"} placeholder={"enter your todo title"} type={"text"}/>
                <Button onClick={listCreateRequest} label={"Add List"}/>
            </div>
        </div>
      </div>
    );
};