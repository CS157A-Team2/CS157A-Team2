const express = require('express');
const router = express.Router();
const path = require('path')
const firebase = require('../firebaseConfig');

router.get('/signup', function (req, res) {
  res.render('pages/signup.ejs')
});

router.get('/login', function (req, res) {
  res.render('pages/login.ejs')
});

router.post('/signup/submit', function (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;

  if (password === confirm_password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then (function (response) {
      //TODO: handle after sign up
      console.log(response)
      res.redirect('/')
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }
});

router.post('/login/submit', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then (function(response) {
    //TODO: handle after sign up
    console.log(response)
    res.redirect('/')
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
});

module.exports = router
