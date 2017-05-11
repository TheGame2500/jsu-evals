import { Forms } from '/imports/api/forms/Forms';

Meteor.methods({
	getForm : function () {
		const userID = this.userId;
		if(!userID) return [];
		console.log('userId ', userID)
		let filter = {
			'eval.evaluator' : {$ne : userID},
			eval : {$not : {$size : 2}},
			disqualified : null,
			running : {$ne : userID, $not : {$size : 2}}
		}

		let form = Forms.findAndModify({
			query : filter,
			update : {$addToSet : {
				running : userID
			}}
		})


		if(form){
			//in case the form gets abandoned
			Meteor.setTimeout(function(){
				console.log('Form ', form._id, 'timed out from user ', userID);
				Forms.update(form._id,{$pull : {running : userID}})
			},30*60*1000)
			return Forms.findOne(form._id)
		}
	}
})