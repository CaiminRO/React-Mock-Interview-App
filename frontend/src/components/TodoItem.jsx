import React from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className="todo-item">
      <span
        className={`todo-text ${todo.completed ? 'completed' : ''}`}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </span>

      <button onClick={() => deleteTodo(todo.id)} className="button">
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
