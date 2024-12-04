const { INTERNAL_SERVER_ERROR, BAD_REQUEST, CREATED, NOT_FOUND } = require("http-status-codes");

const Todo = require('../models/Todo');

const todoController = {
  getTodos: async (req, res) => {
    // Get requesting user's ID from user added in middleware
    const userId = req.user.id;

    try {
      // Get all todos
      const todos = await Todo.findAllByUserId(userId);

      res.json(todos);
    }
    catch (error) {
      console.error(error);
      res.status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  },

  createTodo: async (req, res) => {
    // Get text from body
    const { text } = req.body;

    // Check text not null and not empty
    if (!text)
      return res.status(BAD_REQUEST)
        .json({ message: 'Text is required' });

    try {
      // Add to-do entry
      const todo = await Todo.createTodo({ text, user_id: req.user.id });

      res.status(CREATED)
        .json(todo);
    }
    catch (error) {
      console.error(error);
      res.status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  },

  updateTodo: async (req, res) => {
    // Get to-do ID from params
    const { id } = req.params;

    // Get updated text AND/OR if it was completed from body
    const { text, completed } = req.body;

    // Get requesting user's ID from user added in middleware
    const userId = req.user.id;

    try {
      // Check to-do with ID exists, and is for user
      const todo = await Todo.findById(id);
      if (!todo || todo.user_id !== userId)
        return res.status(NOT_FOUND)
          .json({ message: 'Todo not found' });

      // Update to-do entry
      const updatedTodo = await Todo.updateTodo(id, { text, completed });

      res.json(updatedTodo);
    }
    catch (error) {
      console.error(error);
      res.status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  },

  deleteTodo: async (req, res) => {
    // Get to-do ID from params
    const { id } = req.params;

    // Get requesting user's ID from user added in middleware
    const userId = req.user.id;

    try {
      // Check to-do with ID exists, and is for user
      const todo = await Todo.findById(id);
      if (!todo || todo.user_id !== userId)
        return res.status(NOT_FOUND)
          .json({ message: 'Todo not found' });

      // Delete to-do entry
      await Todo.deleteTodo(id);

      res.json({ message: 'Todo deleted' });
    }
    catch (error) {
      console.error(error);
      res.status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  },
};

module.exports = todoController;
