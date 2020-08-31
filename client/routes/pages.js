var express = require('express');
var getPage =require('../controllers/pages.js');
const router = express.Router();


router.get('/', getPage);

module.exports = router;