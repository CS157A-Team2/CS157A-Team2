//----------------Includes--------------------
const connect = require('connect')
const http = require('http')
const fs = require('fs')
const express = require('express')
const mysql = require('mysql')
const path = require('path');
hello = 'hi'
const database = mysql.createConnection({
	host	: 'localhost',
	user	: 'root',
	password: 'root',
	database: 'bookstore'
})

database.connect((err) => {
	if(err){
		console.log("connection error")
		throw err
	}
	else{
		console.log('connection successful')
	}
})


const app = express()



//----------------Define Webpages---------------------------

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/about', function (req, res) {
	res.render('pages/about')
})

app.get('/content', function (req, res) {
	res.render('pages/content')
})
app.get('/books', function (req, res) {
	res.render('pages/books')
})

app.get('/newspapers', function (req, res) {
	res.render('pages/newspapers')
})

const con = database
rows = ''
getRows = function()
{
	return rows
}
app.get('/poems', function (req, res) {
	con.connect(function (err) {
        let sql = "SELECT c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c ON c.content_id = p.content_id";
        con.query(sql, function (err, results) {
				for(i=0; i < results.length; i++)
					rows += '<tr><td>' +results[i].title + '</td><td> ' + results[i].author + ' </td><td> ' + results[i].poem_type +  '</td></tr>\n ';
                res.render('pages/poems');
            });
        });
    });

app.get('/artices', function (req, res) {
	 res.render('pages/articles')
})

app.get('/magazines', function (req, res) {
	res.render('pages/magazines')
})


app.get('/users', function(req, res){
		let sql = "SELECT * FROM Users"
		let query = database.query(sql, (err, results) => {
				table = ''
				for(i=0; i < results.length; i++)
					table += results[i].user_id + ' ' + results[i].username + ' ' + results[i].user_type + '<br>';
				res.send('<h1> users <hr>' + table + '</h1>')
		})
})

app.get('/auth', function (req, res) {
	res.sendFile(path.join(__dirname + '/../content/auth.html'))
})

app.listen('8888', () => {
	console.log('server started on port 8080')
})

getBookRows = function(	)
{
		let sql = "SELECT c.title, b.author, b.genre, b.publisher FROM Book b INNER JOIN Content c on c.content_id = b.content_id"
		database.query(sql, (err, results) => {
				bookRows = ''
				for(i=0; i < results.length; i++)
					bookRows += '<tr><td>' +results[i].title + '</td><td> ' + results[i].author + ' </td><td> ' + results[i].genre + ' </td><td> ' + results[i].publisher + '</td></tr>\n ';
		})
		return  bookRows
}

getPoemRows = function(	)
{
		let sql = "SELECT c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c on p.content_id = c.content_id"
		poemRows=''
		let query = database.query(sql, (err, results) => {

				for(i=0; i < results.length; i++)
					poemRows += '<tr><td>' +results[i].title + '</td><td> ' + results[i].author + ' </td><td> ' + results[i].poem_type +  '</td></tr>\n ';
						
				})
		return  poemRows
}

