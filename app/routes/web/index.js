var express = require('express');
var admin = require("./admin/index");
var router = express.Router();

/* Admin page */
router.use("/admin",admin);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
