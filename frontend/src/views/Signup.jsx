import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../Api";

const Signup = () => {
  const { http, setToken } = useAxios();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate();

  const submitForm = async () => {
    setLoading(true); // Set loading to true when the form is submitted
    try {
      const response = await http.post("/register", {
        name: fullName,
        email: email,
        password: password,
      });
      setToken(response.data, response.data.access_token);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error signing up:", error);
      }
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form card">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="title">Signup for free</h1>
          <input type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
          {errors.name && <p className="error text-danger">{errors.name[0]}</p>}
          <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p className="error text-danger">{errors.email[0]}</p>}
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <p className="error text-danger">{errors.password[0]}</p>}
          <button className="btn btn-block login-button mt-4" onClick={submitForm} disabled={loading}>
            {loading ?  <img className="loader" src="loading-gif.gif" alt="" /> : "Signup"}
          </button>
          <p className="message">
            Already Registered? <Link to={"/login"}>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
