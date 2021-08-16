var path = require("path");
module.exports = function (config) {
  const { app } = config;

  app.set("views", path.resolve(process.cwd(), "app/views"));
  app.set("view engine", "hbs");
};
