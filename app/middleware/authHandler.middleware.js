const jwt = require('jsonwebtoken');

exports.authHandler = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendError(401);

    jwt.verify(token, process.env.TOKEN_SECRET.toString(), (err, user) => {
        if (err) return res.sendError(403);
        req.user = user;
        next();
    });
}