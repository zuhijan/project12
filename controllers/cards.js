const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.removeCardById = (req, res) => {
  const owner = req.user._id;

  Card.findById(req.params.cardId)
    .then((card) => {
      if (owner === card.owner._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => res.status(200).send({ message: 'Карточка удалена' }))
          .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
      } else {
        res.status(403).send({ message: 'Недостаточно прав' });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
module.exports.addLike = (req, res) => {
  // const { cardId } = req.params;
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: 'Нет карточки с таким id' });
      }
      return res.send(card);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
