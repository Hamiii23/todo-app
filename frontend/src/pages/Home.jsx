import { useState, useEffect } from "react";
import AddTodo from "../components/AddTodo.jsx";
import AddList from "../components/AddList.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import List from "../components/List.jsx";
import Button from "../components/Button.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import ShowTodo from "../components/ShowTodo.jsx";
import TodoCard from "../components/TodoCard.jsx";
import UpdateTodo from "../components/UpdateTodo.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [isAddingList, setIsAddingList] = useState(false);
  const [isUpdatingTodo, setIsUpdatingTodo] = useState(false);
  const [userTodos, setUserTodos] = useState([]);
  const [showTodo, setShowTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [listItem, setListItem] = useState([]);
  const [viewingProfile, setViewingProfile] = useState(false);
  const [userCredentials, setUserCredentials] = useState({});

  const getTodoByListRequest = async (listId) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/lists/todos/${listId}`,
        {
          withCredentials: true,
        },
      );

      console.log(res.data.data.listTodos);
      setUserTodos(res.data.data.listTodos);
      console.log(typeof res.data.data.listTodos);
    } catch (error) {
      console.error(error);
    }
  };

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

  const logOutRequest = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        null,
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  const getAllTodos = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/todos", {
        withCredentials: true,
      });
      console.log(res.data.data);
      setUserTodos(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCompletedTodos = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/todos/completed",
        { withCredentials: true },
      );
      console.log(res.data.data);
      setUserTodos(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllLists = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/lists", {
        withCredentials: true,
      });
      setListItem(res.data.data);
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
          setUserCredentials(res.data.data);
          getAllTodos();
          getAllLists();
        }
      })
      .catch(() => {
        navigate("/signin");
      });
  }, [navigate]);

  return (
    <div className="h-screen w-screen grid grid-cols-12">
      <div className="col-span-2">
        <Sidebar>
          <div>
            <div>
              <List
                name={"Home"}
                modifiable={false}
                onClick={() => {
                  getAllTodos();
                }}
              />
            </div>
            <div>
              <List
                name={"Completed"}
                modifiable={false}
                onClick={getCompletedTodos}
              />
            </div>
            {listItem.map((list) => (
              <div key={list._id}>
                <List
                  name={list.name}
                  onClick={() => {
                    getTodoByListRequest(list._id);
                  }}
                  modifiable
                />
              </div>
            ))}
          </div>
          <div className="mx-2 relative">
            {isAddingList ? (
              <div className="z-50 absolute -translate-y-80">
                <AddList onComplete={() => setIsAddingList(false)} />
              </div>
            ) : (
              <div className="absolute -translate-y-4 w-full">
                <Button
                  label={"Add List"}
                  onClick={() => setIsAddingList(true)}
                />
              </div>
            )}
          </div>
        </Sidebar>
      </div>
      <div className="col-span-9">
        <div className="grid grid-cols-12 h-screen pt-12 m-2">
          {userTodos.length <= 0 ? (
            <div className="h-screen w-full flex flex-col justify-center items-center">
              <svg
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.6135 1C18.0104 1 19.2225 1.96423 19.5366 3.32542L21.7439 12.8903C21.9141 13.6277 22 14.3821 22 15.1389V20C22 21.6569 20.6569 23 19 23H5C3.34315 23 2 21.6569 2 20V15.1389C2 14.3821 2.08591 13.6277 2.25609 12.8903L4.46336 3.32542C4.77749 1.96423 5.98957 1 7.38654 1H16.6135ZM16.2362 3C16.6872 3 17.0823 3.30182 17.201 3.73688L20 14H15.5C14.6592 14 14.0796 14.6553 13.9633 15.3247C13.9044 15.6635 13.7693 16.0923 13.4906 16.421C13.2463 16.7092 12.8286 17 12 17C11.1714 17 10.7537 16.7092 10.5094 16.421C10.2308 16.0923 10.0956 15.6635 10.0367 15.3247C9.92037 14.6553 9.34081 14 8.5 14H4L6.79903 3.73688C6.91769 3.30182 7.31285 3 7.7638 3H16.2362ZM4 16V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V16H15.8641C15.7419 16.4976 15.5009 17.1425 15.0162 17.7142C14.3798 18.465 13.3974 19 12 19C10.6026 19 9.62016 18.465 8.98376 17.7142C8.49913 17.1425 8.25809 16.4976 8.13593 16H4Z"
                  fill="#0F0F0F"
                />
              </svg>
              <p className="text-2xl font-bold">No todos found</p>
            </div>
          ) : (
            userTodos.map((todo) => (
              <div key={todo._id} className="col-span-6">
                <TodoCard
                  key={todo._id}
                  todo={todo}
                  onClick={() => {
                    getTodoRequest(todo._id);
                    setShowTodo(true);
                  }}
                />
              </div>
            ))
          )}
        </div>
        <div className="flex sticky bottom-2 justify-center z-50">
          {showTodo ? (
            <div>
              <ShowTodo
                title={selectedTodo.title}
                description={selectedTodo.description}
                buttonOnClick={() => setShowTodo(false)}
                editOnClick={() => {
                  setIsUpdatingTodo(true);
                  setShowTodo(false);
                }}
              />
            </div>
          ) : isUpdatingTodo ? (
            <div className="-translate-y-10">
              <UpdateTodo
                onComplete={() => setIsAddingTodo(false)}
                todo={selectedTodo}
              />
            </div>
          ) : !isAddingTodo ? (
            <div>
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
            </div>
          ) : (
            <div className="-translate-y-10">
              <AddTodo onComplete={() => setIsAddingTodo(false)} />
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1 flex justify-center">
        {viewingProfile ? (
          <div className="-translate-x-32 translate-y-5 fixed">
            <ProfileCard
              profileCredentials={userCredentials}
              logoutOnclick={logOutRequest}
            />
          </div>
        ) : (
          <div
            className="w-16 h-16 bg-white shadow hover:shadow-lg flex justify-center items-center rounded-full my-14"
            onClick={() => setViewingProfile(true)}
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
