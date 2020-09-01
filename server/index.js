var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
var config = require('./config/database')
var bodyParser = require('body-parser')
var session = require('express-session');
var expressValidator = require('express-validator');

//CONNECT TO DB
mongoose.connect(config.database);
const con = mongoose.connection
con.on ('open', function(){
    console.log('COnnected yo mongoDb!!!!')
})


//INIT APP
var app = express();

// Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());


// Express Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
	//cookie: { secure: true }
}));

//Express Validator middleware
// app.use(expressValidator({
//     errorFormatter: function (param, msg, value) {
//         var namespace = param.split('.')
//                 , root = namespace.shift()
//                 , formParam = root;

//         while (namespace.length) {
//             formParam += '[' + namespace.shift() + ']';
//         }
//         return {
//             param: formParam,
//             msg: msg,
//             value: value
//         };
//     }
// }));

// Express Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// var fileupload = require('express-fileupload');
// app.use(fileupload());

// app.post("/upload",function(req,res,next){
//     // console.log(req.files)
//     const file = req.files.photo;
//     file.mv("./uploads/" + file.name, function(err, result){
//         if(err)
//             throw err;
    
//         res.send({
//              success: true,
//              message: "image uploaded!"
//     });
//  });

// })



//SET ROUTES

var adminCategories = require('./controllers/admin_categories.js');

app.use('/admin/categories',adminCategories);




var port = 5000;
app.listen(port, function() {
    console.log('Server started on port '+ port)
});