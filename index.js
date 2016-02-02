var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/call', twilio.webhook(config.TWILIO_AUTH_TOKEN), function(request, response) {
  if ("RecordingUrl" in request && request.RecordingUrl != "") {
    console.log(request.RecordingUrl)
    var twiml = new twilio.TwimlResponse();
    response.send(twiml)
  } else {
    var twiml = new twilio.TwimlResponse();
    twiml.say('Welcome to Twilio!');
    twiml.record({ 
      playBeep : false,
    });
    console.log(twiml.toString());
    response.send(twiml);
  }
});

var server = app.listen(80, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Q Call Server app listening at http://%s:%s', host, port);

  var twiml = new twilio.TwimlResponse();
  twiml.say('Welcome to Twilio!');
  twiml.record({ 
    playBeep : false,
  });
  console.log(twiml.toString());

}).on('error', function(err) {
  console.error('Cannot serve on port 80 without root privileges:');
  console.error('sudo node index.js');
});
