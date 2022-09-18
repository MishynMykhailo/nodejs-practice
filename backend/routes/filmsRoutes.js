const router = require("express").Router();
const filmsController = require("../controllers/filmsControllers");
const roleMiddleware = require("../middlewares/roleMiddleware");
// add
router.post(
  "/films",
  (req, res, next) => {
    console.log("сработал JOI"), next();
  },
  filmsController.add
);
// getAll
router.get("/films", roleMiddleware(["ADMIN"]), filmsController.getAll);

// getOne
router.get(
  "/films/:id",
  roleMiddleware(["ADMIN", "USER"]),
  filmsController.getById
);

// update
router.patch("/films/:id", roleMiddleware(["ADMIN"]), filmsController.update);

// remove
router.delete("/films/:id", roleMiddleware(["ADMIN"]), filmsController.remove);

module.exports = router;
