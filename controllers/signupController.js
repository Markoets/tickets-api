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

exports.signupPage=(req, res) => {
    res.sendFile('signup.html', { root: '.' })
  }

  // Handling post request
  exports.signupInfo = async (req, res, next) => {
    const { name, email, password } = req.body;
    const newUser = User({
      name,
      email,
      password,
    });
  
    try {
      await newUser.save();
    } catch (err){
      res.status(401).json(next(err))
     
    }
    let token;
  
    try {
      token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        SECRET,
        { expiresIn: "1h" }
      );
    } catch (err) {   
        console.log(SECRET);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    res.status(201).json({
      success: true,
      data: { userId: newUser.id, email: newUser.email, token: token },
    });
  };
  