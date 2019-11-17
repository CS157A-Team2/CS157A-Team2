const express = require('express');
const router = express.Router();
const mysql = require("mysql");

const database = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "bookstore",
});

router.get("/", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c ON c.content_id = p.content_id";
	processPoems(req, res, sql);
});

router.get("/title", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c ON c.content_id = p.content_id ORDER BY c.title";
	processPoems(req, res, sql);
});

router.get("/author", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c ON c.content_id = p.content_id ORDER BY p.author";
	processPoems(req, res, sql);
});

router.get("/poem_type", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c ON c.content_id = p.content_id ORDER BY p.poem_type";
	processPoems(req, res, sql);
});

router.get("/poem-profile/*", function (req, res) {
	poemNum = req.url.replace(/[^0-9]/g, "");
	let sql =
		"SELECT c.publish_date, c.content_type, c.content_id, c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c on c.content_id = p.content_id where c.content_id = " +
		poemNum;
	database.query(sql, function (err, results) { 
		currentUser.currentContent.content_id = results[0].content_id;
		currentUser.currentContent.title = results[0].title;
		currentUser.currentContent.content_type = results[0].content_type
		currentUser.currentContent.author = results[0].author;
		currentUser.currentContent.publish_date = results[0].publish_date
		currentUser.currentContent.poem_type = results[0].poem_type;
		isFavorite(function(){
		res.redirect("/content-profile");
		})
	});
});

function processPoems(req, res, sql) {
	rows = "";
	database.query(sql, function (err, results) {
		for (i = 0; i < results.length; i++) {
			rows +=
				"<tr><td><a href=poems/poem-profile/" +
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

isFavorite = function(callback)
{
	let sql = 'SELECT * FROM Favorites WHERE user_id= (SELECT user_id FROM Users WHERE username ="' + currentUser.username + '") AND content_id=' + currentUser.currentContent.content_id
	database.query(sql, function(err, results){
		if(results.length == 1){currentUser.currentContent.isFavorite = true}
		else{currentUser.currentContent.isFavorite = false;}	
		callback()
	})
}

module.exports = router