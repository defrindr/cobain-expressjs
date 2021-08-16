var path = require("path");
var express = require("express");
module.exports = function (config) {
  const { app } = config;
  app.use(express.static(path.resolve(process.cwd(), "public")));
};
