var http = require('http')
var fs = require('fs')

function send404Response(response)
{
	response.writeHead(200, {"Context-Type": "text/plain"})
	response.write("404 Error")
	response.end()
}

function onRequest(request, response)
{
	if(request.method == 'GET' &&  request.url == '/')
	{	
		response.writeHead(200, {"Context-Type": "text/html"})
		fs.createReadStream("../content/index.html").pipe(response);
	}
	else
	{
		send404Response(response)
	}
}


http.createServer(onRequest).listen(8080)
console.log("the server is running")


