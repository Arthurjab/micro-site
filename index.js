var express = require('express');
var app = express();
var http = require('http');
var jwt = require('jwt-simple');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/app/dist'));
app.use(express.static(__dirname + '/app/dist/assets'));
app.use(express.static(__dirname + '/app/dist/style'));

app.get('/getMyFormBack/:token', function(req,res){
	var token = req.params.token;
	var secret = 'ThisIsTheSecretIDontWantUTOKNOW';
	var decoded = jwt.decode(token, secret);
	console.log(decoded);
	http.get('http://derock.herokuapp.com/diagIsDone/' + token, function(resp){
		console.log(resp);
		return res.send(200, decoded);
	});
});

app.get('/*', function(request, response) {
  response.sendFile(__dirname + '/app/dist/index.html');
  //response.redirect('/');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


