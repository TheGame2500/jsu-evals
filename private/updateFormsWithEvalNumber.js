db.forms.find({},{eval : 1}).forEach(function(form){
  db.forms.update({_id : form._id},{
    $set : {
      evalNo :  numberInt((form.eval && form.eval.length) || 0)
    }
  })
})
