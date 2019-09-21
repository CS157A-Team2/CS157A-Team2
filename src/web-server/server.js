//----------------Includes--------------------
var connect = require('connect')
var http = require('http')
var fs = require('fs')

//-----------------Web Pages------------------
var home = function(request, response)
{
	response.writeHead(200, {"Context-Type": "text/html"})
	fs.createReadStream("../content/index.html").pipe(response)
}

var about = function(request, response)
{
	response.writeHead(200, {"Context-Type": "text/html"})
	fs.createReadStream("../content/about.html").pipe(response)
}

//----------------Establish Connection--------
var app = connect()

app.use('/about', about) // About Page
app.use('/', home) //Homepage - must be last in this list

http.createServer(app).listen(8080) //port 8080
console.log('Success') //Server running


