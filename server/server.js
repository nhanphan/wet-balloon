var express = require('express');
var http = require('http');
var https = require('https');
var helmet = require('helmet');
var io = require('socket.io');
var shortid = require('shortid');

var db = require('./lib/db');

var app = express();

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(helmet.xssFilter());
app.use(helmet.xframe());
app.use(helmet.hidePoweredBy());
app.use(helmet.ienoopen());
app.use(helmet.nosniff());

app.use(express.static(__dirname + '/../public'));

app.get('/new', function(req, res, next){
  var id = shortid.generate();

  // db.save(id, socket);

  res.render('new', {id: id});
});

app.get('/session/:id', function(req, res, next){
  var id = req.params.id;
  res.render('balloon', {id: id});
});

app.get('/session/:id/control', function(req, res, next){
  var id = req.params.id;
  res.render('new', {id:id});
});


var server = http.createServer(app);

var ioServer = io(server);
ioServer.on('connection', function(socket){

  console.log('connect');

  socket.on('instruction', function(instruction){
    console.log('instruction', instruction);
    var id = instruction.id;
    socket.to(id).emit('instruction', instruction);
  });

  socket.on('join', function(id){
    console.log('joining ' + id);
    socket.join(id);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(port, ip, function(){
  console.log('Listening on 3000');
});
