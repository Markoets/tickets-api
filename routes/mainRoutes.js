const mainController = require("../controllers/mainController")

 module.exports = function (app) {
    app.route("/")
    .get(mainController.mainPage)


 }

