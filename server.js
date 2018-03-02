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

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true,
	cookie: {
        secure: false, // Secure is Recommeneded, However it requires an HTTPS enabled website (SSL Certificate)
        maxAge: 664000000 // 7 Days in miliseconds
    }
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Server listening on port ' + port + '...');
});
