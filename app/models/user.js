var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    user_name : String,
    user_password : String,
    user_role_id : String
})
var userModel =  mongoose.model('User',userSchema);



var getById = function(id,done){
    user.model.findOne({_id : id},function(err,user){
        if(err) {return done(err)};
        return done(null,user);
    })
}

var addUser = function(username,password,role,done){
    userModel.create({user_name : username, user_password:password,user_role_id:role},function(err,user){
        if(err) {return done(err)};
        return done(null,user);
    })
}
var user = {
    model : userModel,
    getById : getById,
    addUser : addUser,
    // deleteUserById : deleteUserById
}
module.exports = user;