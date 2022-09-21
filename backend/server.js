const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const path = require("path");
const cors = require("cors");
const { engine } = require("express-handlebars");
require("colors");

const app = express();
app.use(cors());
require("cross-env");
dotenv.config({ path: path.join(__dirname, "..", "config", ".env") });

// set template engine
app.engine("handlebars", engine());
app.set("view engine", "handleras");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/contact", (req, res, next) => {
  res.render("contact");
});
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
