var MAIN = require('../main');

var mongo = require('mongodb');
var express = require('express');
var router = express.Router();

router.post('/sendnotification', function(req, res, next) {
	var uid = req.body.uid;
	var token = req.body.token;
	var msg = req.body.msg;
	console.log("SENDING",req.body.uid);
	res.json({"SENDING":uid});
	
	MAIN.sendMsg(uid, token, msg);
});

module.exports = router;