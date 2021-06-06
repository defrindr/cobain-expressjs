var createError = require('http-errors');
var express = require('express');
var exp = express();
const {
    App: config
} = require('config/app.config');
let {
    errorParser
} = require("helper/parse.mongoose.error");

let conf = new config(exp);

global.errorParser = errorParser;
conf.env();
conf.logger();
conf.mongoose();
conf.cors();
conf.asset();
conf.response();
conf.bodyParser();
conf.route();
conf.template();



module.exports = exp;