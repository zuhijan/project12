const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');


module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;

  console.log(typeof id);
  console.log(id);
  console.log(mongoose.Types.ObjectId.isValid(id));

  User.findById(id)
    .then((user) => {
      if (!user) {
        // return res.status(404).json({ message: 'Нет пользователя с таким id' });
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send(user);
    })
    // .catch(() => res.status(500).send({ message: 'Запрашиваемого пользователя не существует' }));
    .catch(next);
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { name, about }, { runValidators: true }, { new: true })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Нет пользователя с таким id' });
      }
      res.send({ user });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { avatar }, { runValidators: true }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      })
        .end();
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
