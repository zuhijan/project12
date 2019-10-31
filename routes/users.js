/* eslint-disable no-console */
/* eslint-disable quotes */
const routerUsers = require('express').Router();
// const fs = require('fs');
// const path = require('path');
const { getUsers, getUserById, createUser } = require('../controllers/users');

// const users = (req, res) => {
//   const dataPath = path.join(__dirname, `../data/users.json`);
//   fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     res.send(JSON.parse(data));
//   });
// };
// const userId = (req, res) => {
//   const dataPath = path.join(__dirname, `../data/users.json`);
//   fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     const usersData = JSON.parse(data);
//     for (let i = 0; i < usersData.length; i += 1) {
//       if (usersData[i]._id === req.params.id) {
//         res.send(usersData[i]);
//         return;
//       }
//     }
//     res.status(404).send({ message: 'Нет пользователя с таким id' });
//   });
// };
routerUsers.get('/users', getUsers);
routerUsers.post('/users', createUser);
routerUsers.get('/users/:id', getUserById);
routerUsers.get('/:someRequest', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
module.exports = routerUsers;
