var MAIN = require('../main');

var mongo = require('mongodb');
var express = require('express');
var router = express.Router();

router.post('/getwidget', function(req, res, next) {
	console.log("GetGATA");
	
	var response = { success:true, json: MAIN.getWidgetOne() };
	res.json(response);
});

module.exports = router;