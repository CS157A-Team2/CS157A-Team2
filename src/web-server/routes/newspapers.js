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
		"SELECT c.content_id, c.publish_date, c.title, n.locale FROM Newspaper n INNER JOIN Content c on c.content_id = n.content_id";
	processNewspaper(req, res, sql);
});

router.get("/date", function (req, res) {
	let sql =
		"SELECT c.content_id, c.publish_date, c.title, n.locale FROM Newspaper n INNER JOIN Content c on c.content_id = n.content_id ORDER BY publish_date";
	processNewspaper(req, res, sql);
});

router.get("/location", function (req, res) {
	let sql =
		"SELECT c.content_id, c.publish_date, c.title, n.locale FROM Newspaper n INNER JOIN Content c on c.content_id = n.content_id ORDER BY locale";
	processNewspaper(req, res, sql);
});

router.get("/publication", function (req, res) {
	let sql =
		"SELECT c.content_id, c.publish_date, c.title, n.locale FROM Newspaper n INNER JOIN Content c on c.content_id = n.content_id ORDER BY title";
	processNewspaper(req, res, sql);
});

router.get("/newspaper-profile/*", function (req, res) {
	newspaperNum = req.url.replace(/[^0-9]/g, "");
	let sql =
		"SELECT c.content_type, c.content_id, c.title, n.locale, c.publish_date FROM Newspaper n INNER JOIN Content c on c.content_id = n.content_id where c.content_id = " +
		newspaperNum;
	database.query(sql, function (err, results) {
		currentUser.currentContent.content_id = results[0].content_id;
		currentUser.currentContent.content_type = results[0].content_type
		currentUser.currentContent.title = results[0].title;
		currentUser.currentContent.publish_date = results[0].publish_date;
		currentUser.currentContent.locale = results[0].locale;
		isFavorite(function(){
		res.redirect("/content-profile");
		})
	});
});

function processNewspaper(req, res, sql) {
	rows = "";
	database.query(sql, function (err, results) {
		for (i = 0; i < results.length; i++){
			rows +=
				"<tr><td><a href=newspapers/newspaper-profile/" + results[i].content_id + ">" +
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