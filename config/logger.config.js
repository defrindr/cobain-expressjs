var logger = require("morgan");
module.exports = function (config) {
  let { app } = config;
  app.use(logger("dev"));
};
