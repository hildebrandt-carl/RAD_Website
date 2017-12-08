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


var testing = 30;

s.on('data', function(d){
	
	if(d.toString() == "ack"){
		console.log(d.toString());
	}
	else{
	testing = d.parseInt();
	}
});

var server = http.createServer(function(req, resp) {
	
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
                console.log("currently printing Root " + testing);
                resp.writeHead(200, { 'Content-Type': 'text/html' });
				console.log("Wrote Head " + testing);
				var renderedHtml = ejs.render(pgResp, {testing: testing});
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
                console.log("currently printing Root " + testing);
                resp.writeHead(200, { 'Content-Type': 'text/html' });
				console.log("Wrote Head " + testing);
				var renderedHtml = ejs.render(pgResp, {testing: testing});
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
