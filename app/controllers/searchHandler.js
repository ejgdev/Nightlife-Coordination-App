'use strict';

const Place = require('../models/places');

module.exports = (req, res) => handlerIndex(req, res);

const handlerIndex =  async (req, res) => {
  if(!req.session.data){
    res.render('index.ejs',{
      userLogged: req.isAuthenticated(),
      user: req.user,
      inputdata: null,
      data: null,
      place: null
    });
  }
  else{
    await findPlaces(req, res, req.session.data, req.body.location);
    res.render('index.ejs',{
      userLogged: req.isAuthenticated(),
      user: req.user,
      inputdata: req.session.location,
      data: req.session.data,
      place: req.session.places
    });
  }
}

const findPlaces = async (req, res, data, location) => {
 req.session.places = [];
 for (let value of data){
   await Place.findOne({ 'placeId': value.id }, function(err,info){
     if(err)
       console.log("ERROR");
     else {
       if (info) {
         let userGoing;
         if(req.user)
           userGoing = info.users.includes(req.user.id);
         else
           userGoing = false;

         req.session.places.push(userGoing);
       }
       else {
         req.session.places.push(false);
       }
     }
 });
 }
};
