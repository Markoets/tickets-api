const mainController = require("../controllers/mainController")
const { requireAuth, checkUser } = require('../middleware/auth.Middleware');
const express = require("express");
const router = express.Router();
 module.exports = function (app) {
    console.log("siin peaks lehele");
    app.route("/")
    .get(mainController.mainPage)

    app.route("/location")
    .get(mainController.locationsPage)

    app.route("/actor")
    .get(mainController.actorsPage)

   /* app.route("/ticketsadd")
    .get(mainController.addTickets)*/


   app.route("/logout")
   .get(mainController.logout_get)


   app.get('/ticketsAdd', requireAuth, (req, res) => res.render('ticketsAdd'));

   app.get('/actorsAdd', requireAuth, (req, res) => res.render('actorsAdd'));

   app.get('/locationsAdd', requireAuth, (req, res) => res.render('locationsAdd'));
   
   app.get('/admin', requireAuth, (req, res) => res.render('admin'));

 }