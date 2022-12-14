const mongoose = require("mongoose")
const Location = mongoose.model("Location")
const  ClassTransformer = require  ('class-transformer')
const LocationDto = require('../models/locationDto')


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
            res.render("locationsAdd",{title:"Error please fill in all the fields!"})
        } else {
            ticket2=`${getBaseUrl(req)}/locations/${location.id}`
            console.log(ticket2+'aaa');
            id=`${location.id}`
            name=`${location.country}`
            field1=`${location.city}`
            field2=`${location.street}`
            field3=`${location.image}`
            console.log(`${getBaseUrl(req)}/locations/${location.id}`);
            res.redirect('admin')
        }
    })
}
exports.getById = async function (req, res) {    //Read
    
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    Location.findOne({_id:(req.params.id)},(err,location)=>{
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).json(new LocationDto(location))
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
    Location.updateOne({_id:req.params.id},{$set: req.body},null,(err,location)=>{
        
        if (err) {
            res.status(400).send(err)
        } else {
            console.log(location);
            res.status(200).json(location)
        }
    })
    }


exports.deleteById = function (req, res) {   //Delete
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    Location.findByIdAndDelete(req.params.id,(err,location)=>{
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