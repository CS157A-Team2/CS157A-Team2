//----------------Includes--------------------
const connect = require('connect')
const http = require('http')
const fs = require('fs')
const express = require('express')
const mysql = require('mysql')
const path = require('path');
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
app.set('view engine', 'ejs');
rows = ''

//----------------Define Webpages---------------------------
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/about', function (req, res) {
	res.render('pages/about')
})

app.get('/content', function (req, res) {
	res.render('pages/content')
})

app.get('/newspapers', function (req, res) {
	res.render('pages/newspapers')
})

getRows = function()
{
	return rows
}

app.get('/books', function (req, res){
	rows = ''
	let sql = "SELECT c.title, b.author, b.genre, b.publisher FROM Book b INNER JOIN Content c on c.content_id = b.content_id"
    database.query(sql, function (err, results) {
	for(i=0; i < results.length; i++)
		rows += '<tr><td>' +results[i].title + '</td><td> ' + results[i].author + ' </td><td> ' + results[i].genre + ' </td><td> ' + results[i].publisher +   '</td></tr>\n';
    res.render('pages/books');
    });
});

app.get('/poems', function (req, res){
	rows = ''
    let sql = "SELECT c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c ON c.content_id = p.content_id";
    database.query(sql, function (err, results) {
	for(i=0; i < results.length; i++)
		rows += '<tr><td>' +results[i].title + '</td><td> ' + results[i].author + ' </td><td> ' + results[i].poem_type +  '</td></tr>\n ';
        res.render('pages/poems');
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

app.listen('8080', () => {
	console.log('server started on port 8080')
})
