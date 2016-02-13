var user = require('./userModel.js');

var getAllUsers = function(done){
    user.find({},function(err,data){
        if(err) {return done(err,null)};
        return done(null,data)
    })
}

var userGTW = {
    getAllUsers : getAllUsers
}

module.exports = userGTW;