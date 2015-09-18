var express = require('express');
var app = express();
var http = require('http');
var jwt = require('jwt-simple');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/app/dist'));
app.use(express.static(__dirname + '/app/dist/assets'));
app.use(express.static(__dirname + '/app/dist/style'));

app.get('/WhatAboutTrackingMyself/go', function(req,res){
	var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tIjoiQlBJIiwic3Vic2NyaWJlc1RvTWFpbGluZ0xpc3QiOmZhbHNlLCJlbWFpbCI6Imh2aWxsYWluQHN0dWRlbnQuNDIuZnIiLCJjb21wYW55IjoicXdlcXdlIiwiZm5hbWUiOiJUcmFja2luZyIsImxuYW1lIjoiVGVzdCIsInNlY3RvciI6IkluZHVzdHJpZSJ9.V-5QnYa8qzN8TIoVgsUyZgsMAZ7UIrbPx9RMA5-xFL8";
	var secret = 'ThisIsTheSecretIDontWantUTOKNOW';
	var decoded = jwt.decode(token, secret);
	console.log(decoded);
	return res.send(200);
	// http.get('http://derock.herokuapp.com/trackDiagnostic/' + token, function(res){
	// 	console.log(res.statusCode);
	// 	return res.send(200);
	// })
});

app.get('/*', function(request, response) {
  response.sendFile(__dirname + '/app/dist/index.html');
  //response.redirect('/');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


