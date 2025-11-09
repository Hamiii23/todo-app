import axios from "axios";

export function getAllListRequest() {
  return axios.get("/api/lists/", {
    withCredentials: true,
  });
}

export function getListRequest(listId: string) {
  return axios.get(`/api/lists/${listId}`, {
    withCredentials: true,
  });
}

export function createListRequest(name: string) {
  return axios.post(
    "/api/lists/create",
    {
      name,
    },
    {
      withCredentials: true,
    },
  );
}

export function deleteListRequest(listId: string) {
  return axios.delete(`/api/lists/delete/${listId}`, { withCredentials: true });
}

export function updateListRequest({
  listId,
  name,
}: {
  listId: string;
  name: string;
}) {
  return axios.patch(
    `/api/lists/update/${listId}`,
    {
      name,
    },
    {
      withCredentials: true,
    },
  );
}

export function addTodoToListRequest({
  todoId,
  listId,
}: {
  todoId: string;
  listId: string;
}) {
  return axios.patch(
    `/api/lists/todo/add/${listId}?todoId=${todoId}`,
    {},
    {
      withCredentials: true,
    },
  );
}

export function removeTodoFromListRequest({
  todoId,
  listId,
}: {
  todoId: string;
  listId: string;
}) {
  return axios.patch(
    `/api/lists/todo/remove/${listId}?todoId=${todoId}`,
    {},
    {
      withCredentials: true,
    },
  );
}
