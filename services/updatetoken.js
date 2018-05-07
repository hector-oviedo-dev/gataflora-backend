var MAIN = require('../main');

var mongo = require('mongodb');
var express = require('express');
var router = express.Router();


router.post('/updatetoken', function(req, res, next) {
	var uid = req.body.uid;
	var token = req.body.token;
	
	var sample = MAIN.getExample();
	
	if (!uid || uid == "undefined" || uid == "null" || uid == ""
	|| !token || token == "undefined" || token == "null" || token == "") {
		res.json({"success":"error","errorMessage":"Error Invalid Data"});
	} else {
		var db = MAIN.getDB();
		var users = db.collection("users");
		users.findOne({'UID':uid}, function (err, duplicateResult) {
			if (err) res.json({"success":"error","errorMessage":"Error: " +  err});
			else {
				if (duplicateResult) {
					duplicateResult.TOKEN = token;
					users.save(duplicateResult);
					console.log("TOKEN UPDATED",token)
					
					res.json(sample);
					
				} else {
					var data = {
						"uid":uid,
						"token":token
					}
					users.insertOne(data, function (err, response) {
						if (err) res.json({"success":"error","errorMessage":"Error Adding: " + err});
						else res.json(sample);
					});
				}
			}
		});
	}
});

module.exports = router;