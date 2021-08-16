var middleware = require("../app/middleware/index");
const express = require("express");
let router = express.Router();
const RegisterRoute = require("../core/register.controller");

module.exports = function (config) {
  const { app } = config;

  // register routes
  app.use("/", RegisterRoute(router));

  // catch 404 and forward to error handler
  app.use(middleware.notFoundHandler);

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
};
