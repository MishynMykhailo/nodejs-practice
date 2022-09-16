const router = require("express").Router();
const FilmsController = require("../controllers/FilmsControllers");

// add
router.post(
  "/films",
  (req, res, next) => {
    console.log("сработал JOI"), next();
  },
  FilmsController.add
);
// getAll
router.get("/films", FilmsController.getAll);

// getOne
router.get("/films/:id", FilmsController.getById);

// update
router.patch("/films/:id", FilmsController.update);

// remove
router.delete("/films/:id", FilmsController.remove);

module.exports = router;
