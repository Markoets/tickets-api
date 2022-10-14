const mainController = require("../controllers/mainController")

 module.exports = function (app) {
    console.log("siin peaks lehele");
    app.route("/")
    .get(mainController.mainPage)

    app.route("/location")
    .get(mainController.locationsPage)

    app.route("/actor")
    .get(mainController.actorsPage)
 }

 