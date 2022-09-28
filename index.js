const { faker } = require('@faker-js/faker');
const app = require('express')()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml')
const mongoose = require("mongoose")
const Ticket = require ("./models/ticketModel")
const Actor = require ("./models/actorModel")
const Location = require ("./models/locationModel")
const bodyParser = require("body-parser")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/ticketsApiDb")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

require("./routes/ticketRoutes")(app)
require("./routes/locationRoutes")(app)
require("./routes/actorRoutes")(app)


/* mySeedScript.js */

// require the necessary libraries
const MongoClient = require("mongodb").MongoClient;

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

        for (let i = 0; i < 5000; i++) {
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

/*
const tickets = [
    { id: 1, name: "Top gun", cast: "Tom Cruise, Jennifer Connelly, Jon Hamm", price: 15.99 },
    { id: 2, name: "The Invitation", cast: "Nathalie Emmanuel, Thomas Doherty", price: 13.99 },
    { id: 3, name: "Avatar", cast: "Sam Worthington, Zoe Saldana, Sigourney Weaver", price: 10.99 },
    { id: 4, name: "André Rieu in Dublin", cast: "André Rieu", price: 25.99 },
    { id: 5, name: "Cinema Classics: Goodfellas", cast: "Robert De Niro, Joe Pesci, Ray Liota", price: 15.99 },
    { id: 6, name: "Beast", cast: "Idris Elba, Sharlto Copley", price: 19.99 },
    { id: 7, name: "Bullet Train", cast: "Brad Pitt, Aaron Taylor-Johnson, Sandra Bullock, Hiroyuki Sanada", price: 11.99 },
    { id: 8, name: "About Fate", cast: "Emma Roberts, Thomas Mann", price: 18.99 },
    { id: 9, name: "After Ever Happy", cast: "Hero Fiennes Tiffin, Josephine Langford, Louise Lombard", price: 16.99 },
    { id: 10, name: "Nope", cast: "Barbie Ferreira, Keke Palmer, Michael Wincott", price: 12.99 },
]

const locations = [
    { id: 1, country: "Estonia", city: "Tallinn", street: "Solaris" },
    { id: 2, country: "Estonia", city: "Pärnu", street: "Saku" },
    { id: 3, country: "Estonia", city: "Tartu", street: "Ringtee" },
    { id: 4, country: "Estonia", city: "Saaremaa", street: "Kudjape" },
    { id: 5, country: "Estonia", city: "Jõhvi", street: "Puru tee" },
    { id: 6, country: "Estonia", city: "Narva", street: "Tallinna mnt" },
    { id: 7, country: "Estonia", city: "Tallinn", street: "Hobujaam" },
    { id: 8, country: "Estonia", city: "Tallinn", street: "Mustamäe" },
    { id: 9, country: "Estonia", city: "Tallinn", street: "Ülemsite" },
    { id: 10, country: "Estonia", city: "Tallinn", street: "Endla" },
]

const actors = [
    { id: 1, name: "Tom Cruise", gender: "Male", age: 60 },
    { id: 2, name: "Emma Roberts", gender: "Female", age: 31 },
    { id: 3, name: "Brad pit", gender: "Male", age: 58 },
    { id: 4, name: "Thomas Doherty", gender: "Male", age: 27 },
    { id: 5, name: "Zoe Saldana", gender: "Female", age: 44 },
    { id: 6, name: "Thomas Mann", gender: "Male", age: 30 },
    { id: 7, name: "Jon Hamm", gender: "Male", age: 51 },
    { id: 8, name: "Robert De niro", gender: "Male", age: 79 },
    { id: 9, name: "Ray Liotta", gender: "Male", age: 67 },
    { id: 10, name: "Joe Pesci", gender: "Male", age: 79 },
]
app.get('/tickets', (req, res) => {
    res.send(tickets)
})
/*app.get('/tickets/:id',(req,res)=>{
    if(typeof tickets[req.params.id -1]==='undefined'){
        return res.status(404).send({error:"ticket not found"})
    }
    res.send(tickets[req.params.id -1])
})

app.get("/tickets/:id", (req, res) => {
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    let result = tickets.find(x => x.id === parseInt(req.params.id))
    if (typeof (result) === 'undefined') {
        res.status(404).send({ error: "Ticket not found." })
        return
    }
    res.send(result)
})



app.get('/locations', (req, res) => {
    res.send(locations)
})


app.get("/locations/:id", (req, res) => {
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    let result = locations.find(x => x.id === parseInt(req.params.id))
    if (typeof (result) === 'undefined') {
        res.status(404).send({ error: "Location not found." })
        return
    }
    res.send(result)
})


app.get('/actors', (req, res) => {
    res.send(actors)
})


app.get("/actors/:id", (req, res) => {
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    let result = actors.find(x => x.id === parseInt(req.params.id))
    if (typeof (result) === 'undefined') {
        res.status(404).send({ error: "Actor not found." })
        return
    }
    res.send(result)
})

*/
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost${port}`);
})