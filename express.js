// Using express rather than http

var express = require('express');
var app = express.createServer();

app.listen(8000);

var tweets = [];

app.get('/', function(req, res){
	// No need to define headers ourselves!
	res.send('Welcome to NodeTwitter');
});

app.post('/send', express.bodyParser(), function(req, res){
	if(req.body && req.body.tweet) {
		tweets.push(req.body.tweet);
		res.send({status: 'ok', message: 'Tweet received'});
	} else {
		// No tweet
		res.send({status: 'nok', message: 'No tweet received'});
	}
});

app.get('/tweets', function(req, res){
	res.send(tweets);
});