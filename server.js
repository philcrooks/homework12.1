var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var FilmApi = require('./api/film_api');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(express.static('client/build'));
app.use(bodyParser.json());

var server = app.listen(3000, function () {
  new FilmApi(app);

  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});
