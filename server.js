'use strict';
var express = require('express');
var mongoose= require('mongoose');
var config = require('./app/app.js');
var app = express();

require('dotenv').load();
mongoose.connect(process.env.MONGO_URI);

app.use(express.static('public'));
app.use(express.static('bower_components'));

config(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});