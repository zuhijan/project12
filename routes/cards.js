/* eslint-disable quotes */
const routerCards = require('express').Router();
const {
  getCards, createCard, removeCardById, addLike, removeLike,
} = require('../controllers/cards');

routerCards.get('/cards', getCards);
routerCards.post('/cards', createCard);
routerCards.delete('/cards/:cardId', removeCardById);
routerCards.put('/cards/:cardId/likes', addLike);
routerCards.delete('/cards/:cardId', removeLike);


module.exports = routerCards;
