const jwt = require("jsonwebtoken");

function generateToken(username) {
  return jwt.sign(username, process.env.JWT_TOKEN.toString(), {
    expiresIn: 1800,
  });
}

function checkToken(token) {
  jwt.verify(token, process.env.JWT_TOKEN.toString(), async (err, data) => {
    let user = await require("mongoose").model("user").find({
      username: data.username,
    });

    if (err) return [false, null];
    return [true, user];
  });
}

exports.generateToken = generateToken;
exports.checkToken = checkToken;
