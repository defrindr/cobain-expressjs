exports.Log = (req, res, next) => {
  console.log(
    Date("YYYY-mm-dd").toString() + " : Route " + req.originalUrl + " diakses"
  );
  next();
};
