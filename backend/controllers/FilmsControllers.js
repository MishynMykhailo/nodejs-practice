const asyncHandler = require("express-async-handler");
// add
// getAll
// getOne
// update
// remove
const Films = require("../models/FilmsModel");
class FilmsController {
  add = asyncHandler(async (req, res) => {
    if (!req.body.title) {
      res.status(400);

      throw new Error("Film title is required!");
    }
    const film = await Films.create({ ...req.body });
    if (!film) {
      throw new Error("Film save error!");
    }
    res.status(201).json({ code: 201, message: "Film created!", data: film });
  });

  getAll = asyncHandler(async (req, res) => {
    console.log("getAll");
    const films = await Films.find({});
    if (!films) {
      res.status(400);
      throw Error("Not result");
    }
  });

  getById = asyncHandler(async (req, res) => {
    console.log("getById");
  });

  update = asyncHandler(async (req, res) => {
    console.log("update");
  });

  remove = asyncHandler(async (req, res) => {
    console.log("remove");
  });
}
module.exports = new FilmsController();
