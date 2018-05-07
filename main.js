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
	try {
	admin.messaging().send(message)
	  .then((response) => {
		// Response is a message ID string.
		console.log('MESSAGE SENT TOKEN:',token);
	  })
	  .catch((error) => {
		console.log('ERROR TOKEN:',token,'Firebase (this UID is possible disconnected)');
	  });
	} catch (e) { console.log('ERROR on send notification'); }
}

var getError = function(msg) {
	var form = {
       type:"form",
       controls: [
         {
           "type":"IMAGE",
           "source":"http://www.catster.com/wp-content/uploads/2017/12/A-kitten-meowing.jpg",
           "orientation":"left",
           "width":"150",
           "height":"100",
           "label":"Gata Flora",
           "description":"Se la ponen: GRITA, Se la sacan: LLORA",
           "link_type":"LINK",
           "link":"http://www.catster.com/wp-content/uploads/2017/12/A-kitten-meowing.jpg",
           "section":""
         },
         {
           "type":"TITLE",
           "align":"CENTER",
           "label":"ERROR"
         },
         {
           "type":"TEXT",
           "align":"CENTER",
           "label":msg
         }
      ],
      display: {
        action:"postNewData",
        label_submit:"Agregar",
        label_cancel:"Cerrar"
      }
      };
	  
      var sections = [];
      sections.push(form);

      var res = { success:true, json: { sections:sections } };
	  
	  return res;
}
var getExample = function() {
	var form = {
       type:"form",
       controls: [
         {
           "type":"IMAGE",
           "source":"http://www.catster.com/wp-content/uploads/2017/12/A-kitten-meowing.jpg",
           "orientation":"left",
           "width":"150",
           "height":"100",
           "label":"Gata Flora",
           "description":"Se la ponen: GRITA, Se la sacan: LLORA",
           "link_type":"LINK",
           "link":"http://www.catster.com/wp-content/uploads/2017/12/A-kitten-meowing.jpg",
           "section":""
         },
         {
           "type":"BUTTON",
           "label":"Gata Flora",
           "link_type":"LINK",
           "link":"http://www.catster.com/wp-content/uploads/2017/12/A-kitten-meowing.jpg",
           "section":""
         },
         {
           "type":"TITLE",
           "align":"CENTER",
           "label":"YO HOMIE"
         },
         {
           "type":"TEXT",
           "align":"CENTER",
           "label":"Isnt that my briefcase?"
         },
         {
          "id":"DESC",
          "type":"TEXTAREA",
          "value":"",
          "enabled":true,
          "required":true,
          "txt_required":"Debe ingresar una descripcion.",
          "max":255,
          "min":5,
          "label":"Descripcion",
          "placeholder":"Ingrese la Descripcion"
        },
         {
          "id":"NAME",
          "type":"INPUT",
          "value":"",
          "input_type":"TEXT",
          "hidden":false,
          "enabled":true,
          "required":true,
          "txt_required":"Debe ingresar su nombre.",
          "max":15,
          "min":5,
          "label":"Nombre",
          "placeholder":"Ingrese su Nombre"
        },
        {
          "id":"EMAIL_ALERT",
          "type":"CHECKBOX",
          "value":true,
          "enabled":true,
          "required":false,
          "label":"Avisar por E-mail",
          "check":true
        },
        {
          "id":"PROVINCIA",
          "type":"CHECKBOXLIST",
          "enabled":true,
          "required":false,
          "txt_required":"Este campo es obligatorio",
          "label":"Seleccionar Provincias",
          "min":1,
          "max":2,
          "servicio":"",
          "values":[
            {
              "label":"Formosa",
              "value":"formosa",
              "check":false
            },
            {
              "label":"Buenos Aires",
              "value":"bsas",
              "check":false
            },
            {
              "label":"Santa Fe",
              "value":"santafe",
              "check":false
            }
          ]
        },
        {
          "id":"PROVINCIA_2",
          "type":"RADIO",
          "enabled":true,
          "required":false,
          "txt_required":"Este campo es obligatorio",
          "label":"Seleccionar Provincia Actual",
          "values":[
            {
              "label":"Formosa",
              "value":"formosa",
              "check":false
            },
            {
              "label":"Buenos Aires",
              "value":"bsas",
              "check":false
            },
            {
              "label":"Santa Fe",
              "value":"santafe",
              "check":false
            }
          ]
        },
        {
          "id":"PROVINCIA_3",
          "type":"SELECT",
          "enabled":true,
          "required":false,
          "txt_required":"Este campo es obligatorio",
          "label":"Seleccionar Provincia",
          "placeholder":"Provincia",
          "values":[
            {
              "label":"Formosa",
              "value":"formosa",
              "check":false
            },
            {
              "label":"Buenos Aires",
              "value":"bsas",
              "check":false
            },
            {
              "label":"Santa Fe",
              "value":"santafe",
              "check":false
            }
          ]
        },
      ],
      display: {
        action:"postNewData",
        label_submit:"Agregar",
        label_cancel:"Cerrar"
      }
      };
	  
      var sections = [];
      sections.push(form);

      var res = { success:true, json: { sections:sections } };
	  
	  return res;
}


//exports
module.exports = {
	getDB:getDB,
	setDB:setDB,
	sendMsg:sendMsg,
	getExample:getExample,
	getError:getError
}