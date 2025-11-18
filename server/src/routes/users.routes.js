const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../auth/checkAuth');
const usersController = require('../controllers/users.controller');

router.post('/register', asyncHandler(usersController.register));
module.exports = router;
