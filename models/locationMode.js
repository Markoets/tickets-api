const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationSchema = new Schema({
    country: {
        type: String,
        required: "Country name is mandatory"
    },

    city: {
        type: String,
        required: "Name of the City is mandatory"
    },
    street: {
        type: String,
        required: "Street name is mandatory"
    }
})

module.exports = mongoose.model("Location", LocationSchema)