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
		var err = "Err: UID: " + uid + " TOKEN: " + token;
		console.log(err);
		res.json(MAIN.getError(err));
	} else {
		var db = MAIN.getDB();
		var users = db.collection("users");
		users.findOne({'uid':uid}, function (err, duplicateResult) {
			if (err) res.json(MAIN.getError(err));
			else {
				if (duplicateResult) {
					duplicateResult.token = token;
					users.save(duplicateResult);
					console.log("TOKEN UPDATED",token)
					
					res.json(sample);
				} else {
					var data = {
						"uid":uid,
						"token":token
					}
					users.insertOne(data, function (err, response) {
						if (err) {
							console.log("Err:",err);
							res.json(MAIN.getError(err));
						} else {
							console.log("TOKEN ADDED");
							res.json(sample);
						}
					});
				}
			}
		});
	}
});

module.exports = router;