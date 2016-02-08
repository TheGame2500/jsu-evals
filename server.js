'use strict';
var express = require('express');
var mongoose= require('mongoose');
var config = require('./app/app.js');
var app = express();
var passport = require('passport');
var expressSession = require('express-session');

require('dotenv').load();
mongoose.connect(process.env.MONGO_URI);


app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/public', express.static(process.cwd() + '/public'));

config(app);



var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});