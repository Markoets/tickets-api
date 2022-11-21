const mainController = require("../controllers/mainController")
const { requireAuth, checkUser,checkAdmin } = require('../middleware/auth.Middleware');
const express = require("express");
const { createNew} = require('../controllers/ticketController');
const router = express.Router();
const { user,role} = require('../controllers/loginController');
 module.exports = function (app) {
 app.get('/ticket',checkUser, function(req, res) {
    res.render('ticket',{title:'Movies'});
  });

  app.get('/',checkUser, function(req, res) {
    console.log(user);
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


  app.get('/ticketsAdd', requireAuth, (req, res) => res.render('ticketsAdd', { title: "Add tickets" }));

  app.get('/actorsAdd', requireAuth, (req, res) => res.render('actorsAdd', { title: "Add actors" }));

  app.get('/locationsAdd', requireAuth, (req, res) => res.render('locationsAdd', { title: "Add locations" }));
  
  app.get('/admin', requireAuth, (req, res) =>
   res.render('admin', { title:ticket2 }));


    // (role=='admin')?app.get('/ticketsDelete',  (req, res) => res.render('ticketsDelete', { title: "Add locations" }))
    // :app.get('/',  (req, res) => res.render('index', { title: "Add locations" }))
  

    app.get('/ticketsDelete', requireAuth, (req, res) => res.render('ticketsDelete', { title: "Delete tickets" }));

    app.get('/actorsDelete', requireAuth, (req, res) => res.render('actorsDelete', { title: "Delete actors" }));

    app.get('/locationsDelete', requireAuth, (req, res) => res.render('locationsDelete', { title: "Delete locations" }));

   
  ticket2='Admin'
  
  var User = require('../models/userModel'); //the connection to users database
   app.get('/users',requireAuth,function (req, res) {
     User.find({}).exec(function (err, users) {
       if (err) throw err;
       res.render('users.ejs', { "users": users, title: 'tere' });
     }

    )}

)}
