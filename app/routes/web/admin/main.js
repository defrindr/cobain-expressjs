var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/beranda', function(req, res, next) {
  res.render('index', { title: 'Main Index' });
});

module.exports = router;
