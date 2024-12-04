const express = require('express');

const authenticate = require('../middlewares/authenticate');
const adminMiddleware = require('../middlewares/adminMiddleware');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.use(authenticate, adminMiddleware);

router.get('/users', adminController.getAllUsers);
router.put('/users/:id/admin', adminController.updateUserAdminStatus);

module.exports = router;
