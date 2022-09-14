const mongoose = require("mongoose")
const Ticket = mongoose.model("Ticket")



exports.getAll = (req, res) => {
    Ticket.find({}, (err, ticket) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.json(ticket)
        }
    })
}



exports.createNew = (req, res) => {  
    console.log(req.body);   //Create
    const new_ticket = new Ticket(req.body)
    new_ticket.save((err, ticket) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(201).json(ticket)
        }
    })
}
exports.getById = function (req, res) {    //Read

}
exports.editById = function (req, res) {     //Update

}
exports.deleteById = function (req, res) {   //Delete

}