const locationsList = require("../controllers/locationController")

module.exports = function (app) {
    app.route("/locations")
        .get(locationsList.getAll)
        .post(locationsList.createNew)  //Create

    app.route("/locations/:id")
        .get(locationsList.getById)     //Read
       // .put(locationsList.editById)    //Update
        .delete(locationsList.deleteById) //Delete

        app.route("/locations/update/:id")
        .post(locationsList.editById)

}