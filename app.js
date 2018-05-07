var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
//var socket = require('socket.io');
var http = require('http');
var mongoose = require('mongoose');
var app = express();
require('./global');
var endpoint = require('./endpoints');
  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/myapp',function(){
  console.log('MongoDB Connected!!!!');
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(function(req,res,next){
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
res.header("Access-Control-Max-Age", 30 * 60);
next();
});



app.use('/',endpoint);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//server = http.createServer(app).listen(3000);

var server = app.listen(3000,function(){
  console.log("Running Successfully on port 3000");

});

//global.io = socket(server);


/** io.on('connection',function(socket){
     console.log('Connection made with socket with id',socket.id);

 socket.on('emitted',function(data){
 	console.log(data);
 	io.sockets.emit('emitted','coming from database');
 });

 io.sockets.emit('pas','balle balle shaba shaba');


 });
**/
module.exports.app = app;
//module.exports.io = io;
