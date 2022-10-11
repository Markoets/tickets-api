const loginController = require("../controllers/signupController")


 module.exports = function (app) {
    app.route("/signup")
    .post(loginController.signupInfo)
    .get(loginController.signupPage)


 }


