const signupController = require("../controllers/signupController")
const userModel = require("../models/userModel")

 module.exports = function (app) {
    app.route("/signup")
    .post(signupController.signupInfo)
    .get(signupController.signupPage)

    app.route("/users/update/:id")
    .post(signupController.updateUser)
    
 }


