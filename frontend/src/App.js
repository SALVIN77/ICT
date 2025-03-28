import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; 

const API_URL = "http://localhost:5000/api/todos"; 

function App() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("ongoing"); 

  useEffect(() => {
    axios.get(API_URL).then((res) => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    if (!description.trim()) return;
    const res = await axios.post(API_URL, { description, status });
    setTodos([...todos, res.data]);
    setDescription("");
    setStatus("ongoing"); 
  };

 
  const toggleTodo = async (id, currentStatus) => {
    const newStatus = currentStatus === "ongoing" ? "completed" : "ongoing";
    const res = await axios.put(`${API_URL}/${id}`, { status: newStatus });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  
  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter a task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className={`todo-item ${todo.status === "completed" ? "completed" : ""}`}>
            <input
              type="checkbox"
              checked={todo.status === "completed"}
              onChange={() => toggleTodo(todo._id, todo.status)}
            />
            <span>{todo.description}</span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
