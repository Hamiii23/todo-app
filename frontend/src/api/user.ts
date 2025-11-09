import axios from "axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface UserUpdateCredentials {
  name?: string;
  email?: string;
  username?: string;
}

export interface UpdatePasswordCredentials {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UsernameAndEmail {
  username?: string;
  email?: string;
}

export function loginRequest({ email, password }: LoginCredentials) {
  return axios.post("/api/user/login", {
    email,
    password,
  });
}

export function signUpRequest({
  name,
  username,
  email,
  password,
}: SignUpCredentials) {
  return axios.post("/api/user/register", {
    name,
    username,
    email,
    password,
  });
}

export async function getUserRequest() {
  let res = await axios.get("/api/user/", {
    withCredentials: true,
  });
  return res;
}

export function logOutRequest() {
  return axios.post(
    "/api/user/logout",
    {},
    {
      withCredentials: true,
    },
  );
}

export function userUpdateRequest({
  name,
  username,
  email,
}: UserUpdateCredentials) {
  return axios.patch(
    "/api/user/update",
    {
      name,
      username,
      email,
    },
    { withCredentials: true },
  );
}

export function updatePasswordRequest({
  oldPassword: password,
  newPassword,
  confirmNewPassword,
}: UpdatePasswordCredentials) {
  return axios.patch(
    "/api/user/change-password",
    {
      password,
      newPassword,
      confirmNewPassword,
    },
    {
      withCredentials: true,
    },
  );
}

export function checkEmailAndUsernameRequest({
  username,
  email,
}: UsernameAndEmail) {
  let url = "";
  if (username) {
    url = `/api/user/check?username=${username}`;
  } else if (email) {
    url = `/api/user/check?email=${email}`;
  }

  return axios.get(url);
}
