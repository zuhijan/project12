/* eslint-disable quotes */
const routerCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, removeCardById, addLike, removeLike,
} = require('../controllers/cards');


routerCards.get('/', getCards);
routerCards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(
      // eslint-disable-next-line no-useless-escape
      /^(http:[\/][\/]|https:[\/][\/])(((\d{1,3}[\.]){3}\d{1,3}([:]\d{2,5})?)[\/]?|(w{3}[\.])?\w+([\.]\w+)?([^www][\.][a-zA-Z]{2,5})([\/]\w+)*(#)?[\/]?)/,
    ),
  }),
}), createCard);
routerCards.delete('/:cardId', removeCardById);
routerCards.put('/:cardId/likes', addLike);
routerCards.delete('/:cardId/likes', removeLike);


module.exports = routerCards;
