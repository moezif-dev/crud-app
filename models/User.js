const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
	_id:{
		type: Number, 
		required: true,
	},
  isActive: {
    type: Boolean,
    default: false,
  },
  balance: {
    type: String,
    default: '$0',
  },
  picture: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 0,
  },
  eyeColor: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  company: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  tags: [String],
  friends: [{
    id: {
      type: Number,
    },
    name: {
      type: String
    },
    _id: false,
  }],
  greeting: {
    type: String,
  }
});

module.exports = User = mongoose.model('users', UserSchema);