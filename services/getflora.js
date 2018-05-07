var MAIN = require('../main');

var mongo = require('mongodb');
var express = require('express');
var router = express.Router();

router.post('/getflora', function(req, res, next) {
	var uid = req.body.uid;
	var token = req.body.token;
	var msg = req.body.msg;
	console.log("GetFLORA");
	
	MAIN.sendMsg(uid, token, msg);
	
	res.json(createExample());
});

var createExample = function() {
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
      let sections = [];
      sections.push(form);

      return res = { success:true, json: { sections:sections } };

module.exports = router;