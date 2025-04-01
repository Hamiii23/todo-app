import { useEffect, useState } from "react";
import axios from "axios";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Card from "../components/Card";
import Heading from "../components/Heading";
import { useNavigate } from "react-router-dom";
import SubHeading from "../components/SubHeading";

export default function AddTodo() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState();
  const [list, setList] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/user/", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        navigate("/signin");
      });
  }, []);

  const todoAddRequest = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todos/create",
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:8000/api/v1/lists/", { withCredentials: true })
        .then((res) => {
          setUserList(res.data.data);
        })
        .catch((error) => console.error(error));
    }
  }, [isAuthenticated]);

  return (
    <div className="flex justify-center h-screen items-center">
      <Card>
        <Heading label={"Add Todo"} />
        <SubHeading label={"Stay Organized – Add a New Task"} />
        <InputBox
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          label={"Title"}
          placeholder={"Enter your todo title"}
          type={"text"}
        />
        <InputBox
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          label={"Description"}
          placeholder={"Enter your todo description"}
          type={"text"}
        />
        <InputBox
          onChange={(e) => {
            setDueDate(e.target.value);
          }}
          label={"Due Date"}
          placeholder={"Enter your todo due date"}
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
        <Button onClick={todoAddRequest} label={"Add Todo"} />
      </Card>
    </div>
  );
}
