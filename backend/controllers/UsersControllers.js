const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("../models/rolesModel");
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
    const userRole = await Role.findOne({ value: "USER" });

    const candpayloadate = await User.create({
      userName,
      userEmail,
      userPassword: hashPassword,
      roles: [userRole.value],
    });
    if (!candidate) {
      res.status(400);
      throw new Error("Unable save in BD");
    }
    res.status(201).json({ code: 201, data: { candidate } });
  });

  // 1.Робимо валідацію данних
  // 2.Шукаєм, перевіряємо чи є такий користувач в БД
  // 3.Якщо немає - пишемо, що треба зареєструватись
  // 4.Якщо є - розшифровуємо пароль
  // 5.Якщо логін і пароль валідні - генеруємо токен
  // 6.Зберігаєм користувача з токеном
  // 7.відповідаєм JSON'ом з успіхом
  login = asyncHandler(async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const user = await User.findOne({ userEmail });

    if (!user) {
      res.status(400);
      throw new Error("You need to registers");
    }

    const validPassword = await bcryptjs.compare(
      userPassword,
      user.userPassword
    );
    if (!validPassword || !user) {
      res.status(400);
      throw new Error("Invalid login or password");
    }
    const payload = {
      id: user._id,
      roles: user.roles,
    };
    const token = this.generateToken(payload);
    user.token = token;
    const userWithToken = await user.save();
    if (!userWithToken) {
      res.status(400);
      throw new Error("Can't save token");
    }
    res.status(201).json({
      code: 201,
      data: {
        user: {
          email: user.userEmail,
          token: user.token,
        },
      },
    });
  });

  // 1.Знайти користувача по id з токену
  // 2.Якщо валідний токен,то користувачу ставимо токен-null
  // 7.відповідаєм JSON'ом з успіхом
  logout = asyncHandler(async (req, res) => {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      res.status(400);
      throw new Error("Not found id user");
    }

    user.token = null;
    await user.save();
    res.status(200).json({
      code: 200,
      message: "logout success",
    });
  });

  info = asyncHandler(async (req, res) => {
    await res.send(req.user);
  });
  generateToken = (payload) => {
    const { id, roles } = payload;
    return jwt.sign({ id, roles }, process.env.JWT_SECRET, { expiresIn: "8h" });
  };
}
module.exports = new UsersController();
