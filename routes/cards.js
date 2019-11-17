/* eslint-disable quotes */
const routerCards = require('express').Router();
const {
  getCards, createCard, removeCardById, addLike, removeLike,
} = require('../controllers/cards');

routerCards.get('/', getCards);
routerCards.post('/', createCard);
routerCards.delete('/:cardId', removeCardById);
routerCards.put('/:cardId/likes', addLike);
routerCards.delete('/:cardId/likes', removeLike);


module.exports = routerCards;
