//----------------Includes--------------------
const connect = require('connect')
const http = require('http')
const fs = require('fs')
const express = require('express')
const mysql = require('mysql')
const path = require('path');

//--------------routes-------------------------
const auth = require('./routes/auth')

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
app.use(express.static('public'))
app.set('view engine', 'ejs');
rows = ''
currentBook = {author: null, title: null, publisher: null, reviews: null, genre: null}
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
//how to get wildcard number??.............
app.get('/book-profile/*', function(req, res){
	bookNum = req.url.replace(/[^0-9]/g, '')
	let sql = "SELECT c.content_id, c.title, b.author, b.genre, b.publisher FROM Book b INNER JOIN Content c on c.content_id = b.content_id where c.content_id = " + bookNum
	console.log(sql)
	database.query(sql, function (err, results) {
		currentBook.content_id = results[0].content_id
		currentBook.title = results[0].title
		currentBook.author = results[0].author
		currentBook.genre = results[0].genre
		currentBook.publisher =  results[0].publisher  
		res.render('pages/book-profile');
    });	
})

app.get('/books', function (req, res){
	let sql = "SELECT c.content_id, c.title, b.author, b.genre, b.publisher FROM Book b INNER JOIN Content c on c.content_id = b.content_id"
	processBooks(req, res, sql)
});

app.get('/books/author', function (req, res){
	let sql = "SELECT c.content_id, c.title, b.author, b.genre, b.publisher FROM Book b INNER JOIN Content c on c.content_id = b.content_id ORDER BY b.author"
	processBooks(req, res, sql)
});

app.get('/books/publisher', function (req, res){
	let sql = "SELECT c.content_id, c.title, b.author, b.genre, b.publisher FROM Book b INNER JOIN Content c on c.content_id = b.content_id ORDER BY b.publisher"
	processBooks(req, res, sql)
});

app.get('/books/title', function (req, res){
	let sql = "SELECT c.content_id, c.title, b.author, b.genre, b.publisher FROM Book b INNER JOIN Content c on c.content_id = b.content_id ORDER BY c.title"
	processBooks(req, res, sql)
});

app.get('/books/genre', function (req, res){
	let sql = "SELECT c.content_id, c.title, b.author, b.genre, b.publisher FROM Book b INNER JOIN Content c on c.content_id = b.content_id ORDER BY b.genre"
	processBooks(req, res, sql)
});

function processBooks(req, res, sql)
{
	rows = ''
    database.query(sql, function (err, results) {
	for(i=0; i < results.length; i++)
		rows += '<tr><td><a href=/book-profile/' + results[i].content_id + '>' + results[i].title +'</a></td><td> ' + results[i].author + ' </td><td> ' + results[i].genre + ' </td><td> ' + results[i].publisher +   '</td></tr>\n';
    res.render('pages/books');
    });
}

app.get('/poems', function (req, res){
    let sql = "SELECT c.content_id, c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c ON c.content_id = p.content_id";
	processPoems(req, res, sql)
});

app.get('/poems/title', function (req, res){
    let sql = "SELECT c.content_id, c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c ON c.content_id = p.content_id ORDER BY c.title";
	processPoems(req, res, sql)
});

app.get('/poems/author', function (req, res){
    let sql = "SELECT c.content_id, c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c ON c.content_id = p.content_id ORDER BY p.author";
	processPoems(req, res, sql)
});

app.get('/poems/poem_type', function (req, res){
    let sql = "SELECT c.content_id, c.title, p.author, p.poem_type FROM Poem p INNER JOIN Content c ON c.content_id = p.content_id ORDER BY p.poem_type";
	processPoems(req, res, sql)
});

function processPoems(req, res, sql)
{
	rows = ''	
    database.query(sql, function (err, results) {
	for(i=0; i < results.length; i++)
		rows += '<tr><td>' +results[i].title + '</td><td> ' + results[i].author + ' </td><td> ' + results[i].poem_type +  '</td></tr>\n ';
        res.render('pages/poems');
    });
}

app.get('/artices', function (req, res) {
	 res.render('pages/articles')
})

app.get('/magazines', function (req, res) {
	res.render('pages/magazines')
})

app.get('/users', function(req, res){
		let sql = "SELECT c.content_id, * FROM Users"
		let query = database.query(sql, (err, results) => {
				table = ''
				for(i=0; i < results.length; i++)
					table += results[i].user_id + ' ' + results[i].username + ' ' + results[i].user_type + '<br>';
				res.send('<h1> users <hr>' + table + '</h1>')
		})
})

app.use('/auth', auth)
app.get('/auth/signup', function(req, res) {
	res.redirect('/auth/signup')
})

app.get('/auth/login', function(req, res) {
	res.redirect('/auth/login')
})

app.listen('8080', () => {
	console.log('server started on port 8080')
})
