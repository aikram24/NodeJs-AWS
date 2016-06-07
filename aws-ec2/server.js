// Importing Packages
var fs = require('fs');
var express = require('express');
var http = require('http');
var path = require('path');
var aws = require('aws-sdk');
var cookieParser = require('cookie-parser');

var config = require('./private/config/serverconfig.js');

var app = express();
app.locals.title = 'EC2 Instances';
app.locals.email = 'me@aikram.info';


// AWS Cred Setup
var config_path = path.join(__dirname, './private/auth/auth.json');
require('aws-sdk').config.loadFromPath(config_path);

aws.config.update({region: 'us-east-1'});

// aws.config.update({region: 'us-west-2'});


// Setting up node express server
app.listen (config.port, function (err){
	if(err){
		console.log(err);
	} else {
		console.log("Server Sucessfully Started on Port %s", config.port);
	}
});


require('./routes/routes.js')(app);
