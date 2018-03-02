'use strict';

const searchYelp = require('./searchYelp.js');

module.exports = (req, res) => listYelp(req, res);

const listYelp = (req, res) => {
  const search = searchYelp(req.body.location);
  search.then((data) => {
    req.session.location = req.body.location;
    req.session.data = data;
    res.redirect('/');
  });
};
