'use strict';

var path = process.cwd();

module.exports = function (app, passport) {

	app.route('/')
		.get(function (req, res) {
			res.render('index.ejs',{
	      userLogged: req.isAuthenticated(),
	      user: req.user
	    });
		});

		app.route('/login')
			.get((req, res) => res.redirect('/'));

		app.route('/logout')
			.get((req, res) => {
				req.logout();
				res.redirect('/');
			});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
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
