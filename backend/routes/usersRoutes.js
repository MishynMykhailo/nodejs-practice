const router = require("express").Router();
const usersController = require("../controllers/usersControllers");
const authMiddleware = require("../middlewares/authMiddleware");

// /registration: save new  user in to db
router.post(
  "/register",
  (req, res, next) => {
    console.log("Joi work");
    next();
  },
  usersController.register
);

// authorization: перевірка прав доступу
router.post(
  "/login",
  (req, res, next) => {
    console.log("Joi work");
    next();
  },
  usersController.login
);

// logout: видалення прав доступу
router.get("/logout", authMiddleware, usersController.logout);

router.get("/info", authMiddleware, usersController.info);
// authefication перевірка даних користувача з тим що у нас в дб

module.exports = router;
