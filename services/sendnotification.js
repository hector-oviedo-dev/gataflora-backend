var MAIN = require('../main');

var mongo = require('mongodb');
var express = require('express');
var router = express.Router();

router.post('/sendnotification', function(req, res, next) {
	var uid = req.body.uid;
	var token = req.body.token;
	var msg = req.body.msg;
	
	MAIN.sendMsg(uid, token, msg);
	
	res.json({"message":"trying to send notification","uid":uid,"token":token,"msg":msg});
});

module.exports = router;