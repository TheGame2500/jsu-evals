import { Forms } from '/imports/api/forms/Forms';

Meteor.publish('forms',function () {
	console.log('userID ', this.userId)
	return Forms.find({
		'eval.evaluator' : {$ne : this.userId},
		eval : {$not : {$size : 2}},
		disqualified : null
	}, {
		limit : 1
	})
})