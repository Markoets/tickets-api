const locationsList = require("../controllers/mockLocationController")

module.exports = function (app) {
    app.route("/locations")
        .get(locationsList.getAll)
        .post(locationsList.createNew)  //Create

    app.route("/locations/:id")
        .get(locationsList.getById)     //Read
        .put(locationsList.editById)    //Update
        .delete(locationsList.deleteById) //Delete

}