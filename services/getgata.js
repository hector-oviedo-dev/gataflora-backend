var MAIN = require('../main');

var mongo = require('mongodb');
var express = require('express');
var router = express.Router();

router.post('/getgata', function(req, res, next) {
	console.log("GetGATA");
	
	var response = MAIN.getExample2();
	
	res.json(response);
});

module.exports = router;