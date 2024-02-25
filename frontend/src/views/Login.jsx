// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../Api";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const { http, setToken } = useAxios();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate();

  const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await http.post("/login", {
      email: email,
      password: password,
    });
    setToken(response.data, response.data.access_token);
    navigate("/");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      setErrors(error.response.data);
      toast.error("Error: " + error.response.data.message); // Display the error message directly
    } else {
      toast.error("Error: " + error.response.data.message); // Display the error message directly
      console.error("Error logging in:", error);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form card">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          <ToastContainer />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors && errors.errors.email && <p className="error text-danger">{errors.errors.email[0]}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors && errors.errors.password && <p className="error text-danger">{errors.errors.password[0]}</p>}
          <div className="button-container">
            <button className="btn btn-block mt-4 login-button position-relative" type="submit" disabled={loading}>
              {loading ?  <img className="loader" src="loading-gif.gif" alt="" /> : "Login"}
              
            </button>
          </div>
          <p className="message">
            Not Register?<Link to={"/signup"}>Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
