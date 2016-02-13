var bcrypt = require('bCrypt');
var User=require('../models/user/userModel');
var local = require('passport-local');
module.exports=new local.Strategy (
  function(username, password, done) {
    User.findOne({ user_name: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (bcrypt.compareSync(user.user_password, password)) { return done(null, false); }
      return done(null, user);
    });
  }
)