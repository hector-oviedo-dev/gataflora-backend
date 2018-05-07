var MAIN = require('../main');

var mongo = require('mongodb');
var express = require('express');
var router = express.Router();

router.post('/sendnotification', function(req, res, next) {
	var token = req.body.token;
	var msg = req.body.msg;
	
	MAIN.sendMsg(token, msg);
	
	res.json({"message":"trying to send notification","token":token,"msg":msg});
});

module.exports = router;