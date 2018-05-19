var MAIN = require('../main');

var mongo = require('mongodb');
var express = require('express');
var router = express.Router();

router.post('/getwidgettwo', function(req, res, next) {
	console.log("GetGATA");
	
	var response = { success:true, json: MAIN.getWidgetTwo() };
	
	res.json(response);
});

module.exports = router;