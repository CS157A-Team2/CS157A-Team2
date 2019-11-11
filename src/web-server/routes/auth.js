const express = require('express');
const router = express.Router();
const firebase = require('../firebaseConfig');
const server = require('../server')

router.get('/signup', function (req, res) {
  res.render('pages/signup.ejs')
  //console.log('singup');
});

router.get('/login', function (req, res) {
  res.render('pages/login.ejs')
});

router.post('/signup/submit', function (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;

  if(username.length > 20)
  {
    res.render("pages/signup", {error: "Username can be at most 20 units."})
  }
  else if (password === confirm_password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(user){
      sql = "INSERT INTO Users (user_id, username) VALUES (" +"'" +firebase.auth().currentUser.uid + "'"+ ", " + "'" + username + "'" + ")"
      server.database.query(sql, function(err, results)
      {
         console.log(results)
         console.log(err)
      })
      res.redirect("/")
      })
      .catch(function(error)
      {
        console.log(error.message)
        res.render("pages/signup", {error: error.message})
      })
  }
  else{
    res.render("pages/signup", {error: "Passwords do not match."})
  }
});

router.post('/login/submit', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then (function(response) {
    res.redirect('/')
  })
  .catch(function(error) {
    var errorMessage = error.message;
    res.render("pages/login", {error: error});
  });
});

router.get('/logout', function (req, res) {  
  currentUser.username = null
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log('success')
  }, function(error) {
    // An error happened.
    console.log('faileu')
  }); 
  res.render('pages/index', {message: 'Log Out Successful'})
});


module.exports = router
module.exports.firebase = firebase
