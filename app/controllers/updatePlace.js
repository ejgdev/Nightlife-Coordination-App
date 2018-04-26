'use strict';
const Place = require('../models/places');
const User = require('../models/users');

module.exports = (req, res) => updateDirectory(req, res);

const updateDirectory = (req, res) => {
  Place.findOne({ 'placeId': req.params.id }, function(err,data){
    if(err)
      console.log("ERROR");
    else {
      if(!data){
        let newPlace = new Place ();
        newPlace.placeId = req.params.id;
        newPlace.users = [req.user.id];
        newPlace.save(function (err) {
          if (err)
            throw err;
        });
        console.log("OPCION-1" + newPlace);
        res.redirect("/");
      }
      else {
        if(data.users.includes(req.user.id)){
          const temp = data.users.filter(user => user !== req.user.id);
          data.users = temp;
          data.save(function (err) {
            if (err)
              throw err;
          });
          console.log("OPCION-2" + data);
          res.redirect("/");
        }
        else {
          data.users.push(req.user.id);
          data.save(function (err) {
            if (err)
              throw err;
          });
          console.log("OPCION-3" + data);
          res.redirect("/");
        }
      }
    }
  });
}
