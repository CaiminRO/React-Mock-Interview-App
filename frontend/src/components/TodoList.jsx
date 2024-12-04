import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import { AuthContext } from '../contexts/AuthContext';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const { token, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get('/api/todos', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTodos(res.data);
      }
      catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401)
          logout();
      }
    }
    
    fetchTodos();
  }, [logout, token]);
  
  const addTodo = async (e) => {
    e.preventDefault();

    if (task.trim()) {
      try {
        const res = await axios.post(
          '/api/todos',
          { text: task.trim() },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setTodos([...todos, res.data]);
        setTask('');
      }
      catch (error) {
        console.error(error);
      }
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      const res = await axios.put(
        `/api/todos/${id}`,
        { completed: !todo.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTodos(todos.map((t) => (t.id === id ? res.data : t)));
    }
    catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTodos(todos.filter((todo) => todo.id !== id));
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="todo-list">
      <form onSubmit={addTodo} className="form">
        <input
          type="text"
          placeholder="Add Task"
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button type="submit" className="button">
          Add
        </button>
      </form>

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
