var express = require('express');
var api = require('./api/index');
var web = require('./web/index');
var router = express.Router();


router.use('/api', api);
router.use('/', web);

module.exports = router;
