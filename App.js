import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const addTask = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { text: input, completed: false }]);
      setInput('');
    }
  };

  const editTask = (index) => {
    setInput(todos[index].text);
    setEditingIndex(index);
  };

  const updateTask = () => {
    if (input.trim() !== '') {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = { ...updatedTodos[editingIndex], text: input };
      setTodos(updatedTodos);
      setInput('');
      setEditingIndex(null);
    }
  };

  const toggleCompleted = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = { ...updatedTodos[index], completed: !updatedTodos[index].completed };
    setTodos(updatedTodos);
  };

  const deleteTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTodos = [...todos];
      const temp = updatedTodos[index];
      updatedTodos[index] = updatedTodos[index - 1];
      updatedTodos[index - 1] = temp;
      setTodos(updatedTodos);
    }
  };

  const moveTaskDown = (index) => {
    if (index < todos.length - 1) {
      const updatedTodos = [...todos];
      const temp = updatedTodos[index];
      updatedTodos[index] = updatedTodos[index + 1];
      updatedTodos[index + 1] = temp;
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="App">
      <h1>TODO - LIST APP</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {editingIndex !== null ? (
          <button onClick={updateTask}>Update</button>
        ) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>
      <ul>
        {todos.map((task, index) => (
          <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
            <div>
              <button onClick={() => toggleCompleted(index)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
              {index > 0 && (
                <button onClick={() => moveTaskUp(index)}>
                  <span>&#8593;</span>
                </button>
              )}
              {index < todos.length - 1 && (
                <button onClick={() => moveTaskDown(index)}>
                  <span>&#8595;</span>
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
