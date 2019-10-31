const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => /^(http:[/][/]|https:[/][/])/.test(v),
      message: (props) => `${props.value} Эта строка должна быть ссылкой!`,
    },
    required: true,
  },
});
module.exports = mongoose.model('user', userSchema);
