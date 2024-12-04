const express = require('express');

const accountController = require('../controllers/accountController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/register', accountController.register);
router.post('/login', accountController.login);
router.post('/logout', authenticate, accountController.logout);
router.get('/profile', authenticate, accountController.profile);
router.post('/refreshToken', authenticate, accountController.refreshToken);

module.exports = router;
