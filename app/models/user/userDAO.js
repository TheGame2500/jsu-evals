module.exports =  userDAO ;

var user = require('./userModel.js');

var userDAO = {
    getById : getById,
    addUser : addUser,
    deleteUserById : deleteUserById
}

var getById = function(id,done){
    user.findOne({_id : id},function(err,user){
        if(err) {return done(err)};
        return done(null,user);
    })
}

var addUser = function(username,password,role,done){
    user.create({user_name : username, user_password:password,user_role_id:role},function(err,user){
        if(err) {return done(err)};
        return done(null,user);
    })
}

var deleteUserById = function (id,done){
    user.remove({_id : id},function(err){
        if(err) {return done(err)};
        return done(null);
    })
}

