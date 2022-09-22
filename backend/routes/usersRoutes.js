const router = require("express").Router();
const usersController = require("../controllers/usersControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const registerValidation = require("../middlewares/validation/registerValidation");
// const { check } = require("express-validator");
// /registration: save new  user in to db
router.post("/register", registerValidation, usersController.register);
// router.post(
//   "/register",
//   [
//     check("userName", "User name must be not empty").notEmpty(),
//     check("userPassword", "User password must be minimum 4 sybmol").isLength({
//       min: 4,
//       max: 10,
//     }),
//   ],
//   usersController.register
// );
// authorization: перевірка прав доступу
router.post("/login", usersController.login);

// logout: видалення прав доступу
router.get("/logout", authMiddleware, usersController.logout);

router.get("/info", authMiddleware, usersController.info);
// authefication перевірка даних користувача з тим що у нас в дб

module.exports = router;
