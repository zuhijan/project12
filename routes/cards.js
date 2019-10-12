/* eslint-disable quotes */
const routerCards = require('express').Router();
const fs = require('fs');
const path = require('path');

const cards = (req, res) => {
  const dataPath = path.join(__dirname, `../data/cards.json`);
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return;
    }
    res.send(JSON.parse(data));
  });
};

routerCards.get('/cards', cards);

module.exports = routerCards;
