const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
require("colors");
const connectDB = require("../config/db");
const app = express();
require("cross-env");
dotenv.config({ path: path.join(__dirname, "..", "config", ".env") });

// console.log(
//   dotenv.config({ path: path.join(__dirname, "..", "config", ".env") })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", require("./routes/filmsRoutes"));
app.use("/users", require("./routes/usersRoutes"));
app.use(require("./middlewares/badUrlError"));
app.use(require("./middlewares/errorHandler"));
const { PORT } = process.env;

(async () => {
  await connectDB();
})();
app.listen(PORT, () => {
  console.log(`Hello in backend on ${PORT}`.cyan);
});
