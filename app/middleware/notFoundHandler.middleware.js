var createError = require("http-errors");

module.exports = function (req, res, next) {
  // hadle page not found json
  if (req.headers["content-type"]) {
    if (req.headers["content-type"].toLowerCase() == "application/json") {
      return res.status(404).json({
        success: false,
        message: "Page not found",
        data: null,
      });
    }
  }
  next(createError(404));
};
