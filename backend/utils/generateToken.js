const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mock-interview';

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    is_admin: user.is_admin,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { generateToken, JWT_SECRET };
