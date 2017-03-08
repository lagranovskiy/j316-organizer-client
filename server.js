var express = require('express');
var path = require('path');
//var proxy = require('express-http-proxy');
var proxy = require('http-proxy-middleware');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 4200;

var backendURL= process.env.BACKEND_URL || 'http://localhost:8080';

app.use('/api', proxy({target: backendURL, changeOrigin: true}));

/*
app.use('/api', function (req, res, next) {
  console.info('request: ' + req.url);
  return next()
}, proxy(process.env.BACKEND_URL+'/api' || 'http://localhost:8080/api'));
*/



// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use('/',express.static(__dirname+'/dist'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname+'/dist','index.html'))
});




app.listen(port, function () {
  console.log('J316 Organizer Client is running on http://localhost:' + port);
});
