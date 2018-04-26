'use strict';

module.exports = (req, res) => handlerIndex(req, res);

const handlerIndex = (req, res) => {
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
    res.render('index.ejs',{
      userLogged: req.isAuthenticated(),
      user: req.user,
      inputdata: req.session.location,
      data: req.session.data,
      place: req.session.places
    });
  }
}
