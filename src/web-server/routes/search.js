const express = require('express');
const router = express.Router();
const server = require('../server')

router.get('/', function(req,res){
    res.redirect('/')
})


router.get('/find', function(req,res){
    res.render('pages/search.ejs', {q: "", rows: ''})
})

router.post('/find', function (req, res) {
    const q = req.body.q
    const sql =  "SELECT Content.content_id, Content.title, Content.content_type FROM Content LEFT JOIN Book on Book.content_id=Content.content_id LEFT JOIN Poem ON Poem.content_id=Content.content_id LEFT JOIN Article on Article.content_id=Content.content_id LEFT JOIN Newspaper ON Newspaper.content_id=Content.content_id LEFT JOIN Magazine on Magazine.content_id=Content.content_id WHERE  CONCAT(content_type, IFNULL(title, ''), IFNULL( Book.author, ''), IFNULL( Book.ISBN, ''), IFNULL( Poem.poem_type, ''), IFNULL( Book.genre, ''), IFNULL(Article.author, ''), IFNULL(Poem.author, ''), IFNULL(Article.publication_name, '')) LIKE '%" + q + "%';"
    rows = ''
    server.database.query(sql, function(err, results){
        if( results != undefined && 0 != results.length)
        {
			for(i = 0; i < results.length; i++)
			{
		    	rows += "<tr><td><a href=/"+  results[i].content_type+"s/" + results[i].content_type + "-profile/" +
		    	results[i].content_id +
		    	">" +
		    	results[i].title +
		    	"</a></td><td>" +
		    	results[i].content_type 	+
		    	"</tr>\n ";
		    }
        }
        res.render('pages/search.ejs', {q: q, rows: rows})
    } )
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
