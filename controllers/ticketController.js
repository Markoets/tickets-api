const mongoose = require("mongoose")
const Ticket = mongoose.model("Ticket")
const  ClassTransformer = require  ('class-transformer')
const TicketDto = require('../models/ticketDto')


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
            res.render("ticketsAdd",{title:"Error please fill in all the fields!"})
        } else {
            ticket2=`${getBaseUrl(req)}/tickets/${ticket.id}`
            console.log(ticket2+'aaa');
            id=`${ticket.id}`
            name=`${ticket.name}`
            field1=`${ticket.cast}`
            field2=`${ticket.price}`
            field3=`${ticket.image}`
            console.log(`Added a new ticket  at:  ${getBaseUrl(req)}/tickets/${ticket.id}`);
            res.redirect('admin')
        }
    })
}

exports.getById = async function (req, res) {    //Read
    
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    Ticket.findOne({_id:(req.params.id)},(err,ticket)=>{
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).json(new TicketDto(ticket))
        }
    })      
    return
}
exports.editById = function (req, res) {     //Update
    const { name, cast,price } = req.body;
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
   console.log(req.body,'selgitus');
    Ticket.updateOne({_id:req.params.id},{$set: req.body},null,(err,ticket)=>{
        
        if (err) {
            res.status(400).send(err)
        } else {
            console.log(ticket);
            res.redirect('/admin')
        }
    })
    }


exports.deleteById = function (req, res) {   //Delete
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    Ticket.deleteOne({_id:(req.params.id)},(err,ticket)=>{
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).json()
        }
    })  

}



function getBaseUrl(req){
    return req.connection && req.connection.encrypted
    ? 'https' : 'http' + `://${req.headers.host}`
}