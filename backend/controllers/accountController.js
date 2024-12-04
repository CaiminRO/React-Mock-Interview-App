const bcrypt = require('bcrypt');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, CREATED} = require('http-status-codes');

const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');

const accountController = {
  register: async (req, res) => {
    // Destructure body
    const { username, email, password } = req.body;

    try {
      // Check if username exists -> check if email exists
      if (await User.findByUsername(username) || await User.findByEmail(email))
        return res.status(BAD_REQUEST)
          .json({ message: 'Username or email already exists' });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Add user to DB
      await User.createUser({
        username,
        email,
        password: hashedPassword,
      });

      // Register successful
      res.status(CREATED)
        .json({ message: 'Registration successful. Please log in.' });
    }
    catch (error) {
      console.error(error);
      res.status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    // Destructure body
    const { username, password } = req.body;

    try {
      // Check user exists
      const user = await User.findByUsername(username) || await User.findByEmail(username);
      if (!user)
        return res.status(BAD_REQUEST)
          .json({ message: 'Invalid credentials' });

      // Check password valid
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(BAD_REQUEST)
          .json({ message: 'Invalid credentials' });

      // Login successful: Issue JWT
      res.json({ accessToken: generateToken(user) });
    }
    catch (error) {
      console.error(error);
      res.status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  },

  logout: (req, res) => {
    res.json({ message: 'Logged out successfully' });
  },

  profile: async (req, res) => {
    // Get requesting user's ID from user added in middleware
    const userId = req.user.id;

    try {
      // Get user data by userId
      const user = await User.findById(userId);
      if (!user)
        return res.status(NOT_FOUND)
          .json({ message: 'User not found' });

      // Return user data
      res.json({
        username: user.username,
        email: user.email,
        is_admin: user.is_admin,
      });
    }
    catch (error) {
      console.error(error);
      res.status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  },

  refreshToken: async (req, res) => {
    // Get requesting user's ID from user added in middleware
    const userId = req.user.id;

    try {
      // Get user data by userId
      const user = await User.findById(userId);
      if (!user)
        return res.status(NOT_FOUND)
          .json({message: 'User not found'});

      res.json({ accessToken: generateToken(user) });
    } catch (error) {
      console.error('Error refreshing token:', error);
      res.status(INTERNAL_SERVER_ERROR)
        .json({message: 'Internal server error'});
    }
  },
};

module.exports = accountController;
