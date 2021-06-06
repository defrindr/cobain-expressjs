var express = require('express');
var user = require('./user.route');
var router = express.Router();

/* GET users listing. */
router.use('/user', user);

module.exports = router;
