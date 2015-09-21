var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var jwt = require('jwt-simple');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());

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

app.post('/postDiagnostic', function(req,res){
	console.log(res);
	var async = false;
	var ip_pool = "Main Pool";
	var send_at = "example send_at";
	var message = {
		"html": "Hello Jab !",
		"text": "Nouveau prospect",
		"subject": "Livre blanc",
		"from_email": "hvillain@student.42.fr",
		"from_name": req.body.lname + ' ' + req.body.fname,
		"to": [{
		        "email": "hvillain@student.42.fr",
		        "name": "pour Jab",
		        "type": "to"
		    }],
		"headers": {
		    "Reply-To": req.body.email
		},
		"important": false,
		"track_opens": null,
		"track_clicks": null,
		"auto_text": null,
		"auto_html": null,
		"inline_css": null,
		"url_strip_qs": null,
		"preserve_recipients": null,
		"view_content_link": null,
		"bcc_address": "",
		"tracking_domain": null,
		"signing_domain": null,
		"return_path_domain": null,
		"merge": true,
	"merge_language": "mailchimp"
	};

	mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": ''}, function(result) {
	    res.send(200, {message:'Merci! Vous allez recevoir sous peu un lien de téléchargement dans votre boîte mail.\nVous êtes éligible à la disruption? Passez le test!'});
	}, function(e) {
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	    res.send(406, e);
	    return res.redirect('/');
	});
});

app.get('/*', function(request, response) {
  response.sendFile(__dirname + '/app/dist/index.html');
  //response.redirect('/');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

