const corsDefault = require("cors");

module.exports = function (config) {
  const { app } = config;

  var corsOptions = {
    origin: process.env.CORS_ORIGIN || "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  };

  app.use(corsDefault(corsOptions));
};
