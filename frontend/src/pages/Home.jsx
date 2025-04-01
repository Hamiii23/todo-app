import { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import List from "../components/List.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [userTodos, setUserTodos] = useState([]);
  const [showTodo, setShowTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [listItem, setListItem] = useState([]);

  const getTodoRequest = async (todoId) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/todos/${todoId}`,
        {
          withCredentials: true,
        },
      );
      setSelectedTodo(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/todos/", { withCredentials: true })
      .then((res) => {
        setUserTodos(res.data.data);
      })
      .catch((error) => console.error(error));
  }, [isAuthenticated]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/lists", { withCredentials: true })
      .then((res) => {
        setListItem(res.data.data);
      })
      .catch((error) => console.error(error));
  }, [isAuthenticated]);

  return (
    <div className="h-screen w-screen">
      <div>
        <Sidebar>
          <div>
            <List name={"Home"} />
          </div>
          {listItem.map((list) => (
            <div key={list._id}>
              <List name={list.name} />
            </div>
          ))}
        </Sidebar>
      </div>
      <div>
        <div className="justify-center items-center h-screen pt-12">
          {userTodos.map((todo) => (
            <div
              key={todo._id}
              className="flex py-4 px-10 m-2 shadow-md rounded-xl cursor-pointer"
            >
              <input
                type="checkbox"
                className="m-2"
                name={todo.title}
                id={todo._id}
              />
              <div
                onClick={() => {
                  getTodoRequest(todo._id);
                  setShowTodo(true);
                }}
              >
                <h2 className="text-xl">{todo.title}</h2>
                <div className="flex">
                  {/* {todo.description && <p>{todo.description}</p>} */}
                  {/* {todo.dueDate && <p> {new Date(todo.dueDate).toLocaleDateString()}</p>} */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex sticky bottom-2 justify-center z-50">
          {!isAddingTodo ? (
            <div
              onClick={() => setIsAddingTodo(true)}
              className="h-16 w-16 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 flex justify-center items-center text-white shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          ) : (
            <AddTodo className="z-50" />
          )}
        </div>
      </div>
    </div>
  );
}
