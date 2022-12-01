const { faker } = require('@faker-js/faker');
const express = require("express");
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

require ('dotenv').config();
const SECRET = process.env.SECRET
var expressLayouts = require('express-ejs-layouts');
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
          ["'self'", "https://unpkg.com/vue@3.2.40/dist/vue.global.js","https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js","https://unpkg.com/vue@3/dist/vue.esm-browser.js","https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js","https://unpkg.com/vue@3/dist/vue.global.js"] 
         }  }  })

app.use(express.static('public'));
app.use(express.static('files'))
app.use(express.json());
app.set("layout extractScripts", true)
app.use(cookieParser());
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/ticketsApiDb")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use(expressLayouts);

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

(async () => {
  let data = {
    email: 'admin@admin.admin',
    password: 'admin',
    role: 'admin',
  };
  let saltRounds = 10;
  let hashedPassword = await bcrypt.hash(data.password, saltRounds);

  data.password = hashedPassword;
  console.log(data.password);

  const seedDatabase = async () => {
    try {
      await User.deleteMany({});
      await User.insertMany(data);
      console.log('Seeding successful');
    } catch (error) {
      console.log(error);
    }
  };

  seedDatabase().then(() => {
  //  mongoose.connection.close();
  });
})();



function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDBtickets() {
    // Connection URL
    const uri = "mongodb://localhost:27017/ticketsApiDb";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const collection = client.db("ticketsApiDb").collection("tickets");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        collection.drop();

        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 10; i++) {
            const name = faker.name.firstName();
            const cast = faker.name.lastName();
            const price = faker.finance.amount(5,20,0);
            const image = faker.image.abstract(1234, 2345)
            let ticket = {

                    cast: name, cast,
                    name,
                    price,
                    image

            };


            timeSeriesData.push(ticket);
        }
        collection.insertMany(timeSeriesData);


    } catch (err) {
        console.log(err.stack);
    }
}

seedDBtickets();


async function seedDBactors() {
  // Connection URL
  const uri = "mongodb://localhost:27017/ticketsApiDb";

  const client = new MongoClient(uri, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
  });

  try {
      await client.connect();


      const collection = client.db("ticketsApiDb").collection("actors");

      // The drop() command destroys all data from a collection.
      // Make sure you run it against proper database and collection.
      collection.drop();

      // make a bunch of time series data
      let timeSeriesData = [];

      for (let i = 0; i < 10; i++) {
          const name = faker.name.firstName();
          const age = faker.datatype.number(70) 
          const gender = faker.name.sex()
          const image = faker.image.abstract(1234, 2345)
          let actor = {

                  name,
                  age,
                  gender,
                  image

          };


          timeSeriesData.push(actor);
      }
      collection.insertMany(timeSeriesData);



  } catch (err) {
      console.log(err.stack);
  }
}

seedDBactors();


async function seedDBlocations() {
  // Connection URL
  const uri = "mongodb://localhost:27017/ticketsApiDb";

  const client = new MongoClient(uri, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
  });

  try {
      await client.connect();


      const collection = client.db("ticketsApiDb").collection("locations");

      // The drop() command destroys all data from a collection.
      // Make sure you run it against proper database and collection.
      collection.drop();

      // make a bunch of time series data
      let timeSeriesData = [];

      for (let i = 0; i < 10; i++) {
          const country = faker.address.country()
          const city = faker.address.cityName(); 
          const street = faker.address.street()
          const image = faker.image.abstract(1234, 2345)
          let location = {

            country,
                  city,
                  street,
                  image

          };


          timeSeriesData.push(location);
      }
      collection.insertMany(timeSeriesData);



  } catch (err) {
      console.log(err.stack);
  }
}

seedDBlocations();



app.post('/tickets/delete/:id', async (req, res) => {
    await Ticket.deleteOne({_id: req.params.id})
    return res.redirect('/admin')
  });
  
  app.post('/actors/delete/:id', async (req, res) => {
    await Actor.deleteOne({_id: req.params.id})
    return res.redirect('/admin')
  });
  
  app.post('/locations/delete/:id', async (req, res) => {
    await Location.deleteOne({_id: req.params.id})
    return res.redirect('/admin')
  });
  

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost${port}`);
})

