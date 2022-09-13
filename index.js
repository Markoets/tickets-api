const app = require('express')()
const port = 8080
const swaggerUi = require ('swagger-ui-express')
const swaggerDocument = require ('./docs/swagger.json');

const tickets = [
    {id: 1, name: "Top Gun", cast: "Tom Cruise, Jennifer Connelly, Jon Hamm", price: 15.99},
    {id: 2, name: "The Invitation", cast: "Nathalie Emmanuel, Thomas Doherty", price: 13.99},
    {id: 3, name: "Avatar", cast: "Sam Worthington, Zoe Saldana, Sigourney Weaver", price: 10.99},
    {id: 4, name: "André Rieu in Dublin", cast: "André Rieu", price: 25.99},
    {id: 5, name: "Cinema Classics: Goodfellas", cast: "Robert De Niro, Joe Pesci, Ray Liota", price: 15.99},
    {id: 6, name: "Beast", cast: "Idris Elba, Sharlto Copley", price: 19.99},
    {id: 7, name: "Bullet Train", cast: "Brad Pitt, Aaron Taylor-Johnson, Sandra Bullock, Hiroyuki Sanada", price: 11.99},
    {id: 8, name: "About Fate", cast: "Emma Roberts, Thomas Mann", price: 18.99},
    {id: 9, name: "After Ever Happy", cast: "Hero Fiennes Tiffin, Josephine Langford, Louise Lombard", price: 16.99},
    {id: 10, name: "Nope", cast: "Barbie Ferreira, Keke Palmer, Michael Wincott", price: 12.99},
]

app.get('/tickets',(req,res)=>{
    res.send(tickets)
})
app.get('/tickets/:id',(req,res)=>{
    res.send(tickets[req.params.id])
})

app.get('/locations',(req,res)=>{
    res.send(["Tallinn","Tartu"])
})


app.get('/performers',(req,res)=>{
    res.send(["Luciano Pavarotti","Hortus Musicus"])
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port,()=>{
    console.log(`API up at: http://localhost${port}`);
})