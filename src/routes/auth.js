const express = require('express');
const authController = require('../App/Controller/AuthController');
const middlewareController = require('../MiddleWare/auth');
const router = express.Router();

router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/logout',authController.logout);
router.get('/info',middlewareController.verifyToken,authController.getUser);
router.get('/refresh_token', authController.refreshToken)

module.exports = router;