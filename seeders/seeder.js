const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const UserModel = require('../models/Users');

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
});

const users = [
  {
    email: 'admin1@binar.com',
    mobile: '082122839089',
    password: 'password1',
    name: 'admin1',
    username: 'admin1',
    imageProfile:
      'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
    country: 'indonesia',
    city: 'cirebon',
    passwordResetExp: new Date(),
    otp: 123456,
    role: 'admin',
  },
];

async function seedDatabase() {
  try {
    await UserModel.deleteMany();

    await UserModel.insertMany(users);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
