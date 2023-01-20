require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth');
var tourRouter = require('./routes/tours')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hotelsRouter = require('./routes/hotels');
var tourGuideRouter = require('./routes/tourGuides');
var transactionsRouter = require('./routes/transactions');
var transportationsRouter = require('./routes/transportations');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api/tours', tourRouter);
app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/tourGuides', tourGuideRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/transportations', transportationsRouter);

module.exports = app;
