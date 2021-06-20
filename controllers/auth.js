const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    // Пользователь существует, проверяем пароль
    const passworfResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passworfResult) {
      // Пароли совпали, генерируем токен
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        keys.jwt,
        { expiresIn: 60 * 60 }
      );

      res.status(200).json({
        token: `Bearer ${token}`,
      });
    } else {
      // Пароли не совпали
      res.status(401).json({
        message: 'Неверный пароль, попробуйте еще раз',
      });
    }
  } else {
    // Пользователя не существуе, ошибка
    res.status(404).json({
      message: 'Пользователь с такм email не найден',
    });
  }
};

module.exports.register = async function (req, res) {
  // email pasword
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    // Пользователь существует, отправляем ошибку
    res.status(409).json({
      message: 'Такой email уже существует',
    });
  } else {
    // Создаем пользователя
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      //Обрабатываем ошибки
    }
  }
};
