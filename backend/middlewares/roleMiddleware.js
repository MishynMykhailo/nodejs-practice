const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

module.exports = function (rolesArray) {
  return asyncHandler(async (req, res, next) => {
    if (!req.headers.authorization) {
      res.status(400);
      throw new Error("No authorization provided");
    }
    if (!req.headers.authorization.startsWith("Bearer")) {
      res.status(400);
      throw new Error("No Bearer token");
    }
    const token = await req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(400);
      throw new Error("No token provided");
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      res.status(400);
      throw new Error("No token validation");
    }
    let hasRole = false;
    decode.roles.forEach((role) => {
      if (rolesArray.includes(role)) {
        hasRole = true;
      }
    });
    if (!hasRole) {
      return res
        .status(403)
        .json({ code: 403, message: "You have not access" });
    }
    next();
  });
};
