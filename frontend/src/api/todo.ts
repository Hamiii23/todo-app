import axios from "axios";

export interface TodoCredentials {
  title?: string;
  description?: string;
  dueDate?: Date;
  list?: string;
}

export function getAllTodosRequest() {
  return axios.get("/api/todos", {
    withCredentials: true,
  });
}

export function getCompletedTodosRequest() {
  return axios.get("/api/todos/completed", {
    withCredentials: true,
  });
}

export function getTodoRequest(todoId: string) {
  return axios.get(`/api/todos/${todoId}`, { withCredentials: true });
}

export function createTodoRequest({
  title,
  description,
  dueDate,
  list,
}: TodoCredentials) {
  return axios.post(
    "/api/todos/create",
    {
      title,
      description,
      dueDate,
      list,
    },
    {
      withCredentials: true,
    },
  );
}

export function updateTodoRequest(
  todoId: string,
  { title, list, description, dueDate }: TodoCredentials,
) {
  return axios.patch(
    `/api/todos/update/${todoId}`,
    {
      title,
      list,
      description,
      dueDate,
    },
    { withCredentials: true },
  );
}

export function deleteTodoRequest(todoId: string) {
  return axios.delete(`/api/todos/delete/${todoId}`, {
    withCredentials: true,
  });
}

export function toggleTodoRequest(todoId: string) {
  return axios.patch(
    `/api/todos/toggle/complete/${todoId}`,
    {},
    {
      withCredentials: true,
    },
  );
}
