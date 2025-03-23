import { useState } from "react";
import axios from 'axios';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import Card from "../components/Card";

export default function AddTodo() {
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [dueDate, setDueDate] = useState();
      const [list, setList] = useState('');
    
      const todoAddRequest = async () => {
          try {
                const res = await axios.post('http://localhost:8000/api/v1/todos/create', {
                    title,
                    description,
                    list,
                    dueDate
                },
                {
                  withCredentials: true
                });              
          } catch (error) {
                console.log(error);
          };
      };

    return (
        <div className='flex justify-center border-1 p-5 mt-3 border-gray-400 rounded-2xl bg-gray-50'>
            <div>
              <div className="flex justify-center">
                <h1 className='text-2xl m-2'>Add Todo</h1>
              </div>
                <InputBox onChange={(e) => {
                  setTitle(e.target.value)
                }} label={"Title"} placeholder={"enter your todo title"} type={"text"}/>
                <InputBox onChange={(e) => {
                  setDescription(e.target.value);
                }} label={"Description"} placeholder={"enter your todo description"} type={"text"}/>
                <InputBox onChange={(e) => {
                  setDueDate(e.target.value);
                }} label={"Due Date"} placeholder={"enter your todo due date"} type={"date"}/>
                <InputBox onChange={(e) => {
                  setList(e.target.value);
                }} label={"List"} placeholder={"enter your list to add todo"} type={"text"}/>

                <Button onClick={todoAddRequest} label={"Add Todo"}/>
            </div>
        </div> 
    );
};