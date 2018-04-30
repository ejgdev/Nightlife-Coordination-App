'use strict';

var path = process.cwd();
const listIndex = require(path + '/app/controllers/list.js');
const handlerIndex = require(path + '/app/controllers/searchHandler.js');
const updatePlace = require(path + '/app/controllers/updatePlace.js');

module.exports = function (app, passport) {

	app.route('/')
		.get((req, res) => handlerIndex(req, res))
		.post((req, res) => listIndex(req, res));

		app.route('/home')
			.get((req, res) => homeHandler(req, res));

		app.route('/api/:id')
			.get((req, res) => updatePlace(req, res));

		app.route('/login')
			.get((req, res) => res.redirect('/'));

		app.route('/logout')
			.get((req, res) => {
				req.logout();
				res.redirect('/');
			});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
};

const homeHandler  = (req, res) => {
	if(!req.session.data){
		res.redirect('/');
	}
	else{
		delete req.session.location;
		delete req.session.data;
		delete req.session.places;
		res.redirect('/');
	}
}
