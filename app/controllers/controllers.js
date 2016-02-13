var userGTW = require('../models/user/userGTW.js');
var controllers = {
    getAllUsers : function(done){
        userGTW.getAllUsers(done);
    }
};

module.exports=controllers;