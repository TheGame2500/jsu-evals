var form = require('./formModel.js');
console.log(typeof form);

//creates a new form and returns it's ID
var newForm = function(formObject, done) {
    form.formSchema.create(formObject, function(err, form) {
        if (err) return done(err)
        return done(null, form._id);
    })
}

//get a form by any one of it's properties and return all of it's properties

var getFormByFilter = function(filter, done) {
    form.formSchema.findOne({
        $or: [{
            '_id': filter
        }, {
            'last_name': filter
        }, {
            'first_name': filter
        }]
    }, function(err, form) {
        if (err) return done(err);
        return done(null, form);
    })
}

//delete form by ID
var deleteForm = function(id, done) {
    form.formSchema.remove({
        _id: id
    }, function(err) {
        if (err) return done(err);
        return done(null, true);
    })
}
