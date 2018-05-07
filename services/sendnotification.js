var MAIN = require('../main');

var mongo = require('mongodb');
var express = require('express');
var router = express.Router();

router.post('/sendnotification', function(req, res, next) {
	var token = req.body.token;
	var msg = req.body.msg;
	
	console.log(req.body)
	
	if (!msg || msg == "undefined" || msg == "null" || msg == ""
	|| !token || token == "undefined" || token == "null" || token == "") {
		var err = "Err: msg: " + msg + " token: " + token;
		console.log(err);
		res.json(MAIN.getError(err));
	} else MAIN.sendMsg(token, msg, res);
});

module.exports = router;