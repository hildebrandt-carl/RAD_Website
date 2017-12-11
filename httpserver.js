var http = require("http");
var url = require("url");
var ejs = require('ejs');
var fs = require("fs");
var formidable = require("formidable");
var util = require('util');
var s = require("net").Socket();
var serverip = '160.119.248.28';
//var serverip = '127.0.0.1' ;
var serverport = 4242;

try{
	console.log("trying connection");
	s.connect(serverport, serverip);
	s.write("web");
}
catch(err){
	console.log("failed connection");
	resp.writeHead(420);
    resp.write('Failed Connection');
}


var nummesg = 10;
var numusers = 3;
var vrb = "0";
var web = "0";
var con = "0";
var tim  = "12:12:12";
//&#10004;	

var server = http.createServer(function(req, resp) 
{
    var uri = url.parse(req.url).pathname;
    console.log("URL Being connected with: " + req.url);
	console.log("HTML Page: " + req.method);
	//RootHTML page
	if(uri === "/"){
		
		fs.readFile("./Format.html", 'utf-8', function (error, pgResp) {
            console.log("currently in function Root, pulling Home Page");
            if (error) {
                resp.writeHead(404);
                resp.write('Contents you are looking are Not Found');
            }
            else {
                resp.writeHead(200, { 'Content-Type': 'text/html' });
				var renderedHtml = ejs.render(pgResp, {nummesg: nummesg, numusers: numusers, vrb: vrb, web: web, con: con, tim: tim});
			    resp.write(renderedHtml);	
            }
            resp.end();
        });
	} 
	else if(uri === "/Drum") {//FormHTML, for testing
        fs.readFile("./FormatDrum.html", 'utf-8', function (error, pgResp) {
            console.log("currently in function Root");
            if (error) {
                resp.writeHead(404);
                resp.write('Contents you are looking are Not Found');
            }
            else {
                console.log("currently printing Root " + nummesg);
                resp.writeHead(200, { 'Content-Type': 'text/html' });
				console.log("Wrote Head " + nummesg);
				var renderedHtml = ejs.render(pgResp, {nummesg: nummesg});
			    resp.write(renderedHtml);	
            }
            resp.end();
        });
    } 
	else if (uri === "/test") {//TestHTML, for testing
        fs.readFile("./testing.html", function (error, pgResp) {
            console.log("currently in function Testing");
            if (error) {
                resp.writeHead(404);
                resp.write('Contents you are looking are Not Found');
            }
            else {
                console.log("currently else or printing Testing");
                resp.writeHead(200, { 'Content-Type': 'text/html' });
				resp.write(pgResp);
            }
            resp.end();
        });
    } 
	else {
        console.log("Unknown Page: " + uri);
		resp.writeHead(404);
		resp.write('Contents you are looking are Not Found');
	    resp.end();
	};
	
	if (req.method.toLowerCase() == 'post') {
		console.log("HTML Page is Posting");
        processdrum(req, resp);
    }	
});
server.listen(4343);
console.log("Server is listening");

s.on('data', function(d)
{
	console.log("Received Message From HTML Page: " + d.toString());
	if(String(d).substring(0,3) == "ack"){
		console.log(d.toString());
	}
	else if(String(d).substring(0,3) == "meg"){
		nummesg = parseInt(String(d).substring(3), 10);
	}
	else if(String(d).substring(0,3) == "usr"){
		numusers = parseInt(String(d).substring(3), 10);
	}
	else if(String(d).substring(0,3) == "tim"){
		tim = String(d).substring(3);
	}
	//Connections
	if(String(d).substring(0,3) == "web"&& String(d).substring(4,7) == "vrb" && String(d).substring(8,11) == "con"){
		if(parseInt(String(d).substring(3,4), 10) == 1){
		web = "1";
		}
		else if(parseInt(String(d).substring(3,4), 10) == 0){
		web = "0";
		}
		if(parseInt(String(d).substring(7,8), 10) == 1){
		vr = "1";
		}
		else if(parseInt(String(d).substring(7,8), 10) == 0){
		vr = "0";
		}
		if(parseInt(String(d).substring(11,12), 10) == 1){
		con = "1";
		}
		else if(parseInt(String(d).substring(11,12), 10) == 0){
		con = "0";
		}
	}
	
	if(String(d).substring(0,3) == "vrb"){
		if(parseInt(String(d).substring(3,4), 10) == 1){
		vr = "1";
		}
		else if(parseInt(String(d).substring(3,4), 10) == 0){
		vr = "0";
		}
	}
	else if(String(d).substring(0,3) == "web"){
		if(parseInt(String(d).substring(3,4), 10) == 1){
		web = "1";
		}
		else if(parseInt(String(d).substring(3,4), 10) == 0){
		web = "0";
		}
	}
	else if(String(d).substring(0,3) == "con"){
		if(parseInt(String(d).substring(3,4), 10) == 1){
		con = "1";
		}
		else if(parseInt(String(d).substring(3,4), 10) == 0){
		con = "0";
		}
	}	
});

function processdrum(req, resp) 
{
    //Store the data from the fields in your data store.
    //The data store could be a file or database or any other store based
    //on your application.
	console.log("Website Input Received");
    var fields = [];
    var form = new formidable.IncomingForm();
    form.on('field', function (field, value) {
        console.log("Which Drum: " + field);
		console.log("Value of Drum: " + value);
		output = 'x'
		switch(String(value))
		{
			case 'Bass':
				output = 'a' ;
			break;
			case 'Floor Tom':
				output = 'b' ;
			break;
			case 'Low Tom':
				output = 'c' ;
			break;
			case 'Hi Tom':
				output = 'd' ;
			break;
			case 'Snare':
				output = 'e' ;
			break;
			case 'Hi Hat':
				output = 'f' ;
			break;
			case 'Cymbal':
				output = 'g' ;
			break;
			break;
			case 'Simple Beat':
				output = 'w' ;
			break;
			case 'Complex Beat':
				output = 'x' ;
			break;
			case 'Full Song':
			output = 'y' ;
			break;
			case 'Annoy Grad Students':
				output = 'abcdefg' ;
			break;
			case 'Stop':
				output = 'z' ;
			break;
			default:
				output = 'x' ;
			break;
		}

		try{
			s.write(output)
		}
		catch(err){
			console.log("Unable to send message to the webserver");
		}

		fields[field] = value;
    });
    form.parse(req);
}