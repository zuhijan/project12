/* eslint-disable no-console */
/* eslint-disable quotes */
const routerUsers = require('express').Router();
const {
  getUsers, getUserById, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

routerUsers.post('/users', createUser);
routerUsers.get('/users', getUsers);
routerUsers.get('/users/:id', getUserById);
routerUsers.get('/:someRequest', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
routerUsers.patch('/users/me', updateProfile);
routerUsers.patch('/users/me/avatar', updateAvatar);
module.exports = routerUsers;
