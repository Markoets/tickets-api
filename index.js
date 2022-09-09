const app = require('express')()
const port = 8080
const swaggerUi = require ('swagger-ui-express')
const swaggerDocument = require ('./docs/swagger.json');

app.get('/tickets',(req,res)=>{
    res.send(["Concerts","Opera"])
})

app.get('/locations',(req,res)=>{
    res.send(["Tallinn","Tartu"])
})



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port,()=>{
    console.log(`API up at: http://localhost${port}`);
})