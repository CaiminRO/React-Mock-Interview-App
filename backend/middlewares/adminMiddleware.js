const { FORBIDDEN } = require("http-status-codes");

const adminMiddleware = (req, res, next) => {
  // If user is an admin, continue
  if (req.user && req.user.is_admin)
    return next();

  res.status(FORBIDDEN)
    .json({ message: 'Access denied. Admins only.' });
};

module.exports = adminMiddleware;
