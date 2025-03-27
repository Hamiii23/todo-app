import { useEffect, useState } from "react";
import axios from 'axios';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

export default function AddTodo() {
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [dueDate, setDueDate] = useState();
      const [list, setList] = useState('');
      const [userList, setUserList] = useState([]);
    
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
              console.log(res);
          } catch (error) {
                console.log(error);
          };
      };

      useEffect(() => {
        axios
          .get("http://localhost:8000/api/v1/lists/", { withCredentials: true })
          .then((res) => {
              setUserList(res.data.data);
          })
          .catch((error) => console.error(error));
      }, []);
      
    return (
      <div className="flex justify-center h-screen items-center">
        <div className='flex justify-center border-1 p-5 mt-3 border-gray-400 rounded-2xl bg-gray-50'>
            <div className="px-10 py-2">
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
                <select 
                name="List" 
                value={list} 
                onChange={(e) => setList(e.target.value)}
                className="w-full p-2 my-2 border-b-2 border-gray-300"
                >
                  <option 
                  value="" 
                  disabled
                  >Select a List</option>
                  {userList.map((items) => (
                    <option 
                    key={items._id} 
                    value={items.name}
                    >{items.name}</option>
                  ))}
                </select>
                <Button onClick={todoAddRequest} label={"Add Todo"}/>
            </div>
        </div> 
      </div>
    );
};