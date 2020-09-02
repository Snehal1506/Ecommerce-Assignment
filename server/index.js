var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
var config = require('./config/database')
var bodyParser = require('body-parser')
var session = require('express-session');
var expressValidator = require('express-validator');
var fileUpload = require('express-fileupload');

//CONNECT TO DB
mongoose.connect(config.database);
const con = mongoose.connection
con.on('error', console.error.bind(console, 'connection error'));
con.once('open', function(){
	console.log('Connected to MongoDB');
});


//INIT APP
var app = express();

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Express fileUpload middleware
app.use(fileUpload());

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
app.use(expressValidator({
    customValidators: {
        isImage: function (value, filename) {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                case '':
                    return '.jpg';
                default:
                    return false;
            }
        }
    }
}));

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
var adminProducts = require('./controllers/admin_products.js');


app.use('/admin/categories',adminCategories);
app.use('/admin/products',adminProducts);


//Start the server
var port = 3000;
app.listen(port, function() {
    console.log('Server started on port '+ port)
});