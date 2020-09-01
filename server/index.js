var express = require('express');
var path = require('path');

var app = express();


var port = 5000;
app.listen(port, function() {
    console.log('Server started on port '+ port)
});