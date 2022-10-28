const { faker } = require('@faker-js/faker');
const app = require('express')()
const port = 8088
const passport = require('passport');
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml')
const mongoose = require("mongoose")
const Ticket = require ("./models/ticketModel")
const Actor = require ("./models/actorModel")
const Location = require ("./models/locationModel")
const bodyParser = require("body-parser")
// Importing modules
const express = require("express");
require ('dotenv').config();
const SECRET = process.env.SECRET

const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const bcrypt = require('bcrypt');
const router = express.Router();
app.set('view engine','ejs');
const helmet = require("helmet");
const { requireAuth, checkUser } = require('./middleware/auth.Middleware');
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(session({
    secret: 'SALADUS', 
    resave: false, 
    saveUninitialized: false
  }))
app.use(passport.initialize());
app.use(passport.session());

// After you declare "app"

helmet({   contentSecurityPolicy: {  
    useDefaults: true,
     directives: {
          'script-src': 
          ["'self'", "https://unpkg.com/vue@3.2.40/dist/vue.global.js","https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js","https://unpkg.com/vue@3/dist/vue.esm-browser.js"] 
         }  }  })

app.use(express.static('public'));
app.use(express.static('files'))
app.use(express.json());
app.use(cookieParser());
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/ticketsApiDb")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  require("./routes/signupRoutes")(app)
  require("./routes/loginRoutes")(app)
require("./routes/ticketRoutes")(app)
require("./routes/locationRoutes")(app)
require("./routes/actorRoutes")(app)
require("./routes/mainRoutes")(app)


/* mySeedScript.js */

// require the necessary libraries
const MongoClient = require("mongodb").MongoClient;
const { Router } = require('express');
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/img'));
app.use(express.static('public'));
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
    // Connection URL
    const uri = "mongodb://localhost:27017/ticketsApiDb";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("ticketsApiDb").collection("tickets");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        collection.drop();

        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 500; i++) {
            const name = faker.name.firstName();
            const cast = faker.name.lastName();
            const price = faker.finance.amount(5,20,0);
            let ticket = {
              
                    cast: name, cast,
                    name,
                    price,
           
            };

            
            timeSeriesData.push(ticket);
        }
        collection.insertMany(timeSeriesData);

        console.log("Database seeded! :)");
        
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();


app.post('/tickets/delete/:id', async (req, res) => {
    await Ticket.deleteOne({_id: req.params.id})
    return res.redirect('/')
  });

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost${port}`);
})