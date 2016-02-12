'use strict';
var express = require('express');
var mongoose= require('mongoose');
var config = require('./app/app.js');
var app = express();

require('dotenv').load();
mongoose.connect(process.env.MONGO_URI);

app.use('/static', express.static(__dirname + '/public'));
config(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});