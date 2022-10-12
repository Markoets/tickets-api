const app = require('express')()


const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml')
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser")
const bcrypt = require('bcrypt');
// Importing modules
const express = require("express");
require ('dotenv').config();
const SECRET = process.env.SECRET
const User = mongoose.model("User")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/ticketsApiDb")



app.use(express.static('public'));
app.use(express.static('files'))
const path = require('path')

exports.mainPage = async (req, res, next) => {
  
    res.sendFile('index.html', { root: '.' })
}


