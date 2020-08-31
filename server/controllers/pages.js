var express = require('express');

let pages = [];

function getPage(req,res){
    res.render('index', {
		title: 'Home'
	});
}

module.exports = getPage;