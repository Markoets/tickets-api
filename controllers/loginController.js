const express = require("express");
const app = require('express')()
const jwt = require('jsonwebtoken');
const passport = require("passport");
require ('dotenv').config();
const SECRET = process.env.SECRET
const mongoose = require("mongoose")

const bcrypt = require('bcrypt');

const router = express.Router();
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/ticketsApiDb")
const User = require("../models/userModel");


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
  return jwt.sign({ id }, SECRET, {
    expiresIn: maxAge
  });
};
exports.loginInfo = async (req, res, next) => {
 
  const { email, password,role } = req.body;

  try {
    const user = await User.login(email, password,role);
    console.log(user);
    const token = createToken(user._id);
 
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
   res.redirect("admin")
  } 
  catch (err) {
    const errors = handleErrors(err);
   res.render("login",{title:"incorrect password or email"})
  }


}

exports.loginPage=(req, res) => {
  res.render('login',{title:"Login"});
}