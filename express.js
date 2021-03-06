// Using express rather than http

var express = require('express');
var app = express.createServer();

app.listen(8000); // Asynchronous

var tweets = [];

app.get('/', function(req, res){
	var title = 'Chirpie',
		header = 'Welcome to Chirpie';

	res.render('index', {
		locals: {
			'title': title,
			'header': header,
			'tweets': tweets,
			'stylesheets': ['/public/style/css']
		}
	});
});

app.post('/send', express.bodyParser(), function(req, res){ // bodyParser = middleware
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