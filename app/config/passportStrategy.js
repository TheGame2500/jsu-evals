var User=require('../models/user/userModel');
var local = require('passport-local');
module.exports=new local.Strategy (
  function(username, password, done) {
    User.findOne({ user_name: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!checkPass(password, user.user_password)) { return done(null, false); }
      return done(null, user);
    });
  }
)

var checkPass = function (pass1,pass2) {
  return pass1===pass2;
}