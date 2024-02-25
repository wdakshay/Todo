import React, { useEffect, useState, useRef } from "react";
import useAxios from "../Api";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { http } = useAxios();
  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState("");
  const [taskStatus, setTaskStatus] = useState(0);
  const [editTask, setEditTask] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const { user } = useAxios();
  const editModalRef = useRef(null);

  useEffect(() => {
    fetchAllTodos();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (editModalRef.current && !editModalRef.current.contains(event.target)) {
      setShowEditModal(false);
    }
  };

  const fetchAllTodos = async () => {
    try {
      const response = await http.get(`/todolist/${user.data.id}`);
      setTodo(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const submitTodo = async () => {
    try {
      const response = await http.post("/todolist-store", {
        task_name: task,
        status: taskStatus,
        user_id: user.data.id,
      });
      fetchAllTodos();
      setTask("");
      toast.success("Todo created successfully!");
    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error("Failed to create todo.");
    }
  };

  const taskCompleted = async (todo) => {
    const newStatus = todo.status === 0 ? 1 : 0;
    try {
      const response = await http.put(`/todolist-update/${todo.id}`, {
        task_name: todo.task_name,
        status: newStatus,
        user_id: user.data.id,
      });
      console.log(response);
      fetchAllTodos();
      toast.success("Todo completed successfully!");
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to complete todo.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await http.delete(`/todolist-delete/${id}`);
      fetchAllTodos();
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo.");
    }
  };

  const handleEdit = (todo) => {
    setEditTask(todo.task_name);
    setEditTodoId(todo.id);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await http.put(`/todolist-update/${editTodoId}`, {
        task_name: editTask,
        status: taskStatus,
        user_id: user.data.id,
      });
      console.log(response);
      setShowEditModal(false);
      fetchAllTodos();
      toast.success("Todo updated successfully!");
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo.");
    }
  };

  const handleEnterKeyPressCreate = (event) => {
    if (event.key === "Enter") {
      submitTodo();
    }
  };

  const handleEnterKeyPressUpdate = (event) => {
    if (event.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <>
      <div className="todo-container">
        <ToastContainer position="top-center" /> 
        <div className="todo-app">
          <div className="app-title">
            <h2>To-do app</h2>
            <i className="fa-solid fa-book-bookmark"></i>
          </div>
          
          <div className="todo-row">
            <input
              className="todo-input"
              type="text"
              id="input-box"
              placeholder="add your tasks"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={handleEnterKeyPressCreate}
            />
            <button onClick={submitTodo} className="todo-button">
              Add
            </button>
          </div>
          <ul id="list-container">
            {todo.map((todoItem) => (
              <li key={todoItem.id} className={todoItem.status === 1 ? "checked" : ""}>
                <span onClick={() => taskCompleted(todoItem)} className="check"></span>
                {todoItem.task_name}{" "}
                <a className="edit-icon" onClick={() => handleEdit(todoItem)}>
                  <CiEdit />
                </a>
                <span onClick={() => deleteTodo(todoItem.id)}>
                  <IoClose />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showEditModal && (
        <div className={`edit-modal ${showEditModal ? "active" : ""}`} ref={editModalRef}>
          <input
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            onKeyPress={handleEnterKeyPressUpdate}
          />
          <button className="btn login-button mt-3" onClick={handleUpdate}>Update</button>
          <button className="btn edit-button mt-3" onClick={() => setShowEditModal(false)}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default Home;
