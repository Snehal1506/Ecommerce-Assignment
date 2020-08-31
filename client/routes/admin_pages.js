var express = require('express');
var router = express.Router();
var getPg =require('../controllers/admin_pages.js');

router.get('/', getPg);


// Exports
module.exports = router;