/* eslint-disable no-console */
/* eslint-disable quotes */
const routerUsers = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');


routerUsers.get('/', getUsers);
routerUsers.get('/:id', getUserById);
// routerUsers.get('/:someRequest', (req, res) => {
//   res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
// });
routerUsers.patch('/me', updateProfile);
routerUsers.patch('/me/avatar', updateAvatar);
module.exports = routerUsers;
