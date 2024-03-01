import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons from react-icons
import useAxios from "../Api";

const ChangePassword = () => {
  const { http } = useAxios();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword_confirmation, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (errors === null) return;

    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const errorMessage = errors[errorKeys[0]][0];
      toast.error("Error: " + errorMessage);
    }
  }, [errors]);

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmNewPassword(!showConfirmNewPassword);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await http.post("/change-password", {
        currentPassword,
        newPassword,
        newPassword_confirmation,
      });
      setShowCurrentPassword("");
      setShowNewPassword("");
      setShowConfirmNewPassword("");
      toast.success("Password changed successfully You will be redirected!");
      setTimeout(() => {
        navigate("/");
      }, 5000); // Redirect to home after 10 seconds
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error("Error: " + error.response.data.message);
        console.error("Error changing password:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form card">
        <form onSubmit={onSubmit}>
          <h1 className="title">Change Password</h1>
          <ToastContainer />
          <div className="password-input">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => togglePasswordVisibility("current")}
            >
              {showCurrentPassword ? (
                <FaEyeSlash size={16} />
              ) : (
                <FaEye size={16} />
              )}
            </button>
          </div>
          {errors && errors.currentPassword && (
            <p className="error text-danger">{errors.currentPassword[0]}</p>
          )}
          <div className="password-input">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => togglePasswordVisibility("new")}
            >
              {showNewPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>
          {errors && errors.newPassword && (
            <p className="error text-danger">{errors.newPassword[0]}</p>
          )}
          <div className="password-input">
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={newPassword_confirmation}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => togglePasswordVisibility("confirm")}
            >
              {showConfirmNewPassword ? (
                <FaEyeSlash size={16} />
              ) : (
                <FaEye size={16} />
              )}
            </button>
          </div>
          {errors && errors.confirmNewPassword && (
            <p className="error text-danger">{errors.confirmNewPassword[0]}</p>
          )}
          <div className="button-container">
            <button
              className="btn btn-primary btn-block mt-4 change-password-button position-relative"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <img className="loader" src="loading-gif.gif" alt="" />
              ) : (
                "Change Password"
              )}
            </button>
          </div>
          <p className="message">
            Back to <Link to={"/"}>Home</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
