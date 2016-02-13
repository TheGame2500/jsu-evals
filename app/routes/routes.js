var local=require("../config/passportStrategy");
var controller = require('../controllers/controllers');

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
    
    app.get('/getUsers',function(req,res){
        controller.getAllUsers(function(err,data){
            if(err) {return err};
            res.json(data);
        });
    })
    
    app.post('/addUser',function(req,res){
        controller.addUser(req.body);
    })
}