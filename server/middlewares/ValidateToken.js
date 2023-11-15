const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.slice(7,);
    jwt.verify(token, process.env.JWTSECRETKEY, (err, decoded) => {
      if (err) {
        res.status(401)
        return res.json({message:"User is not authorized"});
      }
      req.user = decoded.user;
      next();
    });
  }
  if (!token) {
    return res.status(401).send({message:"User is not authorized or token is missing"})
  }
});

module.exports = validateToken;