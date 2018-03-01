'use strict';

const searchYelp = require('./searchYelp.js');

module.exports = (req, res) => listYelp(req, res);

const listYelp = (req, res) => {
  const search = searchYelp(req.body.location);
  search.then((data) => {
    res.render('index.ejs',{
      userLogged: req.isAuthenticated(),
      user: req.user,
      data: data
    });
  });
};

const extractBarInfo = (temp) => {
  return {
    id: bar.id,
    name: bar.name,
    image_url: bar.image_url,
    snippet_text: bar.snippet_text,
    url: bar.url,
    price: bar.price,
    rating: bar.rating,
    review_count: bar.review_count,
    phone: bar.phone
  }
};
