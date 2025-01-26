const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();

const fs = require('fs');

// Include controllers
fs.readdirSync('controllers').forEach(function (file) {
  if (file.substr(-3) == '.js') {
    const route = require('./controllers/' + file);
    route.controller(app);
  }
});

//connect to mongodb

mongoose
  .connect('mongodb://localhost:27017/express_app')
  .then(() => {
    console.log('Connection has been made');
  })
  .catch((err) => {
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000, function () {
  console.log('listening on 3000');
});
module.exports = app;
