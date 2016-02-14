var local=require("../config/passportStrategy");
var controller = require('../controllers/controllers');

module.exports=function(app,passport){
    passport.use(local);
    app.get('/login',function(req,res){
        res.sendFile(process.cwd() + '/public/loginView.html');
    })
    app.post('/testCredentials',
                passport.authenticate('local', 
                {failureRedirect:'/login', successRedirect : '/setView'}
            ))
    app.get('/setView',function(req,res){
        if(req.session.passport.user.user_role_id === '0')
            res.redirect('/adminView');
        else
            res.redirect('/evaluatorView');
    })        
    
    app.get('/adminView',function(req,res){
        if(req.session.passport){
            if(req.session.passport.user.user_role_id === '0')
                res.sendFile(process.cwd() + '/public/adminView.html');
            else
                res.send("You're not allowed to go here!");
        }
        res.send("You're not allowed to go here!");
    })
    
    app.get('/getUsers',function(req,res){
        controller.getAllUsers(function(err,data){
            if(err) {return err};
            res.json(data);
        });
    })
    
    app.post('/addUser',function(req,res){
        controller.addUser(req.body, function(err,data){
            if(err) throw err;
            res.send(data);
        });
    })
    app.post('/deleteUser',function(req,res){
        controller.deleteUser(req.body, function(err,data){
            if(err) throw err;
            res.send(data);
        });
    })
}