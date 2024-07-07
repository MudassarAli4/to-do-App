import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg, BsPencil } from "react-icons/bs";

import "./App.css";

function App() {
  const [isComplete, setIsComplete] = useState(false);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const addTodo = () => {
    let newItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newItem);
    setTodos(updatedTodoArr);
    setNewTitle("");
    setNewDescription("");
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const deleteTodo = (index) => {
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.splice(index, 1);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const deleteCompletedTodo = (index) => {
    let updatedTodoArr = [...completedTodos];
    updatedTodoArr.splice(index, 1);
    setCompletedTodos(updatedTodoArr);
    localStorage.setItem("completedtodos", JSON.stringify(updatedTodoArr));
  };

  const completeTodo = (index) => {
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    let completedOn = date + " " + time;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    deleteTodo(index);
    localStorage.setItem("completedtodos", JSON.stringify(updatedCompletedArr));
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setEditTitle(allTodos[index].title);
    setEditDescription(allTodos[index].description);
  };

  const saveEditTodo = () => {
    let updatedTodoArr = [...allTodos];
    updatedTodoArr[editIndex] = {
      ...updatedTodoArr[editIndex],
      title: editTitle,
      description: editDescription,
    };
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setEditIndex(null);
    setEditTitle("");
    setEditDescription("");
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedtodos"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-container">
        <div className="input-fields">
          <div className="input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Task Title..."
            ></input>
          </div>
          <div className="input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description of the Task..."
            ></input>
          </div>
          <div className="input-item">
            <button type="button" onClick={addTodo} className="btn">
              Add
            </button>
          </div>
        </div>

        <div className="btns">
          <button
            className={`todo-btn ${isComplete === false && "active"}`}
            onClick={() => setIsComplete(false)}
          >
            Todo
          </button>
          <button
            className={`todo-btn ${isComplete === true && "active"}`}
            onClick={() => setIsComplete(true)}
          >
            Completed
          </button>
        </div>

        <div className="tasks-list">
          {isComplete === false &&
            allTodos.map((item, index) => (
              <div className="list-item" key={index}>
                {editIndex === index ? (
                  <div className="edit-fields">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="edit-input"
                    />
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="edit-input"
                    />
                    <button onClick={saveEditTodo} className="save-btn">
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                )}
                <div>
                  <AiOutlineDelete
                    className="del"
                    onClick={() => deleteTodo(index)}
                    title="Delete?"
                  />
                  <BsPencil
                    className="edit"
                    onClick={() => editTodo(index)}
                    title="Edit?"
                  />
                  <BsCheckLg
                    className="check"
                    onClick={() => completeTodo(index)}
                    title="Complete?"
                  />
                </div>
              </div>
            ))}

          {isComplete === true &&
            completedTodos.map((item, index) => (
              <div className="list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    <small>Completed On: {item.completedOn}</small>
                  </p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="del"
                    onClick={() => deleteCompletedTodo(index)}
                    title="Delete?"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
