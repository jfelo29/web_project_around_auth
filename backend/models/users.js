const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
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
    required: [true, 'User phone number required'],
    /* validate: {
      alidator: function (v) {
        return /^(https?:\/\/(?:www\.)?[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]+#?)$/.test(v);
      },
      message: props => `${props.value} no es un enlace válido!`
    } */

  },
});
const User = mongoose.model('user', usersSchema);
module.exports = User;

