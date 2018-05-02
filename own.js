"use strict";

//config
const adopt = "adopt";
const unadopt = "let_go";
const action = adopt;
var note = ["2113478","2113496"];
var host = 'tatoeba.org';
//FB
var cookie = 'CakeCookie[interfaceLanguage]=por; CakeCookie[User]=username%7CFB%2Cpassword%7C5a0cb3e5f18db5f9baffbe9c9782a0f8; CakeCookie[contribute_lang]=jbo; CAKEPHP=khn6dfov5vte4usa7n74cil5e3; ';
//gleki
//var cookie = 'CakeCookie[interfaceLanguage]=por; CakeCookie[User]=username%7Cgleki%2Cpassword%7Cd7753445982bc2db494987cd5216ab16; CakeCookie[contribute_lang]=jbo; CAKEPHP=97j4p0egh9vqsfbhabpg9j9ff1; ';

var url = 'https://'+host+'/eng/sentences/'+action+'/';

var fs = require("fs"),path = require("path-extra");
var request = require("request");
var co = require('co');

function add(id,target){
	var headers = { 
		'authority': 'tatoeba.org',
		'method' : 'GET' ,
		'path' : '/eng/sentences/'+action+'/'+id,
		'scheme' : 'https',
		'accept' : '*/*',
		//'content-type' : 'application/x-www-form-urlencoded; charset=UTF-8',
		'cookie' : cookie,
		'DNT' : '1',
		'host' : host,
		'referer' : 'https://tatoeba.org/eng/activities/adopt_sentences/jbo'
	};
	var form = {
		//'_method':'GET',
		//"selectLang": 'jbo',
		//"value": target
	};
	request.post({ url: url+id, form: form, headers: headers }, function (e, r, body) {});
}

function tsvJSON(tsv){
  var t = tsv.replace(/\r/g,'');
  var lines=t.split("\n");
  var result = [];
  var obj = {};
  for(var i=0;i<lines.length;i++){
	  var currentline=lines[i].split("\t");
	  obj[currentline[0]] = currentline[1];
  }
  return obj;
}

var ki = note;
function* waitAndDo(times) {
  for(var i in ki) {

    // Sleep
    yield function(callback) {
      setTimeout(callback, 1000);
    }    

    add(ki[i],'');
    console.log(ki[i]);
  }
}


co(function* () {
  yield waitAndDo(Object.keys(ki).length);//
});


//trash
//var cookie = 'CAKEPHP=l59qnjb7o8e3te688uojqbmav1; CakeCookie[interfaceLanguage]=por; CakeCookie[interfaceLanguage]=por; CakeCookie[User]=username%7Ccorpus_maintainer%2Cpassword%7Cdc59e60a5353bf329d0c961185055226; CakeCookie[contribute_lang]=jbo';
