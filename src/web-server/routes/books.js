const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const server = require("../server");

const database = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "bookstore",
});

router.get("/", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, b.author, b.genre, b.publisher, b.ISBN FROM Book b INNER JOIN Content c on c.content_id = b.content_id";
	processBooks(req, res, sql);
});

router.get("/author", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, b.author, b.genre, b.publisher, b.ISBN FROM Book b INNER JOIN Content c on c.content_id = b.content_id ORDER BY b.author";
	processBooks(req, res, sql);
});

router.get("/publisher", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, b.author, b.genre, b.publisher, b.ISBN FROM Book b INNER JOIN Content c on c.content_id = b.content_id ORDER BY b.publisher";
	processBooks(req, res, sql);
});

router.get("/title", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, b.author, b.genre, b.publisher, b.ISBN FROM Book b INNER JOIN Content c on c.content_id = b.content_id ORDER BY c.title";
	processBooks(req, res, sql);
});

router.get("/genre", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, b.author, b.genre, b.publisher, b.ISBN FROM Book b INNER JOIN Content c on c.content_id = b.content_id ORDER BY b.genre";
	processBooks(req, res, sql);
});

router.get("/book-profile/*", function (req, res) {
	bookNum = req.url.replace(/[^0-9]/g, "");
	let sql =
		"SELECT b.ISBN, c.content_type, c.content_id, c.title, b.author, b.genre, b.publisher, c.publish_date FROM Book b INNER JOIN Content c on c.content_id = b.content_id where c.content_id = " +
		bookNum;
	database.query(sql, function (err, results) {
		server.currentUser.currentContent.content_id = results[0].content_id;
		server.currentUser.currentContent.title = results[0].title;
		server.currentUser.currentContent.content_type = results[0].content_type
		server.currentUser.currentContent.author = results[0].author;
		server.currentUser.currentContent.genre = results[0].genre;
		server.currentUser.currentContent.ISBN = results[0].ISBN;
		server.currentUser.currentContent.publisher = results[0].publisher;
		server.currentUser.currentContent.publish_date = results[0].publish_date
		isFavorite(function(){
		res.redirect("/content-profile");
		})
	});
});



function processBooks(req, res, sql) {
	rows = "";
	database.query(sql, function (err, results) {
		for (i = 0; i < results.length; i++)
			rows +=
				"<tr><td><a href=books/book-profile/" +
				results[i].content_id +
				">" +
				results[i].title +
				"</a></td><td> " +
				results[i].author +
				" </td><td> " +
				results[i].genre +
				" </td><td> " +
				results[i].publisher +
        "</td><td> " +
				results[i].ISBN +
				" </td></tr>\n";
		res.render("pages/books");
	});
}

isFavorite = function(callback)
{
	let sql = 'SELECT * FROM Favorites WHERE user_id= (SELECT user_id FROM Users WHERE username ="' + server.currentUser.username + '") AND content_id=' + server.currentUser.currentContent.content_id
	database.query(sql, function(err, results){
		if(results.length == 1){server.currentUser.currentContent.isFavorite = true}
		else{server.currentUser.currentContent.isFavorite = false;}	
		callback()
	})
}

module.exports = router
