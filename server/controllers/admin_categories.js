var express = require('express');
var router = express.Router();

//GET CATEGORY MODEL

var Category = require('../models/category');


router.get('/',function(req,res){
	Category.find(function(err,categories){
		if (err) return console.log(err);
		res.send(categories)
	})
})


module.exports = router;