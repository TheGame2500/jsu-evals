module.exports =  userGTW ;

var user = require('./userModel.js');

var userGTW = {
    getAllUsers : getAllUsers
}
var getAllUsers = function(done){
    user.find({},function(err,data){
        if(err) {return done(err,null)};
        return done(null,data)
    })
}