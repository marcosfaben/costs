var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var projectRouter = require('./routes/project');
var categoryRouter = require('./routes/category');

const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/costs'
mongoose.connect(url).then((db) => {
    console.log("Connected corrotly to server")
}).catch((err) => { console.log(err) })

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/projects', projectRouter);
app.use('/categories', categoryRouter);


module.exports = app;

