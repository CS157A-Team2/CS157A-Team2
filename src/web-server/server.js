//----------------Includes--------------------
const connect = require("connect");
const http = require("http");
const fs = require("fs");
const express = require("express");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");

//--------------routes-------------------------
const auth = require("./routes/auth");
firebase = auth.firebase;
const books = require("./routes/books")
const poems = require("./routes/poems")
const magazines = require("./routes/magazines")
const newspapers = require("./routes/newspapers")
const articles = require("./routes/articles")
const search = require("./routes/search")
const content_profile = require("./routes/content-profile")
const content = require("./routes/content")

currentUser = {
	username: null,
	email: null,
	user_type: null,
	currentContent: {
	author: null,
	content_type: null,
	title: null,
	isFavorite: null,
	publisher: null,
	reviews: null,
	genre: null,
	publication_name: null,
	publication_date: null,
	issueNum: null,
	poem_type: null,
	locale: null,
	ISBN: null,
	content_id: null
	}
}

const database = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "bookstore",
	multipleStatements: true
});

database.connect(err => {
	if (err) {
		console.log("connection error");
		throw err;
	} else {
		console.log("connection successful");
	}
});

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
rows = "";

app.get("/", function (req, res) {	
	if(firebase.auth().currentUser == null)
		res.render("pages/index");
	else
	{
	sql = 'SELECT username, user_type, user_id FROM Users WHERE user_id = ' + "'" + firebase.auth().currentUser.uid  +  "'"
	database.query(sql, function(err, results){
		if(results.length == 0)
		{
			res.render("pages/login", {error: "The email address was not found"})
		}
		else
		{
			currentUser.username = results[0].username
			currentUser.user_id = results[0].user_id
			currentUser.user_type = results[0].user_type
			res.render("pages/index");
		}
	})
	}	
});

app.get("/about", function (req, res) {
	res.render("pages/about");
});

app.get('/del-favorite', function(req, res){
	sql = 'DELETE FROM Favorites WHERE user_id ="'+ currentUser.user_id + '" AND content_id =' + currentUser.currentContent.content_id
	database.query(sql, function(err, results)
	{
		currentUser.currentContent.isFavorite = false
		res.redirect('/content-profile/')
	})
})


app.get('/add-favorite', function(req, res){
	sql = 'INSERT INTO Favorites (user_id, content_id) VALUES ("'+ currentUser.user_id + '", "' + currentUser.currentContent.content_id + '")'
	database.query(sql, function(err, results)
	{
		currentUser.currentContent.isFavorite = true
		res.redirect('/content-profile/')
	})
})

getRows = function () {
	return rows;
};


userReviewed = function(){
	sql = "SELECT * FROM Reviews WHERE user_id = '" + currentUser.user_id + "' AND content_id = " +  currentUser.currentContent.content_id
	database.query(sql, function (err, results) {
		if(results.length == 0)
			console.log("has not revied")
		else
			console.log("has reviewed")
	})

	return false;
};



app.use("/magazines", magazines)
app.get("/magazines", function (req, res) {
	res.redirect("/magazines")
});

app.use("/books", books);

app.get("/books", function(req, res) {
	res.redirect("/books")
})

app.use("/newspapers", newspapers);
app.get("/newspapers", function(req, res) {
	res.redirect("/newspapers")
})

app.use("/poems", poems);
app.get("/poems", function(req, res) {
	res.redirect("/poems")
})

app.use("/articles", articles);
app.get("/articles", function(req, res) {
	res.redirect("/articles")
})


app.get("/profile", function (req, res) {
	if(currentUser.username == null)
	{
		res.redirect("/")
	}
	else
	{
	rows = ''
		sql= "SELECT title, content_type, content_id FROM Content WHERE content_id IN  (SELECT content_id From Favorites WHERE user_id='" + currentUser.user_id + "');"
		database.query(sql, function (err, results) {
			if(results != undefined)
			{
				for(i = 0; i < results.length; i++)
				{
				rows += "<tr><td><a href="+  results[i].content_type+"s/" + results[i].content_type + "-profile/" +
				results[i].content_id +
				">" +
				results[i].title +
				"</a></td><td>" +
				results[i].content_type 	+
				"</tr>\n ";
				}
		}
		else{
			rows = "<tr> <td> No Favorites! Start Reading :) </tr>"
		}
		res.render("pages/profile");
		})
	}
});

app.get("/users", function (req, res) {
	let sql = "SELECT c.content_id, * FROM Users";
	let query = database.query(sql, (err, results) => {
		table = "";
		for (i = 0; i < results.length; i++)
			table +=
				results[i].user_id +
				" " +
				results[i].username +
				" " +
				results[i].user_type +
				"<br>";
		res.send("<h1> users <hr>" + table + "</h1>");
	});
});

//------------body-parser-----------------------
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//---------------other routes-----------------------
app.use("/search", search);
app.use("/content-profile", content_profile);
app.use("/content", content);

//------------auth-------------------------------
app.use("/auth", auth);
app.get("/auth/signup", function (req, res) {
	res.redirect("/auth/signup");
});

app.get("/auth/logout", function (req, res) {
	res.redirect("/auth/logout");
});

app.get("/auth/login", function (req, res) {
	res.redirect("/auth/login");
});

app.listen("8080", () => {
	console.log("server started on port 8080");
});

app.get("/download", (req, res)=> {
	if(currentUser.currentContent == null)
		return
	const file = `${__dirname}/public/files/${currentUser.currentContent.content_id}.txt`
	res.download(file)
	if(currentUser.user_id != null)
	{
		sql = `INSERT INTO Downloads (user_id, content_id) VALUES ('${currentUser.user_id}', ${currentUser.currentContent.content_id})`
		database.query(sql, function(err, results){
			console.log(err)
		})
	}
})


module.exports.database = database
module.exports.currentUser = currentUser
module.exports.currentUser = this.currentUser