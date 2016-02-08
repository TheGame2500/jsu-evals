var express = require('express');
var mongoose= require('mongoose');
var routes = require('./app/routes/routes.js');
var app = express();

require('dotenv').load();
mongoose.connect(process.env.MONGO_URI);

// routes(app);

app.use('/public', express.static(process.cwd() + '/public'));

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});