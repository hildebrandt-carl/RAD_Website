var http = require("http");
var url = require("url");
var ejs = require('ejs');
var fs = require("fs");
var formidable = require("formidable");
var util = require('util');
var s = require("net").Socket();
var serverip = '160.119.248.28';
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


var nummesg = 900;
var numusers = 9000;
var vr = "0";
var web = "0";
var con = "0";
//&#10004;	
s.on('data', function(d){
	console.log(d.toString());
	console.log(String(d).substring(4,1));
	console.log(String(d).substring(3,4));
	console.log(String(d).substring(4,5));
	if(String(d).substring(0,3) == "ack"){
		console.log(d.toString());
	}
	else if(String(d).substring(0,3) == "meg"){
		nummesg = parseInt(String(d).substring(3,4), 10);
	}
	else if(String(d).substring(0,3) == "usr"){
		numusers = parseInt(String(d).substring(3,4), 10);
	}
	else if(String(d).substring(0,3) == "vrb"){
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
	else
	{
		console.log("error in received message " + d);
	}	
});

var server = http.createServer(function(req, resp) {
	/*
	var nummesg = 0;
	var numusers = 9000;
	var vr = 0;
	var web = 0;
	var con = 0;
	var timeonline = 1:16:10;
	*/
    var uri = url.parse(req.url).pathname;
    console.log(req.url);
	console.log(req.method);
	//RootHTML page
	if(uri === "/"){
		
		fs.readFile("./Format.html", 'utf-8', function (error, pgResp) {
            console.log("currently in function Root");
            if (error) {
                resp.writeHead(404);
                resp.write('Contents you are looking are Not Found');
            }
            else {
                //console.log("currently printing Root " + nummesg);
                resp.writeHead(200, { 'Content-Type': 'text/html' });
				//console.log("Wrote Head " + nummesg);
				var renderedHtml = ejs.render(pgResp, {nummesg: nummesg, numusers: numusers, vr: vr, web: web, con: con});
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
        console.log("interesting, second else: " + uri);
	    resp.end();
	};
	
	if (req.method.toLowerCase() == 'post') {
		console.log("posting up");
        processdrum(req, resp);
    }	
});

function processdrum(req, resp) {
    //Store the data from the fields in your data store.
    //The data store could be a file or database or any other store based
    //on your application.
	console.log("Individual Fields");
    var fields = [];
    var form = new formidable.IncomingForm();
    form.on('field', function (field, value) {
        console.log(field);
		console.log(value);
		if(value === "Bass") {
			console.log("Received Value");
			s.write("a");
			//testing = testing+1;
		}
		else if(value === "Floor Tom") {
			console.log("Received Value2");
			s.write("b");
			//testing = testing+1;
		}
		else if(value === "Low Tom") {
			console.log("Received Value3");
			s.write("c");
			//testing = testing+1;
		}
		else if(value === "Hi Tom") {
			console.log("Received Value4");
			s.write("d");
			//testing = testing+1;
		}
		else if(value === "Snare") {
			console.log("Received Value5");
			s.write("e");
			//testing = testing+1;
		}
		else if(value === "Hi Hat") {
			console.log("Received Value6");
			s.write("f");
			//testing = testing+1;
		}
		else if(value === "Cymbal") {
			console.log("Received Value7");
			s.write("g");
			//testing = testing+1;
		}
		else if(value === "Simple Beat") {
			console.log("Received Value8");
			s.write("h");
			//testing = testing+1;
		}
		else if(value === "Complex Beat") {
			console.log("Received Value9");
			s.write("i");
			//testing = testing+1;
		}
        fields[field] = value;
    });
    form.parse(req);
}
server.listen(4343);
console.log("Server is listening");
