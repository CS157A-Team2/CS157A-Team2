const express = require('express');
const router = express.Router();
const path = require('path')
global.fetch = require('node-fetch');

router.get('/signup', function (req, res) {
  res.render('pages/signup.ejs')
});

router.get('/login', function (req, res) {
  res.render('pages/login.ejs')
});

router.post('/signup/submit', function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;

  if (password === confirm_password) {
  }
});

router.post('/login/submit', function (req, res) {
  res.render('pages/login.ejs')
});

module.exports = router
