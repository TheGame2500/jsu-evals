var local=require("../config/passportStrategy");
var user = require("../models/user.js");

module.exports=function(app,passport){
    passport.use(local);
    app.get('/login',function(req,res){
        res.sendFile(process.cwd() + '/public/loginView.html');
    })
    app.post('/testCredentials',
                passport.authenticate('local', 
                {failureRedirect:'/login', successRedirect : '/adminView'}
            ))
    app.get('/adminView',function(req,res){
        res.sendFile(process.cwd() + '/public/adminView.html');
    })
}