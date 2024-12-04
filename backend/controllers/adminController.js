const { INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND } = require("http-status-codes");

const User = require('../models/User');

const adminController = {
  getAllUsers: async (req, res) => {
    try {
      // Get all users
      // const users = await User.findAll();
      const users = await User.findAllWithTaskCounts()

      // Prepare return data
      const userList = users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        is_admin: user.is_admin,
        total_tasks: user.total_tasks,
        completed_tasks: user.completed_tasks,
      }));

      res.json(userList);
    }
    catch (error) {
      console.error(error);
      res.status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  },

  updateUserAdminStatus: async (req, res) => {
    // Get requesting user's ID from user added in middleware
    const userId = req.user.id;

    // Target user's ID
    const targetUserId = req.params.id;

    // Destructure body
    const { is_admin } = req.body;

    try {
      // Check user exists
      const user = await User.findById(targetUserId);
      if (!user)
        return res.status(NOT_FOUND).json({ message: 'User not found' });

      // Prevent user from changing their own Admin status
      if (user.id === userId)
        return res.status(BAD_REQUEST)
          .json({ message: 'Cannot change your own admin status' });

      // Update the user's admin status
      await User.update(targetUserId, { is_admin });

      res.json({ message: 'User admin status updated successfully' });
    } catch (error) {
      console.error('Error updating user admin status:', error);
      res.status(INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  },
};

module.exports = adminController;
