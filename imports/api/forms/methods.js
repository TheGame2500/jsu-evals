import { Forms } from '/imports/api/forms/Forms';
import '../users/userIsAdmin.js';

Meteor.methods({
	evalForm : function(doc) {
		const self = this;
		
		doc.eval = doc.eval || [];
		if(_.find(doc.eval,eval=>eval.evaluator == self.userId)){
			console.log('user already evaluated this form', doc._id, self.userId);
		}

		let newEval = {
			evaluator : this.userId,
			notaFormular : doc.notaFormular,
			notaRecomandare : doc.notaRecomandare,
			notaVoluntariat : doc.notaVoluntariat,
			feedBack : doc.feedBack
		}
		console.log('Form_id', doc._id);
		console.log('FormID', doc.ID);
		try{
		console.log(Forms.update(doc._id,{
			$addToSet:{
				'eval' : newEval
			}
		}))
		} catch(ex){
			console.error('Exception @ evalForm', ex);
		}
	}
})