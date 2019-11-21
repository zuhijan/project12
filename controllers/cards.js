/* eslint-disable no-console */
const mongoose = require('mongoose');
const Card = require('../models/card');
const User = require('../models/user');

const { NotFoundError, ForbiddenError, SuccesError } = require('../errors/all-status-err');


function objectIdValid(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundError('Нет карточки с таким id');
  }
}


module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  // добавил проверку если пользователя удалил из базы начинались нелогичные вещи с созданием карточ
  User.findById(owner)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Вас не существует в базе данных, обратитесь к администратору');
      }
    })
    .catch(next);
  // конец проверки
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.removeCardById = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  console.log(mongoose.Types.ObjectId.isValid(cardId));

  objectIdValid(cardId);

  Card.findById(cardId)
    .then((card) => {
      if (owner === card.owner.toString()) {
        Card.findByIdAndRemove(cardId)
          // .then(() => res.status(200).send({ message: 'Карточка удалена' }))
          .then(() => {
            throw new SuccesError('Карточка удалена');
          })
          .catch(next);
      }
      throw new ForbiddenError('Недостаточно прав');
    })
    // .catch(() => { throw new ForbiddenError('Недостаточно прав'); })
    .catch(next);
};
module.exports.addLike = (req, res, next) => {
  const { cardId } = req.params;
  const owner = req.user._id;

  objectIdValid(cardId);

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(next);
};
