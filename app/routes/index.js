'use strict';

var path = process.cwd();
const listIndex = require(path + '/app/controllers/list.js');

module.exports = function (app, passport) {

	app.route('/')
		.get(function (req, res) {
			if(!req.session.data){
				res.render('index.ejs',{
		      userLogged: req.isAuthenticated(),
		      user: req.user,
					inputdata: null,
					data: null
		    });
			}
			else{
				res.render('index.ejs',{
		      userLogged: req.isAuthenticated(),
		      user: req.user,
					inputdata: req.session.location,
					data: req.session.data
		    });
			}
		})
		.post((req, res) => listIndex(req, res));

		app.route('/home')
			.get(function (req, res) {
				if(!req.session.data){
					res.redirect('/');
				}
				else{
					delete req.session.location;
					delete req.session.data;
					res.redirect('/');
				}
			});

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
