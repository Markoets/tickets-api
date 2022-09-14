const ticketsList = require("../controllers/mockTicketController")

module.exports = function (app) {
    app.route("/tickets")
        .get(ticketsList.getAll)
        .post(ticketsList.createNew)  //Create

    app.route("/tickets/:id")
        .get(ticketsList.getById)     //Read
        .put(ticketsList.editById)    //Update
        .delete(ticketsList.deleteById) //Delete

}