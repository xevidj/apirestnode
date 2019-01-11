const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//users
const UserSchema = new Schema({
  username: {
    type: String,
    unique : true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique : true,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('user', UserSchema);
