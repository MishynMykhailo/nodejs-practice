const { check } = require("express-validator");
console.log(check());
module.exports = [
  check("userName", "User name must be not empty").notEmpty(),
  check("userPassword", "User password must be minimum 4 sybmol").isLength({
    min: 4,
    max: 10,
  }),
  check("userEmail", "Not valid email").normalizeEmail().isEmail(),
];
