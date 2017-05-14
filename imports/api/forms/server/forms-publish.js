import { Forms } from '/imports/api/forms/Forms';

Meteor.methods({
	getForm : function () {
		const userID = this.userId;
		if(!userID) return [];
		console.log('userId ', userID)
		let filter = {
			'eval.evaluator' : {
				$ne : userID
			},
			evalNo : {
				$lt : 1,
			}
		}

		let form = Forms.findAndModify({
			query : filter,
			update : {$inc : {
				evalNo : 1
			}}
		})


		if(form){
			//in case the form gets abandoned
			Meteor.setTimeout(function(){
				console.log('Form ', form._id, 'timed out from user ', userID);
				Forms.update({
					_id : form._id, 
					'eval.evaluator' : {$ne : userID}
				},{$inc : {
					evalNo : -1
				}})
			},30*60*1000)
			return Forms.findOne(form._id)
		}
	}
})