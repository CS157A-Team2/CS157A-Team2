const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const server =  require("../server")
const database = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "bookstore",
});


router.get('/*', function (req, res) {
	order_by = 'results.content_id'
	if(req.url !== "/") order_by = req.url.replace('/', '')
	let desc = ''
	if(req.url !== "/") desc = (order_by == 'results.title') ? '' : 'DESC'
	console.log(order_by)
	if(req.body.q != undefined)
		q = req.body.q
	q = ' '
	sql = `SELECT results.*, reviews.num_reviews, downloads.num_downloads, reviews.avg_rating, favorites.num_favorites FROM 
            (SELECT Content.content_id, Content.title, Content.content_type FROM Content LEFT JOIN Book on Book.content_id=Content.content_id
             LEFT JOIN Poem ON Poem.content_id=Content.content_id 
             LEFT JOIN Article on Article.content_id=Content.content_id 
             LEFT JOIN Newspaper ON Newspaper.content_id=Content.content_id 
             LEFT JOIN Magazine on Magazine.content_id=Content.content_id 
             WHERE  CONCAT(content_type, IFNULL(title, ''), IFNULL( Book.author, ''), IFNULL( Book.ISBN, ''),
             IFNULL( Poem.poem_type, ''), IFNULL( Book.genre, ''), IFNULL(Article.author, ''), 
             IFNULL(Poem.author, ''), 
             IFNULL(Article.publication_name, '')) 
             LIKE '%${q}%') results
            LEFT JOIN
            (SELECT content_id, COUNT(*) as num_reviews, AVG(rating) AS avg_rating FROM Reviews GROUP BY content_id) reviews
            ON results.content_id = reviews.content_id
            LEFT JOIN
            (SELECT content_id, COUNT(*) as num_downloads FROM Downloads GROUP BY content_id) downloads
            ON results.content_id = downloads.content_id
            LEFT JOIN
            (SELECT content_id, COUNT(*) as num_favorites FROM Favorites GROUP BY content_id) favorites
            ON results.content_id = favorites.content_id
            ORDER BY ${order_by} ${desc}`
	rows = ''
	server.database.query(sql, function(err, results){
		if( results != undefined && 0 != results.length)
		{
			for(i = 0; i < results.length; i++)
			{
				if(results[i].num_downloads == null)
					results[i].num_downloads = 0;
				if(results[i].num_favorites == null)
					results[i].num_favorites = 0;
				if(results[i].avg_rating == null)
					results[i].avg_rating = 'N/A';

				rows += "<tr><td><a href=/"+  results[i].content_type+"s/" + results[i].content_type + "-profile/" +
					results[i].content_id +
					">" +
					results[i].title +
					"</a></td><td>" +
					results[i].content_type +
					"</td><td>" +
					results[i].num_downloads +
					"</td><td>" +
					results[i].num_favorites +
					"</td><td>" +
					results[i].avg_rating +
					"</td></tr>\n ";
			}
		}
		console.log(err)
		res.render('pages/content.ejs', {q: q, rows: rows})
	})
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
