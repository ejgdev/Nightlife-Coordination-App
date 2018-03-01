'use strict';

const express = require('express');
const routes = require('./app/routes/index.js');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true})); // true for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useMongoClient: true});

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/views', express.static(process.cwd() + '/views'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(passport.initialize());
app.use(passport.session());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'night app awesome',
  resave: true,
  saveUninitialized: true,
  cookie: {
		secure: true,
		maxAge: 24*60*60*1000,  // 24 hours
	}
}));

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Server listening on port ' + port + '...');
});
