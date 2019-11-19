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
		" SELECT a.publication_name, a.author, c.title, c.publish_date, c.content_id FROM Article a INNER JOIN Content c on c.content_id = a.content_id";
	processArticles(req, res, sql);
});

router.get("/title", function (req, res) {
	let sql =
		" SELECT a.publication_name, a.author, c.title, c.publish_date, c.content_id FROM Article a INNER JOIN Content c on c.content_id = a.content_id ORDER BY c.title";
	processArticles(req, res, sql);
});

router.get("/author", function (req, res) {
	let sql =
		" SELECT a.publication_name, a.author, c.title, c.publish_date, c.content_id FROM Article a INNER JOIN Content c on c.content_id = a.content_id ORDER BY a.author";
	processArticles(req, res, sql);
});

router.get("/date", function (req, res) {
	let sql =
		" SELECT a.publication_name, a.author, c.title, c.publish_date, c.content_id FROM Article a INNER JOIN Content c on c.content_id = a.content_id ORDER BY c.publish_date";
	processArticles(req, res, sql);
});

router.get("/publication", function (req, res) {
	let sql =
		" SELECT a.publication_name, a.author, c.title, c.publish_date, c.content_id FROM Article a INNER JOIN Content c on c.content_id = a.content_id ORDER BY a.publication_name";
	processArticles(req, res, sql);
});

router.get("/article-profile/*", function (req, res) {
	bookNum = req.url.replace(/[^0-9]/g, "");
	let sql =
		"SELECT c.publish_date, c.content_type, c.content_id, c.title, a.author, a.publication_name FROM Article a INNER JOIN Content c on c.content_id = a.content_id where c.content_id = " +
		bookNum;
	database.query(sql, function (err, results) {
		server.currentUser.currentContent.content_id = results[0].content_id;
		server.currentUser.currentContent.publication_name = results[0].publication_name
		server.currentUser.currentContent.publish_date = results[0].publish_date
		server.currentUser.currentContent.content_type = results[0].content_type
		server.currentUser.currentContent.title = results[0].title;
		server.currentUser.currentContent.author = results[0].author;
		server.currentUser.currentContent.genre = results[0].publication_name;
		isFavorite(function(){
		res.redirect("/content-profile");
		})
	});
});

function processArticles(req, res, sql) {
	rows = "";
	database.query(sql, function (err, results) {
		for (i = 0; i < results.length; i++)
			rows +=
				"<tr><td><a href=articles/article-profile/" + results[i].content_id + ">" +
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
