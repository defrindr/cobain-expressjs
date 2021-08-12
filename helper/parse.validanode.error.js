exports.errorParser = function (err) {
  err = Object.values(err);
  let msg = err.flat();

  return msg.join("\n");
};
