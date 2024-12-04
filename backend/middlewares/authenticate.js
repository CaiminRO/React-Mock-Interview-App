const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/generateToken');
const { UNAUTHORIZED, FORBIDDEN } = require("http-status-codes");

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  // If no token, reject access
  if (!token)
    return res.status(UNAUTHORIZED)
      .json({ message: 'Access token required' });

  // If token invalid, reject access
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return res.status(FORBIDDEN)
        .json({ message: 'Invalid token' });

    // Add user in middleware
    req.user = user;
    next();
  });
}

module.exports = authenticate;