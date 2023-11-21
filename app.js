const express = require('express');
const morgan = require('morgan');
const routers = require('./routers');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use(routers);

module.exports = app;
