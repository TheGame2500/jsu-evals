var passport = require('passport');
var expressSession = require('express-session');
var routes = require("./routes/routes");
var bodyParser=require('body-parser');
module.exports=function(app){
    passport.serializeUser(function (user, done) {
      done(null, user);
    });
    
    passport.deserializeUser(function (id, done) {
      done(null, id);
    });
    app.use(expressSession({secret: 'mySecretKey', resave: false, saveUninitialized: false}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.urlencoded({ extended: true }));
    routes(app,passport);
}