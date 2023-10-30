import React, { useState, useEffect } from 'react';
import db from './db';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const editTodo = async () => {
    if (editingText.trim().length) {
      await db.todos.update(editingId, { text: editingText });
      const updatedTodos = await db.todos.toArray();
      setTodos(updatedTodos);
      setEditingId(null);
      setEditingText('');
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      const allTodos = await db.todos.toArray();
      setTodos(allTodos);
    };

    loadTodos();
  }, []);

  const addTodo = async () => {
    if (task.trim().length) {
      await db.todos.add({ text: task, completed: false });
      setTask('');
      const updatedTodos = await db.todos.toArray();
      setTodos(updatedTodos);
    }
  };

  const deleteTodo = async (id) => {
    await db.todos.delete(id);
    const updatedTodos = await db.todos.toArray();
    setTodos(updatedTodos);
  };

  const toggleTodo = async (id) => {
    const todo = await db.todos.get(id);
    await db.todos.update(id, { completed: !todo.completed });
    const updatedTodos = await db.todos.toArray();
    setTodos(updatedTodos);
  };

  // src/App.js の return 部分のみ

  return (
    <div className='App'>
      <input value={task} onChange={(e) => setTask(e.target.value)} placeholder='New Task' />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) =>
          editingId === todo.id ? (
            <li key={todo.id}>
              <input value={editingText} onChange={(e) => setEditingText(e.target.value)} />
              <button className='edit-btn' onClick={editTodo}>
                Update
              </button>
              <button className='delete-btn' onClick={() => setEditingId(null)}>
                Cancel
              </button>
            </li>
          ) : (
            <li key={todo.id}>
              <span
                onClick={() => toggleTodo(todo.id)}
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              >
                {todo.text}
              </span>
              <div>
                <button className='edit-btn' onClick={() => startEditing(todo.id, todo.text)}>
                  Edit
                </button>
                <button className='delete-btn' onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export default App;
