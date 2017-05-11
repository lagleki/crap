//livla bot
var fs = require("fs"),path = require("path-extra");
var request = require("request");
var url = 'https://dev.tatoeba.org/por/tags/add_tag_post';
var headers = { 
    'authority': 'tatoeba.org',
    'method' : 'POST' ,
    'path' : '/por/tags/add_tag_post',
    'scheme' : 'https',
    'accept' : '*/*',
    'content-type' : 'application/x-www-form-urlencoded; charset=UTF-8',
    'cookie' : 'CAKEPHP=fue37dqmatbf8m6q3ulo2n95q6; CakeCookie[interfaceLanguage]=por; CakeCookie[interfaceLanguage]=por; CakeCookie[User]=username%7Cgleki%2Cpassword%7Cd7753445982bc2db494987cd5216ab16; CakeCookie[contribute_lang]=spa; CakeCookie[User]=username%7Ccorpus_maintainer%2Cpassword%7Cdc59e60a5353bf329d0c961185055226',
    'DNT' : '1',
    'origin' : 'https://dev.tatoeba.org',
    'referer' : 'https://dev.tatoeba.org/eng/sentences/show/397666'
};
var form = {
	'_method':'POST',
	'data[Tag][tag_name]':'testyou',
	'data[Tag][sentence_id]':'397666'
};

request.post({ url: url, form: form, headers: headers }, function (e, r, body) {
    // your callback body
    console.log(body);
});
