import { useState, useEffect } from "react";
import Card from "./Card";
import Heading from "./Heading";
import InputBox from "./InputBox";
import SubHeading from "./SubHeading";
import axios from "axios";
import Button from "./Button";

export default function UpdateTodo({ onComplete, todo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState();
  const [list, setList] = useState("");
  const [userList, setUserList] = useState([]);

  const todoAddRequest = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/todos/update/${todo._id}`,
        {
          title,
          description,
          list,
          dueDate,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res);
      setTitle("");
      setDescription("");
      setDueDate("");
      setList("");
      onComplete();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/lists/", { withCredentials: true })
      .then((res) => {
        setUserList(res.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
    setDueDate(todo.dueDate);
  }, [todo]);

  return (
    <div>
      <Card>
        <Heading label={"Add Todo"} />
        <SubHeading label={"Stay Organized – Add a New Task"} />
        <InputBox
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          label={"Title"}
          placeholder={"Enter your todo title"}
          value={title}
          type={"text"}
        />
        <InputBox
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          label={"Description"}
          placeholder={"Enter your todo description"}
          value={description}
          type={"text"}
        />
        <InputBox
          onChange={(e) => {
            setDueDate(e.target.value);
          }}
          label={"Due Date"}
          placeholder={"Enter your todo due date"}
          value={dueDate}
          type={"date"}
        />
        <select
          name="List"
          value={list}
          onChange={(e) => setList(e.target.value)}
          className="cursor-pointer w-full p-2 my-2 border-b-2 border-gray-300"
        >
          <option value="" disabled>
            Select a List
          </option>
          {userList.map((items) => (
            <option key={items._id} value={items.name}>
              {items.name}
            </option>
          ))}
        </select>
        <Button onClick={todoAddRequest} label={"Update Todo"} />
      </Card>
    </div>
  );
}
