var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

//Connect to db
mongoose.connect('mongodb://localhost:27017/cmscart');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
	console.log('Connected to Mongodb');
});

//Init app
var app = express();

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set Public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
	res.send('working');
});

//Start the server
var port = 3000;
app.listen(port, function() {
	console.log('Server started on port '+ port)
});