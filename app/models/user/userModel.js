var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    user_name : String,
    user_password : String,
    user_role_id : String
})
module.exports = mongoose.model('User',userSchema);
