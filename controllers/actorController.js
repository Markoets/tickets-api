const mongoose = require("mongoose")
const Actor = mongoose.model("Actor")




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
            res.status(400).send(err)
        } else {
            res.status(201).json(actor)
        }
    })
}
exports.getById = function (req, res) {    //Read
    
}
exports.editById = function (req, res) {     //Update

}
exports.deleteById = function (req, res) {   //Delete

}