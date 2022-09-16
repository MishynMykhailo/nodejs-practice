const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
class UsersController {
  // 1.Робимо валідацію данних
  // 2.Шукаєм,перевіряємо чи є такий користувач в БД
  // 3.Якщо є - видаємо помилку, що такий вже існує
  // 4.Якщо немає - то хешуємо пароль
  // 5.Зберігаєм користувача в БД
  // 6.Якщо не можем зберегти - видаємо помилку
  // 7.Якщо можем зберегти - відповідаєм JSON'ом з успіхом
  register = asyncHandler(async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const isExits = await User.findOne({ userEmail });
    if (isExits) {
      res.status(400);
      throw new Error("User already exists");
    }
    const hashPassword = await bcryptjs.hash(userPassword, 10);
    const candidate = await User.create({
      userName,
      userEmail,
      userPassword: hashPassword,
    });
    if (!candidate) {
      res.status(400);
      throw new Error("Unable save in BD");
    }
    res.status(201).json({ code: 201, data: { candidate } });
  });

  // 1.Робимо валідацію данних
  // 2.Шукаєм,перевіряємо чи є такий користувач в БД
  // 3.Якщо немає - пишемо, що треба зареєструватись
  // 4.Якщо є - розшифровуємо пароль
  // 5.Зберігаєм користувача в БД
  // 6.Якщо не можем зберегти - видаємо помилку
  // 7.Якщо можем зберегти - відповідаєм JSON'ом з успіхом
  login = asyncHandler(async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const user = await User.findOne({ userEmail });
    if (user) {
      res.status(400);
      throw new Error("You need to register");
    }

    const validPassword = await bcryptjs.compare(
      userPassword,
      user.userPassword
    );
    if (!validPassword || !user) {
      res.status(400);
      throw new Error("Invalid login or password");
    }
  });

  logout = asyncHandler(async (req, res) => {
    res.send("logout");
  });

  info = asyncHandler(async (req, res) => {
    res.send("info");
  });
}
module.exports = new UsersController();
