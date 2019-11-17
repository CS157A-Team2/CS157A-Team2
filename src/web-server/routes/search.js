const express = require('express');
const router = express.Router();
const server = require('../server')

q = ''

router.get('/', function(req,res){
    res.redirect('/')
})


router.get('/find', function(req,res){
    res.render('pages/search.ejs', {q: "", rows: ''})
})

router.post('/find*', function (req, res) {
    order_by = 'results.content_id'
    if(req.url !== "/find") order_by = req.url.replace('/find/', '')
    if(req.body.q != undefined)
        q = req.body.q
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
            ORDER BY ${order_by} DESC`
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
        res.render('pages/search.ejs', {q: q, rows: rows})
    })
});


module.exports = router
module.exports.firebase = firebase
