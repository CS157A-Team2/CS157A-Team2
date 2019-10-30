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



//----------------Define Webpages---------------------------


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/../content/index.html'))
		
})

app.get('/about', function (req, res) {
	res.sendFile(path.join(__dirname + '/../content/about.html'))
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
