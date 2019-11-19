const express = require('express');
const router = express.Router();
const server = require('../server')
const firebase = require('./auth')


router.get("/", function (req, res) {
	if(currentUser.currentContent.content_type == null){res.redirect("/"); return}
    tableName = currentUser.currentContent.content_type.substring(0, 1).toUpperCase() + currentUser.currentContent.content_type.substring(1, currentUser.currentContent.content_type.length)
    sql = "SELECT * FROM " + tableName  + " o, Content c WHERE o.content_id = " + currentUser.currentContent.content_id  + " AND o.content_id = c.content_id"
    server.database.query(sql, function(err, results)
    {
        contentInfo = ""
        switch(tableName)
        {
            case "Book":
                contentInfo =  "<h3>Written by <i>" + currentUser.currentContent.author + "</i></h3>" +
                    "<h3>Published by <i>"  + currentUser.currentContent.publisher + "</i></h3>"
                break;
            case "Poem":
                contentInfo = "<h3>Written by <i>" +currentUser.currentContent.author +  "</i></h3>"+
                    "<h3>Poem Type: <i>" + currentUser.currentContent.poem_type + "</i></h3>"
                break;
            case "Newspaper":
                contentInfo = "<h3><i>" + currentUser.currentContent.locale + "</i></h3>"
                break;
            case "Magazine":
                contentInfo =  "<h2> Issue #" + currentUser.currentContent.issueNum+ "</h2>"
                break;
            case "Article":
                contentInfo = "<h3>Written by <i>" + currentUser.currentContent.author +"</i></h3>" +
                    "<h3>Published by <i> " + currentUser.currentContent.publication_name +  "</i></h3>"
                break;
        }
        reviewSql = "SELECT * FROM Reviews r, Users u WHERE r.content_id = " + currentUser.currentContent.content_id + " AND r.user_id = u.user_id"
        server.database.query(reviewSql, function(err, results)
        {
            if (err) throw err;
            star = "⭐"
            comments = ""
            comments += "<div class=\"list-group\">"
            results.forEach((Element) => {
                comments += "<div class=\"alert alert-primary\"><h6 class=\"list-group-item-heading\">Rating: " + star.repeat(Element.rating - 1) + "⭐ <div  align=\"right\">Rated by: " + Element.username + "</div></h6>"
                if(Element.user_comment != null)
                    comments += "<p class=\"list-group-item-text\">User Comments: <br>" + Element.user_comment + "</p> </br>"
                else comments += 'No Comment </br>'
                if (currentUser.user_type === 'admin') {
                    comments += " <div align=\"right\"> <a href=\"/content-profile/delete?user_id="+ Element.user_id +"&content_id="+ Element.content_id +"\" class=\"list-group-item-text\">Delete</a> </div> </div>";
                } else {
                    comments += "</div>"
                }
            })
            comments += "</div>"
            let sql = "SELECT * FROM Reviews WHERE user_id = '" + currentUser.user_id + "' AND content_id = " +  currentUser.currentContent.content_id
            server.database.query(sql, function (err, results) {
                hasReviewed = results.length != 0

                res.render("pages/content-profile", {contentInfo: contentInfo, comments: comments, hasReviewed: hasReviewed});
            })
        })
    })
});

router.post('/submit', function(req,res){
    // insert the comment, reload the page
    let comment = req.body.review;
    let rating = req.body.rating;
	let uid = firebase.firebase.auth().currentUser.uid
    if(comment != '')
        values = "( '" + uid +  "', '" +  server.currentUser.currentContent.content_id + "', '" + comment + "', " + rating + ");";
    else
        values = "( '" + uid  +  "', '" +  server.currentUser.currentContent.content_id + "', null, " + rating + ");";

    let sql = "INSERT INTO Reviews (user_id, content_id, user_comment, rating) VALUES " + values;
    server.database.query(sql, function (err, results) {
        console.log(err)
        res.redirect("/content-profile")//remove later
    })

})

router.get('/delete', function(req, res) {
    user_id = req.query.user_id;
    content_id = req.query.content_id;
    sql = "DELETE FROM Reviews WHERE user_id ='"+ user_id + "' AND content_id='"+ content_id +"'";
    server.database.query(sql, function(err, results) {
        if(results) {
            res.redirect("/content-profile")
        }
        if(err) {
            console.log(err)
        }
    })
})

module.exports = router
