// Using express rather than http

var express = require('express');
var app = express.createServer();

app.get('/', function(req, res){
	// No need to define headers ourselves!
	res.send('Welcome to NodeTwitter');
});

app.listen(8000);