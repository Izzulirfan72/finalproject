var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
 
//mongodb+srv://hafizhazipin:1234h@F!z@cluster0.hz5ey.mongodb.net/3DCraftbn
//mongodb+srv://fypdatabase:123456[]\@cluster0.hz5ey.mongodb.net/3DCraftbn?retryWrites=true&w=majority

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://fypdatabase:123456[]\@cluster1.k1qff.mongodb.net/fypdatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//create a data schema
const usersSchema = new mongoose.Schema({
  username: String,
  name: String,
  addresse: String,
  birthdate: Date,
  email: String,
})

const users = mongoose.model("users", usersSchema);

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// render the mongoose router
app.post("/", function(req, res){
  let newCustConsult = new custConsult({

      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      date: req.body.date,
      time: req.body.time,
      product: req.body.product,
      message: req.body.message


  });
  newCustConsult.save();
  res.redirect('/');
})

module.exports = app;
