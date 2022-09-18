const asyncHandler = require("express-async-handler");
const Films = require("../models/filmsModel");

class FilmsController {
  // add
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

  // getAll
  getAll = asyncHandler(async (req, res) => {
    const films = await Films.find({});
    if (!films) {
      res.status(400);
      throw Error("Not result");
    }
    res.status(200).json({ code: 200, data: { films } });
  });

  // getOne
  getById = asyncHandler(async (req, res) => {
    console.log("getById");
  });

  // update
  update = asyncHandler(async (req, res) => {
    console.log("update");
  });

  // remove
  remove = asyncHandler(async (req, res) => {
    console.log("remove");
  });
}
module.exports = new FilmsController();
