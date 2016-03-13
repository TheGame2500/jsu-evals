var formModels = require('./formModel.js');

//creates a new form and returns it's ID
var newForm = function(formObject, done) {
    formModels.Form.create(formObject, function(err, form) {
        if (err) return done(err)
        return done(null, form._id);
    })
}

//get a form by any one of it's properties and return all of it's properties

var getFormByFilter = function(filter, done) {
    formModels.Form.findOne({
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
    formModels.Form.remove({
        _id: id
    }, function(err) {
        if (err) return done(err);
        return done(null, true);
    })
}

//generate CRU methods for every form children, since the Delete will happen only on parent deletion
var newFormChild = function(childEntityName, childObject, done) {
    formModels[childEntityName].create(childObject, function(err, child) {
        if (err) return done(err);
        return done(null, child._id);
    })
}

var getFormChildByPK = function(childEntityName, parentKey, done) {
    formModels[childEntityName].findOne({
        'form': parentKey
    }, function(err, child) {
        if (err) return done(err);
        return done(null, child);
    })
}

module.exports = {
    newForm: newForm,
    getFormByFilter: getFormByFilter,
    deleteForm: deleteForm,
    newFormChild: newFormChild,
    getFormChildByPK: getFormChildByPK
}
