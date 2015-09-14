var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/app/dist'));
app.use(express.static(__dirname + '/app/dist/assets'));
app.use(express.static(__dirname + '/app/dist/style'));


app.get('/*', function(request, response) {
  response.sendFile(__dirname + '/app/dist/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


