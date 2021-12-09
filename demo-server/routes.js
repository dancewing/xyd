const express = require('express');
const router = express.Router();

const basic = require('./controllers/BasicController.js');
const user = require('./controllers/UserController');

router.get('/', basic.home);
router.post('/second', basic.second);
router.post('/login', user.login);
router.get('/my', user.my);

module.exports = router;
