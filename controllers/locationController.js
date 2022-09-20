const mongoose = require("mongoose")
const Location = mongoose.model("Location")




exports.getAll = (req, res) => {
    Location.find({}, (err, location) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.json(location)
        }
    })
}



exports.createNew = (req, res) => {  
    console.log(req.body);   //Create
    const new_location = new Location(req.body)
    new_location.save((err, location) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(201).json(location)
        }
    })
}
exports.getById = function (req, res) {    //Read
    
}
exports.editById = function (req, res) {     //Update

}
exports.deleteById = function (req, res) {   //Delete

}