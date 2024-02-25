import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAxios from "../Api";

const GuestLayout = () => {
  const { token } = useAxios();
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div className="todo-container">
      <Outlet />
    </div>
  );
};

export default GuestLayout;
