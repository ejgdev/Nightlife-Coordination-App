'use strict';

var path = process.cwd();
const listIndex = require(path + '/app/controllers/list.js');

module.exports = function (app, passport) {

	app.route('/')
		.get(function (req, res) {			
			res.render('index.ejs',{
	      userLogged: req.isAuthenticated(),
	      user: req.user,
				data: null
	    });
		})
		.post((req, res) => listIndex(req, res));

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

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/login');
	}
}
