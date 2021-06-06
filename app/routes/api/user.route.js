var express = require('express');
var router = express.Router();
var controller = require("app/controller/api/user.controller");

/* GET users listing. */
router.get('/', (req, res, next) => controller.index(req, res, next));

router.post('/login', (req, res, next) => controller.view(req, res, next));

router.post('/', (req, res, next) => controller.store(req, res, next));

module.exports = router;