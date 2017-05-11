"use strict";

//settings
var host = 'tatoeba.org';
//var cookie = 'CakeCookie[interfaceLanguage]=por; CakeCookie[interfaceLanguage]=por; CakeCookie[User]=username%7Cgleki%2Cpassword%7Cd7753445982bc2db494987cd5216ab16; CakeCookie[contribute_lang]=spa; CAKEPHP=3cspfcfd05mc4krlpe96qgig11; CakeCookie[User]=username%7Ccorpus_maintainer%2Cpassword%7Cdc59e60a5353bf329d0c961185055226; CakeCookie[contribute_lang]=por';
var cookie = 'CakeCookie[interfaceLanguage]=por; CakeCookie[User]=username%7CFB%2Cpassword%7C5a0cb3e5f18db5f9baffbe9c9782a0f8; CakeCookie[contribute_lang]=jbo; CAKEPHP=khn6dfov5vte4usa7n74cil5e3; ';

var fs = require("fs"),path = require("path-extra");
var request = require("request");
var co = require('co');


var url = 'https://'+host+'/vocabulary/save';
function add(id,target){
	var headers = { 
		'authority': 'tatoeba.org',
		'method' : 'POST' ,
		'path' : '/vocabulary/save',
		'scheme' : 'https',
		'accept' : 'application/json, text/plain, */*',
		'content-type' : 'application/x-www-form-urlencoded; charset=UTF-8',
		'cookie' : cookie,
		'DNT' : '1',
		'origin' : 'https://'+host,
		'referer' : 'https://'+host+'/por/vocabulary/add'
	};
	var form = {
		"lang": 'jbo',
		"text": id
	};
	request.post({ url: url, form: form, headers: headers }, function (e, r, body) {});
}

function tsvJSON(tsv){
  var t = tsv.replace(/\r/g,'');
  var lines=t.split("\n");
  var result = [];
  var obj = {};
  for(var i=0;i<lines.length;i++){
	  obj[i] = lines[i];
  }
  return obj;
}

var ki = tsvJSON(fs.readFileSync(path.join(__dirname, "import.tsv"),{encoding: 'utf8'}));
function* waitAndDo(times) {
  for(var i in ki) {

    // Sleep
    yield function(callback) {
      setTimeout(callback, 3000);
    }    

    add(ki[i]);
    console.log(i + "///" + JSON.stringify(ki[i]));
  }
}


co(function* () {
  yield waitAndDo(Object.keys(ki).length);//
});