const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ActorSchema = new Schema({
    name: {
        type: String,
        required: "Name of the actor is mandatory"
    },

    gender: {
        type: String,
        required: "Name of the City is mandatory"
    },
    age: {
        type: Number,
        required: "Age of the actor is mandatory"
    }
})

module.exports = mongoose.model("Actor", ActorSchema)