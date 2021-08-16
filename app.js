// var createError = require("http-errors");
var express = require("express");
var exp = express();
const { App: config } = require("config/app.config");
let { errorParser } = require("helper/parse.mongoose.error");

// initialize configuration
new config(exp);

global.errorParser = errorParser;

module.exports = exp;
