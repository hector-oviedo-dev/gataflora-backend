var admin = require("firebase-admin");

var db;

var getDB = function() {
	return db;
}
var setDB = function(data) {
	db = data;
}

var sendMsg = function(uid, token, msg) {
	var notification = {
			"uid":uid,
			"token":token,
			"msg":msg,
			"TIME":new Date()
		}
		db.collection("notifications").insertOne(notification, function (err, response) {
			if (err) console.log("Error Adding: " + err);
			else {
				sendToSingle(db, token, msg);
			}
		});
};
var sendToSingle = function(db, token, msg) {
	var message = {
	  android: {
		ttl: 60 * 1000,
		priority: 'high',
		notification: {
		  title: "Flora",
		  body: msg,
		  icon: 'stock_ticker_update',
		  color: '#f45342'
		}
	  },
	  token: token
	};
	
	admin.messaging().send(message)
	  .then((response) => {
		// Response is a message ID string.
		console.log('MESSAGE SENT TOKEN:',token);
	  })
	  .catch((error) => {
		console.log('ERROR TOKEN:',token,'Firebase (this UID is possible disconnected)');
	  });
}

//exports
module.exports = {
	getDB:getDB,
	setDB:setDB,
	sendMsg:sendMsg
}