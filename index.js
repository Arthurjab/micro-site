var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var jwt = require('jwt-simple');
var fs = require('fs');
var mandrill = require('./node_modules/mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('2HmLD1XMdKtb4epIEGPjhA');
var mcapi = require('./node_modules/mailchimp-api/mailchimp');
var mc = new mcapi.Mailchimp('4065696cd2535d9bce60926a5d0d7703-us11');
var csvFile =  fs.readFileSync('./public/listing.csv', 'utf8');

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

app.get('/subscribeToMailchimp/:token', function(req,res){
	var id = '17ad17823a';
	var token = req.params.token;
	var secret = 'ThisIsTheSecretIDontWantUTOKNOW';
	var decoded = jwt.decode(token, secret);
	decoded.from = "ederocquigny.com";

	mc.lists.subscribe({id: id, email:{email:decoded.email}, merge_vars: {FNAME:decoded.fname,LNAME:decoded.lname,COMPANY:decoded.company,SECTOR:decoded.sector,FROM:decoded.from}}, function(data) {
  		var ret = 'User subscribed successfully! Look for the confirmation email.';
  		var payload = req.body;
		var secret = 'ThisIsTheSecretIDontWantUTOKNOW';
 		var token = jwt.encode(payload, secret);
	  	return res.send(200);
		},
		function(error) {
			console.log(error);
		  	return res.send(404, error.code);
	});
});

app.post('/postDiagnostic', function(req,res){
	var async = false;
	var ip_pool = "Main Pool";
	var send_at = "example send_at";

	//prenom,nom,email,telephone,entreprise,q1,q2,q3,q4,q5,q6,q7
	var appendCsv = req.body.lname + ',' + req.body.fname + ',' + req.body.email + ',' + req.body.phone + ',' + req.body.company + ',' + req.body.step1 + ',' + req.body.step2 + ',' + req.body.step3.name + ',' + req.body.step4 + ',' + req.body.step5 + '\n';
	fs.appendFile('./public/listing.csv', appendCsv, function (err) {
	  if (err){
	  	console.log(err);
	  	var errorFromAppend = "une erreur est survenue, contacter Jab";
	  } 
	});
	if (!req.body.contact || req.body.contact == false){
		var message = {
			"html": "Vous avez reçu un nouveau lead.<br><br>\
			Son identité : " + req.body.fname + " " + req.body.lname + "<br>\
			Son numéro de téléphone: " + req.body.phone + "<br>\
			Son adresse email: " + req.body.email + "<br>\
			Son entreprise: " + req.body.company + "\
			<br><br>Voici son questionnaire finalisé : <br><br>\
			Question 1: " + req.body.step1 + "<br>\
			Question 2: " + req.body.step2 + "<br>\
			Question 3: " + req.body.step3.name + "<br>\
			Question 4: " + req.body.step4 + "<br>\
			Question 5: " + req.body.step5 + "<br><br><br>" + req.body.response,
			"subject": "Un nouveau prospect pour EDR",
			"from_email": req.body.email,
			"from_name": req.body.lname + ' ' + req.body.fname,
			"to": [{
			        "email": "contact@aremus-associes.com",
			        "name": "pour pme-bigdata",
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
	}
	else {
		var message = {
			"html": "Hello Jab !<br>Vous avez reçu un nouveau message.<br><br>\
			Son entreprise: " + req.body.company +  "<br>\
			Son message : <br><br>" + req.body.message,
			
			"subject": "Nouveau Message",
			"from_email": "hvillain@student.42.fr",
			"from_name": req.body.email,
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
	}

	mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": ''}, function(result) {
		var payload = req.body;
		var secret = 'ThisIsTheSecretIDontWantUTOKNOW';
 		var token = jwt.encode(payload, secret);
	    res.send(200, {token:token});
	}, function(e) {
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	    res.send(404, e);
	});
});

app.get('/interactions/listing-aremus-questionnaire-x22b', function(request, response) {
  response.download(__dirname + '/public/listing.csv');
});


app.get('/*', function(request, response) {
  response.sendFile(__dirname + '/app/dist/index.html');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

