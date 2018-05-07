var MAIN = require('../main');

var mongo = require('mongodb');
var express = require('express');
var router = express.Router();

router.post('/sendnotification', function(req, res, next) {
	var uid = req.body.uid;
	var token = req.body.token;
	var msg = req.body.msg;
	
	MAIN.sendMsg(uid, token, msg);
	
	var response = MAIN.getExample();
	
	res.json(response);
	
	console.log("sendnotification:", req.body.uid);
});

module.exports = router;