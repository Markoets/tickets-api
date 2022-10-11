const express = require("express");
const app = require('express')()

require ('dotenv').config();
const SECRET = process.env.SECRET
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const router = express.Router();
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/ticketsApiDb")
const User = mongoose.model("User")



exports.loginInfo = async (req, res, next) => {
   
    let { email, password } = req.body;
    
    let existingUser;
    
    try {
      existingUser = await User.findOne({ email: email });
    } catch {
       return res.status(400).json((err))
    }
    
  
    if (!existingUser || !(await bcrypt.compare(req.body.password,existingUser.password))) {
        const error = Error("Wrong details please check at once");
        return res.status(400).json(next(error))
      }
    
    let token;
    
    try {
      //Creating jwt token
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        SECRET,
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    console.log(token);
    //send somewhere after logged in
    res.sendFile('index.html', { root: '.' })

    };
  ;
  exports.loginPage=(req, res) => {
    res.sendFile('login.html', { root: '.' })
  }



