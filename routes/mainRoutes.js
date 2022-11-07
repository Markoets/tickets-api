const mainController = require("../controllers/mainController")
const { requireAuth, checkUser } = require('../middleware/auth.Middleware');
const express = require("express");
const router = express.Router();
 module.exports = function (app) {
 app.get('/ticket',checkUser, function(req, res) {
    res.render('ticket',{title:'Movies'});
  });

  app.get('/',checkUser, function(req, res) {

    res.render('index',{title:'Home'});
  });

  app.get('/location',checkUser, function(req, res) {
    res.render('location',{title:'Locations'});
  });

    app.get('/actor', checkUser,function(req, res) {
      res.render('actor',{title:'Actors'});
    });
   /* app.route("/ticketsadd")
    .get(mainController.addTickets)*/

  app.route("/logout")
    .get(mainController.logout_get)


  app.get('/ticketsAdd', requireAuth, (req, res) => res.render('ticketsAdd', { title: "Login" }));

  app.get('/actorsAdd', requireAuth, (req, res) => res.render('actorsAdd', { title: "Login" }));

  app.get('/locationsAdd', requireAuth, (req, res) => res.render('locationsAdd', { title: "Login" }));

  app.get('/admin', requireAuth, (req, res) => res.render('admin', { title: "Login" }));

  
 }

 
