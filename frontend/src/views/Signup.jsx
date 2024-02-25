import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../Api";

const Signup = () => {
  const { http, setToken } = useAxios();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
   const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
  };
 const submitForm = async () => {
  try {
    const response = await http.post("/register", {
      name: fullName,
      email: email,
      password: password,
    });
    setToken(response.data.access_token);
    console.log(response);
    navigate("/login"); 
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form card">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for free</h1>
          <input type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
          <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button className="btn btn-block login-button mt-4" onClick={submitForm}>Signup</button>
          <p className="message">
            Already Register?<Link to={"/login"}>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
