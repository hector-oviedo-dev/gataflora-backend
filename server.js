var port = process.env.app_port || process.env.port || 777;
//var socketport = process.env.app_port || 666;

//require libs
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongo = require('mongodb');
var admin = require("firebase-admin");
var app = express();

var MAIN = require('./main');

var socket;
var clients = [];

var configTMP = {
  apiKey: "AIzaSyBtvugBgochyN0v2OTusN2mpvsYJucX8xs",
  authDomain: "flora-fe583.firebaseapp.com",
  databaseURL: "https://flora-fe583.firebaseio.com"
};
/*
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://flora-fe583.firebaseio.com"
});*/
admin.initializeApp(configTMP);

//start the server
var init = function(db) {
	app.use(cors());
	
	MAIN.setDB(db);
	//body parser
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	
	//login
	var updateToken = require('./services/updatetoken');
	app.use('/', updateToken);
	
	//get package
	var sendNotification = require('./services/sendnotification');
	app.use('/', sendNotification);
	
	//start HTTP server
	http.createServer(app).listen(port, function() { console.log('Server HTTPS Started at port ' + port); });
}


const MongoClient = mongo.MongoClient;
const MongoURL = 'mongodb://admin:123@ds215910.mlab.com:15910/flora';
db = MongoClient.connect(MongoURL, function(err, tmp) {
	if (err) console.log("error MONGO CONNECTION: " + err);
	else init(tmp);
});