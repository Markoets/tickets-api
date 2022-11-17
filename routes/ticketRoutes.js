const ticketsList = require("../controllers/ticketController")
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
module.exports = function (app) {
    app.route("/tickets")
        .get(ticketsList.getAll)
        .post(ticketsList.createNew)  //Create

    app.route("/tickets/:id")
        .get(ticketsList.getById)     //Read
     //   .put(ticketsList.editById)    //Update
        .delete(ticketsList.deleteById) //Delete

        
    app.route("/tickets/update/:id")
    .post(ticketsList.editById)
    

}