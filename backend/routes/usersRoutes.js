const router = require("express").Router();
const UsersController = require("../controllers/UsersControllers");
// /registration: save new  user in to db
router.post(
  "/register",
  (req, res, next) => {
    console.log("Joi work");
    next();
  },
  UsersController.register
);

// authorization: перевірка прав доступу
router.post(
  "/login",
  (req, res, next) => {
    console.log("Joi work");
    next();
  },
  UsersController.login
);

// logout: видалення прав доступу
router.get("/logout", UsersController.logout);

router.get("/info", UsersController.info);
// authefication перевірка даних користувача з тим що у нас в дб

module.exports = router;
