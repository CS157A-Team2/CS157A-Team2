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

currentUser = {
	username: null,
	email: null,
	user_type: null,
	currentContent: {
	author: null,
	title: null,
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
		console.log(results[0].username)
		console.log(firebase.auth().currentUser.uid)
		currentUser.username = results[0].username
		currentUser.user_id = results[0].user_id
		currentUser.user_type = results[0].user_type
		res.render("pages/index");
	})
	}	
});

app.get("/about", function (req, res) {
	res.render("pages/about");
});

app.get("/content", function (req, res) {
	res.render("pages/content");
});

getRows = function () {
	return rows;
};

app.get("/newspaper-profile/*", function (req, res) {
	newspaperNum = req.url.replace(/[^0-9]/g, "");
	let sql =
		"SELECT c.content_id, c.title, n.locale, c.publish_date FROM Newspaper n INNER JOIN Content c on c.content_id = n.content_id where c.content_id = " +
		newspaperNum;
	database.query(sql, function (err, results) {
		currentUser.currentContent.content_id = results[0].content_id;
		currentUser.currentContent.title = results[0].title;
		currentUser.currentContent.publish_date = results[0].publish_date;
		currentUser.currentContent.locale = results[0].locale;
		res.render("pages/newspaper-profile");
	});
});


app.get("/poem-profile/*", function (req, res) {
	poemNum = req.url.replace(/[^0-9]/g, "");
	let sql =
		"SELECT c.content_id, c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c on c.content_id = p.content_id where c.content_id = " +
		poemNum;
	database.query(sql, function (err, results) {
		currentUser.currentContent.content_id = results[0].content_id;
		currentUser.currentContent.title = results[0].title;
		currentUser.currentContent.author = results[0].author;
		currentUser.currentContent.poem_type = results[0].poem_type;
		res.render("pages/poem-profile");
	});
});

app.get("/article-profile/*", function (req, res) {
	bookNum = req.url.replace(/[^0-9]/g, "");
	let sql =
		"SELECT c.content_id, c.title, a.author, a.publication_name FROM Article a INNER JOIN Content c on c.content_id = a.content_id where c.content_id = " +
		bookNum;
	database.query(sql, function (err, results) {
		currentUser.currentContent.content_id = results[0].content_id;
		currentUser.currentContent.title = results[0].title;
		currentUser.currentContent.author = results[0].author;
		currentUser.currentContent.genre = results[0].publication_name;
		res.render("pages/book-profile");
	});
});


app.get("/book-profile/*", function (req, res) {
	bookNum = req.url.replace(/[^0-9]/g, "");
	let sql =
		"SELECT c.content_id, c.title, b.author, b.genre, b.publisher FROM Book b INNER JOIN Content c on c.content_id = b.content_id where c.content_id = " +
		bookNum;
	database.query(sql, function (err, results) {
		currentUser.currentContent.content_id = results[0].content_id;
		currentUser.currentContent.title = results[0].title;
		currentUser.currentContent.author = results[0].author;
		currentUser.currentContent.genre = results[0].genre;
		currentUser.currentContent.publisher = results[0].publisher;
		res.render("pages/book-profile");
	});
});

app.get("/magazines", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, c.publish_date, m.issueNum FROM Magazine m INNER JOIN Content c on c.content_id = m.content_id";
	processMagazines(req, res, sql);
});

app.get("/articles/title", function (req, res) {
	let sql =
		" SELECT a.publication_name, a.author, c.title, c.publish_date, c.content_id FROM Article a INNER JOIN Content c on c.content_id = a.content_id ORDER BY c.title";
	processArticles(req, res, sql);
});

app.get("/articles/author", function (req, res) {
	let sql =
		" SELECT a.publication_name, a.author, c.title, c.publish_date, c.content_id FROM Article a INNER JOIN Content c on c.content_id = a.content_id ORDER BY a.author";
	processArticles(req, res, sql);
});

app.get("/articles/date", function (req, res) {
	let sql =
		" SELECT a.publication_name, a.author, c.title, c.publish_date, c.content_id FROM Article a INNER JOIN Content c on c.content_id = a.content_id ORDER BY c.publish_date";
	processArticles(req, res, sql);
});

app.get("/articles/publication", function (req, res) {
	let sql =
		" SELECT a.publication_name, a.author, c.title, c.publish_date, c.content_id FROM Article a INNER JOIN Content c on c.content_id = a.content_id ORDER BY a.publication_name";
	processArticles(req, res, sql);
});

app.get("/articles", function (req, res) {
	let sql =
		" SELECT a.publication_name, a.author, c.title, c.publish_date, c.content_id FROM Article a INNER JOIN Content c on c.content_id = a.content_id";
	processArticles(req, res, sql);
});

app.get("/newspapers", function (req, res) {
	let sql =
		"SELECT c.content_id, c.publish_date, c.title, n.locale FROM Newspaper n INNER JOIN Content c on c.content_id = n.content_id";
	processNewspaper(req, res, sql);
});

app.get("/newspapers/date", function (req, res) {
	let sql =
		"SELECT c.content_id, c.publish_date, c.title, n.locale FROM Newspaper n INNER JOIN Content c on c.content_id = n.content_id ORDER BY publish_date";
	processNewspaper(req, res, sql);
});

app.get("/newspapers/location", function (req, res) {
	let sql =
		"SELECT c.content_id, c.publish_date, c.title, n.locale FROM Newspaper n INNER JOIN Content c on c.content_id = n.content_id ORDER BY locale";
	processNewspaper(req, res, sql);
});

app.get("/newspapers/publication", function (req, res) {
	let sql =
		"SELECT c.content_id, c.publish_date, c.title, n.locale FROM Newspaper n INNER JOIN Content c on c.content_id = n.content_id ORDER BY title";
	processNewspaper(req, res, sql);
});

app.get("/books", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, b.author, b.genre, b.publisher FROM Book b INNER JOIN Content c on c.content_id = b.content_id";
	processBooks(req, res, sql);
});

app.get("/books/author", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, b.author, b.genre, b.publisher FROM Book b INNER JOIN Content c on c.content_id = b.content_id ORDER BY b.author";
	processBooks(req, res, sql);
});

app.get("/books/publisher", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, b.author, b.genre, b.publisher FROM Book b INNER JOIN Content c on c.content_id = b.content_id ORDER BY b.publisher";
	processBooks(req, res, sql);
});

app.get("/books/title", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, b.author, b.genre, b.publisher FROM Book b INNER JOIN Content c on c.content_id = b.content_id ORDER BY c.title";
	processBooks(req, res, sql);
});

app.get("/books/genre", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, b.author, b.genre, b.publisher FROM Book b INNER JOIN Content c on c.content_id = b.content_id ORDER BY b.genre";
	processBooks(req, res, sql);
});

function processNewspaper(req, res, sql) {
	rows = "";
	database.query(sql, function (err, results) {
		for (i = 0; i < results.length; i++){
			rows +=
				"<tr><td><a href=/newspaper-profile/" + results[i].content_id + ">" +
				results[i].title +
				",  " +
				results[i].publish_date.toString().substring(0, 15) +
				"</a></td><td> " +
				results[i].locale +
				"</td></tr>\n";
		}
		res.render("pages/newspapers");
	});
}

function processBooks(req, res, sql) {
	rows = "";
	database.query(sql, function (err, results) {
		for (i = 0; i < results.length; i++)
			rows +=
				"<tr><td><a href=/book-profile/" +
				results[i].content_id +
				">" +
				results[i].title +
				"</a></td><td> " +
				results[i].author +
				" </td><td> " +
				results[i].genre +
				" </td><td> " +
				results[i].publisher +
				"</td></tr>\n";
		res.render("pages/books");
	});
}

app.get("/poems", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c ON c.content_id = p.content_id";
	processPoems(req, res, sql);
});

app.get("/poems/title", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c ON c.content_id = p.content_id ORDER BY c.title";
	processPoems(req, res, sql);
});

app.get("/poems/author", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c ON c.content_id = p.content_id ORDER BY p.author";
	processPoems(req, res, sql);
});

app.get("/poems/poem_type", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c ON c.content_id = p.content_id ORDER BY p.poem_type";
	processPoems(req, res, sql);
});

function processPoems(req, res, sql) {
	rows = "";
	database.query(sql, function (err, results) {
		for (i = 0; i < results.length; i++) {
			rows +=
				"<tr><td><a href=/poem-profile/" +
				results[i].content_id +
				">" +
				results[i].title +
				"</a></td><td> " +
				results[i].author +
				" </td><td> " +
				results[i].poem_type +
				"</td></tr>\n ";
		}
		res.render("pages/poems");
	});
}

function processArticles(req, res, sql) {
	rows = "";
	database.query(sql, function (err, results) {
		for (i = 0; i < results.length; i++)
			rows +=
				"<tr><td><a href=" + "/article-profile/" + results[i].content_id + ">" +
				results[i].title +
				"</td><td> " +
				results[i].author +
				" </td><td> " +
				results[i].publication_name +
				" </td><td> " +
				results[i].publish_date +
				"</td></tr>\n ";
		res.render("pages/articles");
	});
}

app.get("/magazines", function (req, res) {
	res.render("pages/magazines");
});

function processMagazines(req, res, sql) {
	rows = "";
	database.query(sql, function (err, results) {
		for (i = 0; i < results.length; i++){
			rows +=
				"<tr><td><a href=/magazine-profile/" +  results[i].content_id + ">" +
				results[i].title +
				", " +
				results[i].issueNum +
				" </td><td> " +
				results[i].publish_date.toString().substring(0, 15) +
				"</td></tr>\n ";
		}
		res.render("pages/magazines");
	});
}

app.get("/magazine-profile/*", function (req, res) {
	bookNum = req.url.replace(/[^0-9]/g, "");
	let sql =
		"SELECT c.content_id, c.title, m.issueNum, c.publish_date FROM Magazine m INNER JOIN Content c ON c.content_id = " +
		bookNum;
	database.query(sql, function (err, results) {
		currentUser.currentContent.content_id = results[0].content_id;
		currentUser.currentContent.title = results[0].title;
		currentUser.currentContent.issueNum = results[0].issueNum;
		currentUser.currentContent.publish_date = results[0].publish_date;
		res.render("pages/magazine-profile");
	});
});

app.get("/magazines/title", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, m.issueNum, c.publish_date FROM Magazine m INNER JOIN Content c ON c.content_id = m.content_id ORDER BY c.title";
	processMagazines(req, res, sql);
});

app.get("/magazines/issueNum", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, m.issueNum, c.publish_date FROM Magazine m INNER JOIN Content c ON c.content_id = m.content_id ORDER BY m.issueNum";
	processMagazines(req, res, sql);
});

app.get("/magazines/publishDate", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, m.issueNum, c.publish_date FROM Magazine m INNER JOIN Content c ON c.content_id = m.content_id ORDER BY c.publish_date";
	processMagazines(req, res, sql);
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

//------------auth-------------------------------
app.use("/auth", auth);
app.get("/auth/signup", function (req, res) {
	res.redirect("/auth/signup");
});

app.get("/auth/login", function (req, res) {
	res.redirect("/auth/login");
});

app.listen("8080", () => {
	console.log("server started on port 8080");
});


module.exports.database = database
