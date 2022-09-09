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
router.get("/films", FilmsController.getAll);
router.get("/films/:id", FilmsController.getById);
router.patch("/films/:id", FilmsController.update);
router.delete("/films/:id", FilmsController.remove);
// getAll
// getOne
// update
// remove
module.exports = router;
