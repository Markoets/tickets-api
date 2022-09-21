const actorsList = require("../controllers/actorController")

module.exports = function (app) {
    app.route("/actors")
        .get(actorsList.getAll)
        .post(actorsList.createNew)  //Create

    app.route("/actors/:id")
        .get(actorsList.getById)     //Read
        .put(actorsList.editById)    //Update
        .delete(actorsList.deleteById) //Delete

}