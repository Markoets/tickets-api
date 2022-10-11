const mainController = require('../index.js');
const router = express.Router();




 router.get('/signup',mainController.getSignup);


 module.exports = function (app) {
    app.route("signup")
 }
