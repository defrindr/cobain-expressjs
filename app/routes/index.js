var express = require("express");
const RegisterRoute = require("../../core/register.controller");
var router = express.Router();

module.exports = RegisterRoute(router);
