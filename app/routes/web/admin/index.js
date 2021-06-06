var express = require('express');
var main=require("./main");
var router = express.Router();

/* GET home page. */
router.use('/', main);

module.exports = router;
