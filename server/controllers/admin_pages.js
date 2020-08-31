var express = require('express');

let adminpages = [];

function getPg(req,res){
	res.send('admin area');
}

module.exports = getPg;