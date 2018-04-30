'use strict';

const searchYelp = require('./searchYelp.js');

module.exports = (req, res) => listYelp(req, res);

const listYelp = (req, res) => {
  const search = searchYelp(req.body.location);
  search.then((data) => {
    callIndex(req, res, data, req.body.location);
  });
};

const callIndex = (req, res, data, location) => {
  req.session.location = location;
  req.session.data = data;
  res.redirect('/');
};
