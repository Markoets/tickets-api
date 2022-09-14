const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TicketSchema = new Schema({
    name:{
        type:String,
        required: "Ticket name is mandatory"
    },
    
    cast:{
        type:String,
        required: "Name of the cast is mandatory"
    },
    price:{
        type:Number,
        required: "Price is mandatory"
    }
})

module.exports = mongoose.model("Ticket",TicketSchema)