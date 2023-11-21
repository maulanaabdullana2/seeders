// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  mobile: String,
  password: String,
  name: String,
  username: String,
  imageProfile: {
    type: String,
    default:
      'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
  },
  country: String,
  city: String,
  passwordResetExp: Date,
  otp: Number,
  role: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
