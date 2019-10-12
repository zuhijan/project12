const express = require('express');
const path = require('path');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routerCards);
app.use('/', routerUsers);

app.listen(PORT);
