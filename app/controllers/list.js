'use strict';

const searchYelp = require('./searchYelp.js');
const Place = require('../models/places');

module.exports = (req, res) => listYelp(req, res);

const listYelp = (req, res) => {
  const search = searchYelp(req.body.location);
  search.then((data) => {
    findPlaces(req, res, data, req.body.location);
  });
};


const findPlaces = (req, res, data, location) => {
  req.session.places = [];
  for (let value of data){
    Place.findOne({ 'placeId': value.id }, function(err,info){
      if(err)
        console.log("ERROR");
      else {
        if (info) {
          let userGoing;
          if(req.user)
            userGoing = info.users.includes(req.user.id);
          else
            userGoing = false;

          req.session.places.push({
            id: value.id,
            group: info.users.length,
            user: userGoing,
          });
        }
        else {
          req.session.places.push({
            id: value.id,
            group: 0,
            user: false,
          });
        }
      }
  });
  }
  callIndex(req, res, data, location);
};

const callIndex = (req, res, data, location) => {
  req.session.location = location;
  req.session.data = data;
  res.redirect('/');
};
