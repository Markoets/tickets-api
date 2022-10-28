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
  res.render('signup');
  }
  const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    if (err.message === 'incorrect email') {
      errors.email = 'Incorrect email or password';
    }
  
    if (err.message === 'incorrect password') {
      errors.password = 'Incorrect email or password';
    }
  
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
  
    if (err.message.includes('user validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
  
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }
  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, 'net ninja secret', {
      expiresIn: maxAge
    });
  };


  
  // Handling post request
  exports.signupInfo = async (req, res, next) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email});

  if(user){
    res.status(400).json('user exists already');
    console.log('kasutaja on juba vist');

  }
  
  else {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.redirect("login")
  }
  


}