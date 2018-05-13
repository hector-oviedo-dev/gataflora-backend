var admin = require("firebase-admin");

var db;

var getDB = function() {
	return db;
}
var setDB = function(data) {
	db = data;
}

var sendMsg = function(registrationToken, msg, res) {
	var notification = {
			"sound":"default",
			"token":registrationToken,
			"msg":msg,
			"TIME":new Date()
		}
		db.collection("notifications").insertOne(notification, function (err, response) {
			if (err){
				console.log("Error Adding: " + err);
				res.json(getError(err))
			} else sendToSingle(db, response.token, response.msg, res);
		});
};
var sendToSingle = function(db, registrationToken, msg, res) {
	var message = {
		notification: {
		  title: "Flora",
		  body: msg
	  },
	  token: registrationToken
	};
	
	console.log("trying to send notification token:",registrationToken,"msg:",msg);
	
	try {
		admin.messaging().send(message)
		  .then((response) => {
			// Response is a message ID string.
			console.log('MESSAGE SENT TOKEN:',registrationToken);
			res.json(getError('MESSAGE SENT TOKEN: ' + registrationToken))
		  })
		  .catch((error) => {
			console.log('ERROR TOKEN:',registrationToken,'Firebase (possible disconnected)');
			res.json(getError('ERROR TOKEN:' + registrationToken + 'Firebase (possible disconnected)'));
		  });
		  
	} catch (e) {
		console.log('ERROR on send notification', e);
		res.json(getError(e));
	}
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
        action:"getflora",
        label_submit:"Aceptar"
      }
      };
	  
      var sections = [];
      sections.push(form);

      var res = { success:true, json: { sections:sections } };
	  
	  return res;
}
var getExample2 = function() {
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
           "label":"GetGata"
         },
         {
           "type":"TEXT",
           "align":"CENTER",
           "label":"Volver a GetFlora"
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
      ],
      display: {
        action:"getflora",
        label_submit:"Aceptar"
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
          "id":"SCAN_CODE",
          "type":"QR",
          "value":"",
          "required":true,
          "txt_required":"Debe scanear un QR valido.",
          "max":15,
          "min":5,
          "label":"Flora QR",
		  "btn_label":"Iniciar Scan de QR",
          "placeholder":"Inicie el scan"
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
        action:"getgata",
        label_submit:"Aceptar"
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
	getExample2:getExample2,
	getError:getError
}