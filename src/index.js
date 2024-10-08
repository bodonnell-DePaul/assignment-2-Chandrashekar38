import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // If you don't have this file, you can remove this line.
import TodoList from './ToDoList'; // Ensure this is the correct path to your TodoList component.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TodoList />
  </React.StrictMode>
);
