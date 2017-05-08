import { Forms } from '/imports/api/forms/Forms';

Meteor.publish('forms',function () {
	return Forms.find({'eval.evaluator' : {$ne : this.userId}, disqualified : null}, {limit : 1})
})