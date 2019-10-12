/* eslint-disable quotes */

const routerUsers = require('express').Router();
const fs = require('fs');
const path = require('path');

const users = (req, res) => {
  const dataPath = path.join(__dirname, `../data/users.json`);
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(JSON.parse(data));
  });
};

const userId = (req, res) => {
  const dataPath = path.join(__dirname, `../data/users.json`);
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const usersData = JSON.parse(data);
    for (let i = 0; i < usersData.length; i += 1) {
      /* eslint-disable-next-line no-underscore-dangle */
      if (usersData[i]._id === req.params.id) {
        res.send(usersData[i]);
        return;
      }
    }
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  });
};

routerUsers.get('/users', users);
routerUsers.get('/users/:id', userId);
routerUsers.get('/:someRequest', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = routerUsers;
