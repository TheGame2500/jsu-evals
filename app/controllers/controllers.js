var userGTW = require('../models/user/userGTW.js');
var userDAO = require('../models/user/userDAO.js');

var controllers = {
    getAllUsers : function(done){
        userGTW.getAllUsers(done);
    },
    addUser : function (user, done){
        userDAO.addUser(user.user_name,user.user_password,user.user_role_id,done);
    },
    deleteUser : function (id, done){
        userDAO.deleteUserById(id,done);
    }
};

module.exports=controllers;