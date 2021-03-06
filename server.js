var port = process.env.PORT || 8080;

//require libs
//var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongo = require('mongodb');
var admin = require("firebase-admin");
var app = express();

var bodyParser = require('body-parser')

//HEROKU parche
app.use(express.static(__dirname + '/public'));

var MAIN = require('./main');

//FIREBASE
var serviceAccount = require('./flora-fe583-firebase-adminsdk-4simn-9954af01f6.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'flora-fe583.firebaseio.com'
});

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
	
	//send notification
	var sendNotification = require('./services/sendnotification');
	app.use('/', sendNotification);
	
	//get FLORA
	var getFlora = require('./services/getflora');
	app.use('/', getFlora);
	
	//get GATA
	var getGata = require('./services/getgata');
	app.use('/', getGata);
	
	//get WIDGET
	var getWidget = require('./services/getwidget');
	app.use('/', getWidget);
	
	//get WIDGET 2
	var getWidgetTwo = require('./services/getwidgettwo');
	app.use('/', getWidgetTwo);
	
	//INDEX
	app.get('/', function(request, response) {
	  response.send('GATA FLORA: Si se la ponen, GRITA, si se la sacan, LLORA');
	});
	
	//start HTTP server
	//http.createServer(app).listen(port, function() { console.log('Server HTTP Started at port ' + port); });
	app.listen(port, function() { console.log('Server EXPRESS Started at port ' + port) });
}

//MONGO
const MongoClient = mongo.MongoClient;
const MongoURL = 'mongodb://admin:123@ds215910.mlab.com:15910/flora';
db = MongoClient.connect(MongoURL, function(err, tmp) {
	if (err) console.log("error MONGO CONNECTION: " + err);
	else init(tmp);
});