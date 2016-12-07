var express = require('express');
var path = require('path');
var proxy = require('express-http-proxy');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 4200;


app.use('/api', function (req, res, next) {
  console.info('request: ' + req.url);
  return next()
}, proxy(process.env.BACKEND_URL+'/api' || 'http://localhost:8080/api'));


app.use('/',express.static(__dirname+'/dist'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname+'/dist','index.html'))
});


app.listen(port, function () {
  console.log('J316 Organizer Client is running on http://localhost:' + port);
});
