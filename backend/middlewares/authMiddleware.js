const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
// 1.Прочитати токен із заголовка
// 2.Розшифровуємо токен
// 3.Якщо валідний токен, то користувачу ставимо 0
// 4.Якщо невалідний - видаємо помилку, що токен невалідний або що користувач не зареєстровано
const authMiddleware = asyncHandler(async (req, res, next) => {
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
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    res.status(400);
    throw new Error("No token validation");
  }
  const user = await User.findById(decoded.id).select("-userPassword");
  req.user = user;
  next();
});

module.exports = authMiddleware;
