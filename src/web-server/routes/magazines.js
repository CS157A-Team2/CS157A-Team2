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
		"SELECT c.content_id, c.title, c.publish_date, m.issueNum FROM Magazine m INNER JOIN Content c on c.content_id = m.content_id";
	processMagazines(req, res, sql);
});

router.get("/title", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, m.issueNum, c.publish_date FROM Magazine m INNER JOIN Content c ON c.content_id = m.content_id ORDER BY c.title";
	processMagazines(req, res, sql);
});

router.get("/issueNum", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, m.issueNum, c.publish_date FROM Magazine m INNER JOIN Content c ON c.content_id = m.content_id ORDER BY m.issueNum";
	processMagazines(req, res, sql);
});

router.get("/publishDate", function (req, res) {
	let sql =
		"SELECT c.content_id, c.title, m.issueNum, c.publish_date FROM Magazine m INNER JOIN Content c ON c.content_id = m.content_id ORDER BY c.publish_date";
	processMagazines(req, res, sql);
});

router.get("/magazine-profile/*", function (req, res) {	
	bookNum = req.url.replace(/[^0-9]/g, "");
	let sql =
		"SELECT c.content_type, c.content_id, c.title, m.issueNum, c.publish_date FROM Magazine m INNER JOIN Content c ON c.content_id = " +
		bookNum;
	database.query(sql, function (err, results) {
		currentUser.currentContent.content_id = results[0].content_id;
		currentUser.currentContent.title = results[0].title;
		currentUser.currentContent.content_type = results[0].content_type
		currentUser.currentContent.issueNum = results[0].issueNum;
		currentUser.currentContent.publish_date = results[0].publish_date;
	isFavorite(function(){
		res.redirect("/content-profile");
 	})});
});

function processMagazines(req, res, sql) {
	rows = "";
	database.query(sql, function (err, results) {
		for (i = 0; i < results.length; i++){
			rows +=
				"<tr><td><a href=magazines/magazine-profile/" +  results[i].content_id + ">" +
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