// useAxios.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useAxios() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const getUser = () => {
    const userString = localStorage.getItem("user");
    const user_detail = JSON.parse(userString);
    return user_detail;
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  const saveToken = (user, token) => {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      setUser(user);
    } else {
      localStorage.removeItem("token");
    }
  };

  const http = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return { http, token, user, setToken: saveToken };
}
