const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require ('dotenv').config();
const SECRET = process.env.SECRET

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, SECRET,async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        console.log(err.message);
        res.redirect('/login');
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        console.log(user.role);
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        console.log(token);
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        console.log(token);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};



module.exports = { requireAuth, checkUser };