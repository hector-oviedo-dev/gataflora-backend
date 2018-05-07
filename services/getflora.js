var MAIN = require('../main');

var mongo = require('mongodb');
var express = require('express');
var router = express.Router();

router.post('/getflora', function(req, res, next) {
	console.log("GetFLORA");
	
	var response = MAIN.getExample();
	
	res.json(response);
});

module.exports = router;