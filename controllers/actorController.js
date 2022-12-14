const mongoose = require("mongoose")
const Actor = mongoose.model("Actor")
const  ClassTransformer = require  ('class-transformer')
const ActorDto = require('../models/actorDto')


exports.getAll = (req, res) => {
    Actor.find({}, (err, actor) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.json(actor)
        }
    })
}



exports.createNew = (req, res) => {  
    console.log(req.body);   //Create
    const new_actor = new Actor(req.body)
    new_actor.save((err, actor) => {
        if (err) {
            res.render("actorsAdd",{title:"Error please fill in all the fields!"})
        } else {
            id=`${actor.id}`
            name=`${actor.name}`
            field1=`${actor.gender}`
            field2=`${actor.age}`
            field3=`${actor.image}`
            console.log(`${getBaseUrl(req)}/actors/${actor.id}`);
            res.redirect('admin')
        }
    })
}
exports.getById = async function (req, res) {    //Read
    
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    Actor.findOne({_id:(req.params.id)},(err,actor)=>{
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).json(new ActorDto(actor))
        }
    })      
    return
}
exports.editById = function (req, res) {     //Update
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
   console.log(req.body,'selgitus');
   Actor.updateOne({_id:req.params.id},{$set: req.body},null,(err,actor)=>{
        
        if (err) {
            res.status(400).send(err)
        } else {
            console.log(actor,req.body);
            res.status(200).json(actor)
        }
    })
    }


exports.deleteById = function (req, res) {   //Delete
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    Actor.deleteOne({_id:(req.params.id)},(err,actor)=>{
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