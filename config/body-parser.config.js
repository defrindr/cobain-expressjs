let express = require("express");
const multer = require("multer");
let cookieParser = require("cookie-parser");

module.exports = function (config) {
  const { app } = config;
  let form_data = multer();
  
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );
  app.use(cookieParser());
  app.use(form_data.array());
};
