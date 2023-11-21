const express = require('express');
const morgan = require('morgan');
const routers = require('./routers');
const ApiError = require('./utils/apiError');
const errorHandler = require('./controllers/errorController');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(routers);
app.all('*', (req, res, next) => {
  next(new ApiError(`Routes does not exist`, 404));
});
app.use(errorHandler);

module.exports = app;
