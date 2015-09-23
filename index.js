var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var jwt = require('jwt-simple');
var mandrill = require('./node_modules/mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('2HmLD1XMdKtb4epIEGPjhA');


// leads@jab101.com
// " + req.body.step1 + "<br>" + req.body.step2 + "<br>" + req.body.step3 + "<br>" + req.body.step4 + "<br>" + req.body.step5 + "<br>" + req.body.step6 + "<br>",
		"text": "Un nouveau prospect",

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
	return res.send(200, decoded);
});

app.post('/postDiagnostic', function(req,res){
	var async = false;
	var ip_pool = "Main Pool";
	var send_at = "example send_at";
	console.log(req);
	var message = {
		"html": "Hello Jab !<br>Vous avez reçu un nouveau lead.<br><br>\
		Son identité : " + req.body.fname + " " + req.body.lname + "<br>\
		Son numéro de téléphone: " + req.body.phone + "<br>\
		Son adresse email: " + req.body.email + "<br>\
		Son secteur d\'activité: " + req.body.sector + "<br>\
		Son entreprise: " + req.body.company + "\
		<br><br>Voici son questionnaire finalisé : <br><br>\",
		
		"subject": "Un nouveau prospect pour EDR",
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
	    res.send(200);
	}, function(e) {
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	    res.send(404, e);
	});
});

app.get('/*', function(request, response) {
  response.sendFile(__dirname + '/app/dist/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

