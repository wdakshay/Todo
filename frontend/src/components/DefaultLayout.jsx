import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAxios from "../Api";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

const DefaultLayout = () => {
    const navigate = useNavigate();
  const { user, token,http, setToken } = useAxios();
  if (!token) {
    return <Navigate to="/login" />;
  }
 


  const handleLogout = async () => {
    try {
      // Make API call to logout endpoint
      await http.post("/logout");
      
      // Clear token and user information from session storage
      setToken(null, null);

      // Redirect to the home page or any other desired page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div id="defaultLayout">
        <div className="content">
       <Navbar bg="light" data-bs-theme="light" >
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/to-do.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            
          </Nav>

          
            <Dropdown>
              <Dropdown.Toggle className="btn btn-sm dropdown-btn ml-2" variant="success" id="dropdown-basic">
               <img
              src="/user.png"
              width="40"
              height="40"
              className="d-inline-block align-top mr-2"
              id="dropdown-basic"
              alt="User Image"
            /><a >{user.data.name}</a>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleLogout()}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </Container>
      </Navbar>
          
          <main className="todo-container">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
