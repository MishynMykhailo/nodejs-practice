const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const path = require("path");
const cors = require("cors");
const { engine } = require("express-handlebars");
require("colors");
const sendEmail = require("./service/sendEmail");
const app = express();
app.use(cors());
require("cross-env");
dotenv.config({ path: path.join(__dirname, "..", "config", ".env") });

// set template engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./backend/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/contact", (req, res, next) => {
  res.render("contact");
});

app.post("/send", async (req, res) => {
  try {
    await sendEmail(req.body);
    res.render("contact", { msg: "Form has been send" });
  } catch (error) {
    res.send(error.message);
  }
});

// app.post("/send", (req, res) => {
//   res.render("contact", { msg: "Form has been send" });
// });

// app.post("/send", (req, res) => {
//   console.log(req.body);
//   res.send("Form has been send");
// });
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
