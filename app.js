const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use(errors);

// app.get('/:someRequest', (req, res) => {
//   res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
// });

app.listen(PORT);
